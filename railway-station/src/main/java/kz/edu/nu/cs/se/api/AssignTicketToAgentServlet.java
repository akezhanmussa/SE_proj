package kz.edu.nu.cs.se.api;

import com.google.gson.Gson;
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
import java.util.HashMap;
import java.util.stream.Collectors;

@WebServlet(urlPatterns = {"/myrailway/agent/assign"})
public class AssignTicketToAgentServlet extends HttpServlet {

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        AssignTicketToAgentObject ticketToAgentObject = new Gson().fromJson(request.getReader(),
                AssignTicketToAgentObject.class);

        Integer agentID = ticketToAgentObject.agentID;
        Integer ticketID = ticketToAgentObject.ticketID;

        Boolean result = TicketController.assignTicketToAgent(agentID, ticketID);

        Gson responseJSON = new Gson();

        Integer stationId = AgentController.getAgentStationID(agentID);
        ArrayList<TicketModel> ticketModels = TicketController.getUnapprovedTickets(stationId);
        ArrayList<Ticket> tickets = ticketModels.stream().map(Ticket::new).
                collect(Collectors.toCollection(ArrayList::new));

        String dataValue = responseJSON.toJson(tickets);
        String statusValue = responseJSON.toJson(result ? "success" : "Failed to assign ticket to you.");

        HashMap<String, String> responseDict = new HashMap<>();
        responseDict.put("data", dataValue);
        responseDict.put("status", statusValue);

        PrintWriter out = response.getWriter();
        out.append(responseJSON.toJson(responseDict));
        out.flush();
    }
}