//package kz.edu.nu.cs.se.api;
//
//import com.auth0.jwt.interfaces.DecodedJWT;
//import com.fasterxml.jackson.databind.*;
//import kz.edu.nu.cs.se.auth.security.Auth0JwtPrincipal;
//
//import javax.servlet.ServletException;
//import javax.servlet.annotation.WebServlet;
//import javax.servlet.http.HttpServlet;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import java.io.IOException;
//import java.nio.charset.StandardCharsets;
//import java.security.Principal;
//import java.util.Base64;
//
//
///**
// * Handles requests for the profile page. If no authenticated principal for the request is found, redirects the user
// * to login.
// */
//@WebServlet(urlPatterns = "/profile")
//public class ProfileServlet extends HttpServlet {
//
//    private static final String JSON_PROCESSING_ERROR_MESSAGE = "Error converting JWT claims to JSON";
//
//    @Override
//    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//        Principal principal = request.getUserPrincipal();
//        if (principal instanceof Auth0JwtPrincipal) {
//            System.out.println("I m HEEREEEE in IF");
//            Auth0JwtPrincipal auth0JwtPrincipal = (Auth0JwtPrincipal) principal;
//            request.setAttribute("profile", auth0JwtPrincipal.getIdToken().getClaims());
//
//            String profileJson;
//            try {
//                System.out.println("mytokkeb: "+auth0JwtPrincipal.getIdToken());
//                profileJson = claimsAsJson(auth0JwtPrincipal.getIdToken());
//            } catch (IOException ioe) {
//                profileJson = JSON_PROCESSING_ERROR_MESSAGE;
//            }
//
//            request.setAttribute("profileJson", profileJson);
//            request.getRequestDispatcher("/WEB-INF/jsp/profile.jsp").forward(request, response);
//        } else {
//            System.out.println("I m HEEREEEE in ELSE");
//            request.getSession().setAttribute("Referer", request.getRequestURI());
//            request.getRequestDispatcher("/login").forward(request, response);
//        }
//    }
//
//
//    private static String claimsAsJson(DecodedJWT decodedJWT) throws IOException {
//
//        byte[] decodedBytes = Base64.getUrlDecoder().decode(decodedJWT.getPayload());
//        String decoded = new String(decodedBytes, StandardCharsets.UTF_8);
//
//        ObjectMapper objectMapper = new ObjectMapper();
//
//        Object json = objectMapper.readValue(decoded, Object.class);
//        return objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(json);
//    }
//}
