package kz.edu.nu.cs.se.api;

import com.google.gson.Gson;
import kz.edu.nu.cs.se.dao.PassengerController;
import kz.edu.nu.cs.se.model.Passenger;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

@WebServlet(urlPatterns = { "/myrailway/login" })
public class LoginServlet extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        PrintWriter out = response.getWriter();

        Gson gson = new Gson();

        LoginObject loginObject = new Gson().fromJson(request.getReader(), LoginObject.class);

        String userName = loginObject.userName;
        String password = loginObject.password;


        String token = PassengerController.login(userName, password);
        String message;
        String status;
        Map<String, String> mp = new HashMap<>();

        if(token == ""){

            response.sendError(response.SC_BAD_REQUEST,"Username or password incorrect");
            message = "Username or password incorrect";
            status = "1";
        }
        else{
            message = "Successfully logged in";
            status = "0";

            Passenger passenger = PassengerController.getPassengerFromToken(token);

            mp.put(status, message);
            mp.put("token", token);
            mp.put("userId", "" + PassengerController.passengerId);
            mp.put("userName:", passenger.getUserName());
            mp.put("firstName:", passenger.getFirstName());
            mp.put("lastName:", passenger.getLastName());
            mp.put("email:", passenger.getEmail());
            mp.put("phone:", passenger.getPhoneNumber());

        }






        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");


        out.append(gson.toJson(mp));
        out.flush();


    }
}
