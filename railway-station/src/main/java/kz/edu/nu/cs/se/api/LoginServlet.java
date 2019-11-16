package kz.edu.nu.cs.se.api;

import com.google.gson.Gson;
import kz.edu.nu.cs.se.api.utils.JWTUtils;
import kz.edu.nu.cs.se.api.utils.LoginObject;
import kz.edu.nu.cs.se.api.utils.PassengerObject;
import kz.edu.nu.cs.se.dao.PassengerController;
import kz.edu.nu.cs.se.model.Passenger;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet(urlPatterns = { "/myrailway/auth/login" })
public class LoginServlet extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {



    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        PrintWriter out = response.getWriter();

        Gson gson = new Gson();

        LoginObject loginObject = new Gson().fromJson(request.getReader(), LoginObject.class);

        String userName = loginObject.getUserName();
        String password = loginObject.getPassword();

        String token = JWTUtils.generateToken(PassengerController.getPassenger(userName, password));


        if(token == null){
            response.sendError(response.SC_BAD_REQUEST,"Username or password incorrect");
        }
        else{

            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
        
            out.append(gson.toJson(token));
            out.flush();

        }


    }
}
