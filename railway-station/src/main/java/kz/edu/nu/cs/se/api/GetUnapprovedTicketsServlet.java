package kz.edu.nu.cs.se.api;

import com.google.gson.Gson;
import kz.edu.nu.cs.se.dao.AgentController;
import kz.edu.nu.cs.se.dao.TicketController;
import kz.edu.nu.cs.se.view.Ticket;
import kz.edu.nu.cs.se.model.TicketModel;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.stream.Collectors;

public class GetUnapprovedTicketsServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        // TODO Fetch agentID from token once it is available.
        Integer agentID = 1;

        Integer stationID = AgentController.getAgentStationID(agentID);
        ArrayList<TicketModel> ticketModels = TicketController.getUnapprovedTickets(stationID);
        ArrayList<Ticket> tickets = ticketModels.stream().map(Ticket::new)
                .collect(Collectors.toCollection(ArrayList::new));

        PrintWriter out = response.getWriter();
        out.append(new Gson().toJson(tickets));
        out.flush();
    }
}
