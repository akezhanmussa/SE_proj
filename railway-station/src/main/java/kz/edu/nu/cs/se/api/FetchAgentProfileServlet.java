package kz.edu.nu.cs.se.api;

import com.google.gson.Gson;
import kz.edu.nu.cs.se.api.utils.Token;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.logging.Logger;

import static kz.edu.nu.cs.se.api.utils.JWTUtils.*;

public class FetchAgentProfileServlet extends HttpServlet {

    private static final Logger logger = Logger.getLogger(FetchAgentProfileServlet.class.getName());

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String token = new Gson().fromJson(request.getReader(), Token.class).getToken();

        logger.info(String.format("Received token: %s", token));

        if (isExpired(token)){
            logger.warning("[ERROR] Token has expired");
            response.sendError(401, "Token has expired");
        }

        if (!isAgent(token)) {
            logger.warning("[ERROR] Permission denied, not an agent");
            response.sendError(401, "[ERROR] Permission denied, not an agent");
            return;
        }

        String username = getUserFromToken(token);


    }
}
