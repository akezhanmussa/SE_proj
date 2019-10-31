package kz.edu.nu.cs.se.auth;

import kz.edu.nu.cs.se.auth.security.Auth0JwtPrincipal;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.security.Principal;

@WebServlet(urlPatterns = {""})
public class HomeServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        System.out.println("HEREEEEEEEEEEE in HomeServlet");

        Principal principal = req.getUserPrincipal();

        if (principal instanceof Auth0JwtPrincipal) {
            Auth0JwtPrincipal auth0JwtPrincipal = (Auth0JwtPrincipal) principal;
            req.setAttribute("profile", auth0JwtPrincipal.getIdToken().getClaims());
        }
        req.getRequestDispatcher("").forward(req, res);
    }
}
