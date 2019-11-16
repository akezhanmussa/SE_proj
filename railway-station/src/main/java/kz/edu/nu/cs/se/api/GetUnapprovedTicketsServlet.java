package kz.edu.nu.cs.se.api;

import com.google.gson.Gson;
import kz.edu.nu.cs.se.api.utils.JWTUtils;
import kz.edu.nu.cs.se.api.utils.Token;
import kz.edu.nu.cs.se.dao.AgentController;
import kz.edu.nu.cs.se.dao.TicketController;
import kz.edu.nu.cs.se.model.Passenger;
import kz.edu.nu.cs.se.view.Ticket;
import kz.edu.nu.cs.se.model.TicketModel;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.stream.Collectors;

import static kz.edu.nu.cs.se.api.utils.JWTUtils.isExpired;

@WebServlet(urlPatterns = {"/myrailway/agent/get-unapproved-tickets"})
public class GetUnapprovedTicketsServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {

        String token = new Gson().fromJson(request.getReader(), Token.class).getToken();
        System.out.println(String.format("Received token: %s", token));

        if (isExpired(token)){
            System.out.println("[ERROR] Token has expired");
            response.sendError(401, "Token has expired");
        }

        Passenger agent = JWTUtils.getPassengerFromToken(token);
        Integer agentID = agent.getPassengerId();

        Integer stationID = AgentController.getAgentStationID(agentID);
        ArrayList<TicketModel> ticketModels = TicketController.getUnapprovedTickets(stationID);
        ArrayList<Ticket> tickets = ticketModels.stream().map(Ticket::new)
                .collect(Collectors.toCollection(ArrayList::new));

        PrintWriter out = response.getWriter();
        out.append(new Gson().toJson(tickets));
        out.flush();
    }
}
