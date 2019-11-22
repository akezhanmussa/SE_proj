package kz.edu.nu.cs.se.api;

import com.google.gson.Gson;
import kz.edu.nu.cs.se.api.utils.Token;
import kz.edu.nu.cs.se.dao.PassengerController;
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
import java.util.logging.Logger;
import java.util.stream.Collectors;

import static kz.edu.nu.cs.se.api.utils.JWTUtils.*;

@WebServlet(urlPatterns = { "/myrailway/mypage/gettickets" })
public class GetTicketServlet extends HttpServlet {

    private static final Logger logger = Logger.getLogger(GetTicketServlet.class.getName());

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {

        String token = new Gson().fromJson(request.getReader(), Token.class).getToken();
        logger.info(String.format("Token: %s", token));

        if (isExpired(token)){
            logger.warning("Token has expired");
            response.sendError(401, "Token has expired");
        }

        if(!isPassenger(token)) {
            logger.warning("Unauthorized as passenger");
            response.sendError(401, "Unauthorized as passenger");
        }


        Integer idPassenger = PassengerController.getPassenger(getUserFromToken(token)).get().getUserId();

        ArrayList<TicketModel> ticketModels = TicketController.getTicketsForPassenger(idPassenger);
        ArrayList<Ticket> tickets = ticketModels.stream().map(Ticket::new).
                collect(Collectors.toCollection(ArrayList::new));

        PrintWriter out = response.getWriter();
        out.append(new Gson().toJson(tickets));
        out.flush();
    }

}