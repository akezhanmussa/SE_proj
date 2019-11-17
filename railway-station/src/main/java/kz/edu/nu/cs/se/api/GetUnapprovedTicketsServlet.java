package kz.edu.nu.cs.se.api;

import com.google.gson.Gson;
import kz.edu.nu.cs.se.api.utils.Token;
import kz.edu.nu.cs.se.dao.AgentController;
import kz.edu.nu.cs.se.dao.TicketController;
import kz.edu.nu.cs.se.model.TicketModel;
import kz.edu.nu.cs.se.view.Ticket;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Optional;
import java.util.stream.Collectors;

import static kz.edu.nu.cs.se.api.utils.JWTUtils.*;

@WebServlet(urlPatterns = {"/myrailway/agent/get-unapproved-tickets"})
public class GetUnapprovedTicketsServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {

        String token = new Gson().fromJson(request.getReader(), Token.class).getToken();
        System.out.println(String.format("Received token: %s", token));

        if (isExpired(token)){
            System.out.println("[ERROR] Token has expired");
            response.sendError(401, "Token has expired");
            return;
        }

        if (!isAgent(token)) {
            System.out.println("[ERROR] Auth error, not an agent");
            response.sendError(401, "Token has expired");
            return;
        }

        String agentUsername = getUserFromToken(token);
        Optional<Integer> optionalAgentID = AgentController.getAgentIDByUsername(agentUsername);

        if (!optionalAgentID.isPresent()) {
            System.out.printf("[ERROR] Failed to fetch agentID with userName: %s%n", agentUsername);
            response.sendError(500, String.format("[ERROR] Failed to fetch agentID with username: %s",
                    agentUsername));
            return;
        }

        Optional<Integer> optionalStationID = AgentController.getAgentStationIDByUsername(agentUsername);

        if (!optionalStationID.isPresent()) {
            System.out.printf("[ERROR] Failed to fetch stationID with userName: %s%n", agentUsername);
            response.sendError(500, String.format("[ERROR] Failed to fetch stationID with userName: %s",
                    agentUsername));
            return;
        }

        ArrayList<TicketModel> ticketModels = TicketController.getUnapprovedTickets(optionalStationID.get());
        ArrayList<Ticket> tickets = ticketModels.stream().map(Ticket::new)
                .collect(Collectors.toCollection(ArrayList::new));

        PrintWriter out = response.getWriter();
        out.append(new Gson().toJson(tickets));
        out.flush();
    }
}
