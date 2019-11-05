package kz.edu.nu.cs.se.api;

import com.google.gson.Gson;
import kz.edu.nu.cs.se.dao.AgentController;
import kz.edu.nu.cs.se.model.TicketModel;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

public class GetAgentTicketServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        GetAgentTicketObject agentTicketObject = new Gson().fromJson(request.getReader(), GetAgentTicketObject.class);
        Integer agentID = agentTicketObject.agentID;

        ArrayList<TicketModel> agentTickets = AgentController.getAgentTickets(agentID);

        PrintWriter out = response.getWriter();
        out.append(new Gson().toJson(agentTickets));
        out.flush();
    }
}