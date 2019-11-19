package kz.edu.nu.cs.se.api;

import com.google.gson.Gson;
import kz.edu.nu.cs.se.api.utils.FetchSingleTicketRequestObject;
import kz.edu.nu.cs.se.dao.AgentController;
import kz.edu.nu.cs.se.dao.PassengerController;
import kz.edu.nu.cs.se.dao.TicketController;
import kz.edu.nu.cs.se.model.TicketModel;
import kz.edu.nu.cs.se.view.Ticket;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Optional;

import static kz.edu.nu.cs.se.api.utils.JWTUtils.getUserFromToken;

@WebServlet(urlPatterns = {"/myrailway/user/fetch-ticket"})
public class FetchSingleTicketServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        FetchSingleTicketRequestObject singleTicketRequestObject = new Gson().fromJson(request.getReader(),
                FetchSingleTicketRequestObject.class);

        String userToken = singleTicketRequestObject.getUserToken();
        String agentToken = singleTicketRequestObject.getAgentToken();
        Integer ticketID = singleTicketRequestObject.getTicketID();

        String userName = getUserFromToken(userToken);
        String agentName = getUserFromToken(agentToken);

        Optional<String> agentEmailOptional = AgentController.getEmailByUsername(agentName);

        Integer dummyID = AgentController.getDummyUserID(agentEmailOptional.get()).get();
        Integer userID = PassengerController.getPassenger(userName).get().getUserId();

        Optional<TicketModel> userTicket = TicketController.getSingleTicket(userID, ticketID);
        Optional<TicketModel> agentTicket = TicketController.getSingleTicket(dummyID, ticketID);

        PrintWriter out = response.getWriter();
        if (userTicket.isPresent()) {
            out.append(new Gson().toJson(new Ticket(userTicket.get())));
            out.flush();
        } else if (agentTicket.isPresent()) {
            out.append(new Gson().toJson(new Ticket(agentTicket.get())));
            out.flush();
        } else {
            response.sendError(401, "[ERROR] Access denied for fetching ticket");
        }
    }
}
