package kz.edu.nu.cs.se.api;

import com.google.gson.Gson;
import kz.edu.nu.cs.se.api.utils.JWTUtils;
import kz.edu.nu.cs.se.api.utils.UpdateTicketStatusObject;
import kz.edu.nu.cs.se.dao.AgentController;
import kz.edu.nu.cs.se.dao.PassengerController;
import kz.edu.nu.cs.se.dao.TicketController;
import kz.edu.nu.cs.se.model.TicketModel;
import kz.edu.nu.cs.se.model.User;
import kz.edu.nu.cs.se.view.TicketForAgent;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Optional;
import java.util.logging.Logger;
import java.util.stream.Collectors;

import static kz.edu.nu.cs.se.api.utils.JWTUtils.*;

@WebServlet(urlPatterns = {"/myrailway/ticket/update-status"})
public class UpdateTicketStatusServlet extends HttpServlet {
    private static final Logger logger = Logger.getLogger(UpdateTicketStatusServlet.class.getName());

    private static final String APPROVED = "APPROVED";
    private static final String DECLINED = "DECLINED";

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        UpdateTicketStatusObject ticketStatusObject = new Gson().fromJson(request.getReader(),
                UpdateTicketStatusObject.class);

        String token = ticketStatusObject.getToken();
        if (isExpired(token)){
            logger.warning("[ERROR] Token has expired");
            response.sendError(401, "Token has expired");
            return;
        }

        if (!isAgent(token)) {
            logger.warning("[ERROR] Permission denied, not an agent");
            response.sendError(401, "[ERROR] Permission denied, not an agent");
            return;
        }

        String agentUsername = getUserFromToken(token);

        Optional<Integer> optionalAgentID = AgentController.getAgentIDByUsername(agentUsername);

        if (!optionalAgentID.isPresent()) {
            logger.warning("[ERROR] Failed to fetch agentID for username: " + agentUsername);
            response.sendError(401, "[ERROR] Failed to fetch agentID for username: " + agentUsername);
            return;
        }

        Integer ticketID = ticketStatusObject.getTicketID();
        Integer agentID = optionalAgentID.get();

        if (!TicketController.verifyAssigmentOfAgent(agentID, ticketID)) {
            logger.warning("[ERROR] Trying to change forbidden ticket status.");
            response.sendError(503, "Trying to change forbidden ticket status.");
            return;
        }

        String newStatus = ticketStatusObject.getApproved() ? APPROVED : DECLINED;

        boolean status = TicketController.changeStatus(ticketID, newStatus);

        if (status) {
            // skip
        } else {
            logger.warning("[ERROR] Ticket change status validation failed");
            response.sendError(503, "[ERROR] Ticket change status validation failed");
            return;
        }

        ArrayList<TicketModel> ticketModels = TicketController.getTicketsForAgent(agentID);
        ArrayList<TicketForAgent> ticketForAgents = ticketModels.stream().map(TicketForAgent::new).
                collect(Collectors.toCollection(ArrayList::new));

        logger.info(String.format("[INFO] Fetched %d unapproved tickets.%n", ticketForAgents.size()));

        PrintWriter out = response.getWriter();
        out.append(new Gson().toJson(ticketForAgents));
        out.flush();
    }
}
