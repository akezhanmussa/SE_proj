package kz.edu.nu.cs.se.api;

import com.google.gson.Gson;
import kz.edu.nu.cs.se.api.utils.JWTUtils;
import kz.edu.nu.cs.se.api.utils.LoginObject;
import kz.edu.nu.cs.se.dao.PassengerController;
import kz.edu.nu.cs.se.model.User;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Optional;
import java.util.logging.Logger;

@WebServlet(urlPatterns = { "/myrailway/auth/login" })
public class LoginPassengerServlet extends HttpServlet {
    private final static Logger logger = Logger.getLogger(LoginPassengerServlet.class.getName());

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        Gson gson = new Gson();

        LoginObject loginObject = new Gson().fromJson(request.getReader(), LoginObject.class);

        String userName = loginObject.getUserName();
        String password = loginObject.getPassword();

        logger.info(String.format("Received userName: %s password: %s", userName, password));

        Optional<String> token = Optional.empty();

        Optional<User> user = PassengerController.getPassenger(userName, password);

        if(user.isPresent()){
            token = JWTUtils.generateToken(user.get());
        }

        if(!token.isPresent()){
            logger.warning("Username or password incorrect");
            response.sendError(response.SC_BAD_REQUEST,"Username or password incorrect");
            return;
        }

        PrintWriter out = response.getWriter();
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        out.append(gson.toJson(token.get()));
        out.flush();

    }
}
