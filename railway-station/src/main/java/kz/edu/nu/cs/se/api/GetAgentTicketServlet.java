package kz.edu.nu.cs.se.api;

import com.google.gson.Gson;
import kz.edu.nu.cs.se.api.utils.JWTUtils;
import kz.edu.nu.cs.se.api.utils.Token;
import kz.edu.nu.cs.se.dao.AgentController;
import kz.edu.nu.cs.se.dao.PassengerController;
import kz.edu.nu.cs.se.dao.TicketController;
import kz.edu.nu.cs.se.model.TicketModel;
import kz.edu.nu.cs.se.model.User;
import kz.edu.nu.cs.se.view.TicketForAgent;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Optional;
import java.util.logging.Logger;
import java.util.stream.Collectors;

import static kz.edu.nu.cs.se.api.utils.JWTUtils.*;

@WebServlet(urlPatterns = {"/myrailway/agent/get-agent-ticket"})
public class GetAgentTicketServlet extends HttpServlet {

    private static final Logger logger = Logger.getLogger(GetAgentTicketServlet.class.getName());

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {

        String token = new Gson().fromJson(request.getReader(), Token.class).getToken();
        logger.info(String.format("Received token: %s", token));

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
            logger.severe("[ERROR] Failed to fetch agentID for username: " + agentUsername);
            response.sendError(401, "[ERROR] Failed to fetch agentID for username: " + agentUsername);
            return;
        }

        ArrayList<TicketModel> tickets = TicketController.getTicketsForAgent(optionalAgentID.get());
        ArrayList<TicketForAgent> ticketForAgents = tickets.stream().map(TicketForAgent::new).
                collect(Collectors.toCollection(ArrayList::new));


        PrintWriter out = response.getWriter();
        out.append(new Gson().toJson(ticketForAgents));
        out.flush();
    }
}
