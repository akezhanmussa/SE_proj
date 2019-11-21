package kz.edu.nu.cs.se.api;

import com.google.gson.Gson;
import kz.edu.nu.cs.se.api.utils.TicketRequestObject;
import kz.edu.nu.cs.se.dao.PassengerController;
import kz.edu.nu.cs.se.dao.TicketController;
import kz.edu.nu.cs.se.model.User;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Optional;
import java.util.logging.Logger;

import static kz.edu.nu.cs.se.api.utils.JWTUtils.getUserFromToken;
import static kz.edu.nu.cs.se.api.utils.JWTUtils.isExpired;

@WebServlet(urlPatterns = {"/myrailway/buyticket"})
public class BuyTicketServlet extends HttpServlet {

    private static final Logger logger = Logger.getLogger(BuyTicketServlet.class.getName());

    public BuyTicketServlet() {super();}

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        TicketRequestObject ticketRequestObject = new Gson().fromJson(request.getReader(), TicketRequestObject.class);
        String token = ticketRequestObject.getToken();

        logger.info(String.format("Received token: %s", token));

        if (isExpired(token)){
            logger.warning("[ERROR] Token has expired");
            response.sendError(401, "Token has expired");
        }

        User passenger = PassengerController.getPassenger(getUserFromToken(token)).get();
        Integer passengerId = passenger.getUserId();

        Integer scheduleId = ticketRequestObject.getScheduleId();
        Integer origin_id = ticketRequestObject.getOrigin_id();
        Integer destination_id = ticketRequestObject.getDestination_id();
        Integer owner_document_id = ticketRequestObject.getOwner_document_id();
        Float price = ticketRequestObject.getPrice();

        String start_date = ticketRequestObject.getStart_date();
        String end_date = ticketRequestObject.getEnd_date();
        String owner_document_type = ticketRequestObject.getOwner_document_type();
        String owner_firstname = ticketRequestObject.getOwner_firstname();
        String owner_lastname = ticketRequestObject.getOwner_lastname();

        String ticketStatus = "UNAPPROVED";
        System.out.println(ticketStatus);
        Optional<Integer> ticketModel = TicketController.BuyTicket(scheduleId, passengerId, origin_id, destination_id, price,
                start_date, end_date, owner_document_type, owner_document_id,owner_firstname,
                owner_lastname, ticketStatus);
        PrintWriter out = response.getWriter();

        if (ticketModel.isPresent()) {
            response.setStatus(200);
            out.append(new Gson().toJson(ticketModel.get()));
        } else {
            response.setStatus(501);
        }

        out.flush();
    }

}