package kz.edu.nu.cs.se.auth;

import com.google.gson.Gson;
import kz.edu.nu.cs.se.auth.security.AuthTokenUtil;
import kz.edu.nu.cs.se.dao.PassengerController;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet(urlPatterns = {"/myrailway/login"})
public class LoginServlet extends HttpServlet {

    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        PrintWriter out = response.getWriter();

        Gson gson = new Gson();

        UserObject userObject = new Gson().fromJson(request.getReader(), UserObject.class);

        String username= userObject.username;
        String password= userObject.password;

        if(!PassengerController.isPassengerUsername(username)) throw new IOException("no such user");
        if(!PassengerController.isPassengerPassword(password)) throw new IOException("incorrect password");



        String token = AuthTokenUtil.generateToken(username, password, PassengerController.getPID());

        response.addHeader("token", token);

//        request.getRequestDispatcher("/myrailway/passenger/"+username).forward(request, response);
    }

}
