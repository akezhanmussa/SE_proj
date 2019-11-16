package kz.edu.nu.cs.se.api;

import com.google.gson.Gson;
import kz.edu.nu.cs.se.api.utils.JWTUtils;
import kz.edu.nu.cs.se.api.utils.UpdateTicketStatusObject;
import kz.edu.nu.cs.se.dao.TicketController;
import kz.edu.nu.cs.se.model.User;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static kz.edu.nu.cs.se.api.utils.JWTUtils.isExpired;

@WebServlet(urlPatterns = {"/myrailway/ticket/update-status"})
public class UpdateTicketStatusServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        UpdateTicketStatusObject ticketStatusObject = new Gson().fromJson(request.getReader(),
                UpdateTicketStatusObject.class);

        String token = ticketStatusObject.getToken();
        if (isExpired(token)){
            System.out.println("[ERROR] Token has expired");
            response.sendError(401, "Token has expired");
        }

        // (TODO)(ginet) that the user is actually an agent
        User agent = JWTUtils.getUserFromToken(token);
        Integer agentID = agent.getUserId();
        Integer ticketID = ticketStatusObject.getTicketID();

        if (!TicketController.verifyAssigmentOfAgent(agentID, ticketID)) {
            System.out.println("[ERROR] Trying to change forbidden ticket status.");
            response.sendError(503, "Trying to change forbidden ticket status.");
        }

        String newStatus = ticketStatusObject.getNewStatus();

        boolean status = TicketController.changeStatus(ticketID, newStatus);

        if (status) {
            response.sendError(202, "Success");
        } else {
            response.sendError(503, "An internal error occurred");
        }

    }
}
