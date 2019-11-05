package kz.edu.nu.cs.se.api;

import com.google.gson.Gson;
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
import java.util.stream.Collectors;

@WebServlet(urlPatterns = { "/myrailway/gettickets" })
public class GetTicketServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        GetTicketRequestObject getTicketRequestObject = new Gson().fromJson(request.getReader(), GetTicketRequestObject.class);
        Integer idPassenger = getTicketRequestObject.idPassenger;

        ArrayList<TicketModel> ticketModels = TicketController.getTicketsForPassenger(idPassenger);
        ArrayList<Ticket> tickets = ticketModels.stream().map(element -> new Ticket(element)).
                collect(Collectors.toCollection(ArrayList::new));

        PrintWriter out = response.getWriter();
        out.append(new Gson().toJson(tickets));
        out.flush();
    }

}