package kz.edu.nu.cs.se.api;

import com.google.gson.Gson;
import kz.edu.nu.cs.se.api.utils.JWTUtils;
import kz.edu.nu.cs.se.api.utils.LoginObject;
import kz.edu.nu.cs.se.dao.AdminController;
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

@WebServlet(urlPatterns = { "/myrailway/admin/login" })
public class LoginAdminServlet extends HttpServlet {
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
        Optional<User> user = AdminController.getAdmin(userName, password);

        if(user.isPresent()) token = JWTUtils.generateToken(user.get());

        if(token.isPresent()){
            response.sendError(response.SC_BAD_REQUEST,"Username or password incorrect");
        }

        PrintWriter out = response.getWriter();
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        out.append(gson.toJson(token.get()));
        out.flush();



    }
}
