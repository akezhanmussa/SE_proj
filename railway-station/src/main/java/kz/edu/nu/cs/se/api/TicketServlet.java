package kz.edu.nu.cs.se.api;

import kz.edu.nu.cs.se.auth.security.Auth0JwtPrincipal;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.security.Principal;

// Supposed to be smth like /profile/tickets but waiting for profile
@WebServlet(urlPatterns = {"/tickets"})
public class TicketServlet extends HttpServlet {
    private static final long serialVersionUID = 1;

    public TicketServlet() {
        super();
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Principal principal = request.getUserPrincipal();

        if (principal instanceof Auth0JwtPrincipal) {
            Auth0JwtPrincipal auth0JwtPrincipal = (Auth0JwtPrincipal) principal;
            request.setAttribute("profile", auth0JwtPrincipal.getIdToken().getClaims());
        }

        String id = request.getParameter("id");
        if (id == null) {
            request.getRequestDispatcher("WEB-INF/jsp/ticketsTable.jsp").forward(request, response);
        } else {
            request.setAttribute("id", id);
            request.getRequestDispatcher("views/oneTicket.jsp").forward(request, response);
        }
    }
}
