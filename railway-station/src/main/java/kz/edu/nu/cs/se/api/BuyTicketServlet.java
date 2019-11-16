package kz.edu.nu.cs.se.api;

import com.google.gson.Gson;
import kz.edu.nu.cs.se.api.utils.TicketRequestObject;
import kz.edu.nu.cs.se.dao.TicketController;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@WebServlet(urlPatterns = {"/myrailway/buyticket"})
public class BuyTicketServlet extends HttpServlet {

    public BuyTicketServlet() {super();}

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        TicketRequestObject ticketRequestObject = new Gson().fromJson(request.getReader(), TicketRequestObject.class);
        Integer scheduleId = ticketRequestObject.getScheduleId();
        Integer passengerId = ticketRequestObject.getPassengerId();
        Integer origin_id = ticketRequestObject.getOrigin_id();
        Integer destination_id = ticketRequestObject.getDestination_id();
        Integer owner_document_id = ticketRequestObject.getOwner_document_id();
        Float price = ticketRequestObject.getPrice();

        String start_date = ticketRequestObject.getStart_date();
        String end_date = ticketRequestObject.getEnd_date();
        String owner_document_type = ticketRequestObject.getOwner_document_type();
        String owner_firstname = ticketRequestObject.getOwner_firstname();
        String owner_lastname = ticketRequestObject.getOwner_lastname();

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime startDate = LocalDateTime.parse(start_date, formatter);
        LocalDateTime endDate = LocalDateTime.parse(end_date, formatter);

        boolean status = TicketController.BuyTicket(scheduleId, passengerId, origin_id, destination_id, price,
                start_date, end_date, owner_document_type, owner_document_id,owner_firstname,
                owner_lastname);
        PrintWriter out = response.getWriter();
        if (status) {
            out.append(new Gson().toJson("Done! Wait for approval"));
        } else {
            out.append(new Gson().toJson("Error!"));
        }

        out.flush();
    }

}