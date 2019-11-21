package kz.edu.nu.cs.se.api;

import com.google.gson.Gson;
import kz.edu.nu.cs.se.api.utils.JWTUtils;
import kz.edu.nu.cs.se.api.utils.LoginObject;
import kz.edu.nu.cs.se.dao.AdminController;
import kz.edu.nu.cs.se.dao.PassengerController;
import kz.edu.nu.cs.se.model.User;

import javax.jws.soap.SOAPBinding;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Optional;
import java.util.logging.Logger;

@WebServlet(urlPatterns = { "/myrailway/admin/login" })
public class LoginAdminServlet extends HttpServlet {
    private static Logger logger = Logger.getLogger(LoginAdminServlet.class.getName());

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        Optional<String> token = null;

        Gson gson = new Gson();

        LoginObject loginObject = new Gson().fromJson(request.getReader(), LoginObject.class);

        String userName = loginObject.getUserName();
        String password = loginObject.getPassword();
        User user = AdminController.getAdmin(userName, password);
        PrintWriter out = response.getWriter();

        try {
            logger.info("Trying to generate new token");
            token = JWTUtils.generateToken(user);
        } catch (Exception ex) {
            logger.warning("Username or password incorrect");
            response.sendError(response.SC_BAD_REQUEST,"Username or password incorrect");
            out.flush();
        }



        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        logger.info(String.format("Generated token: %s", token.get()));
        out.append(gson.toJson(token.get()));
        out.flush();



    }
}
