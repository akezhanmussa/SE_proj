package kz.edu.nu.cs.se.api;


import java.io.IOException;
import java.io.PrintWriter;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Pattern;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import kz.edu.nu.cs.se.dao.PassengerController;
import kz.edu.nu.cs.se.dao.ScheduleController;
import kz.edu.nu.cs.se.model.Passenger;
import kz.edu.nu.cs.se.model.ScheduleModel;
import kz.edu.nu.cs.se.view.Schedule;


@WebServlet(urlPatterns = { "/myrailway/auth" })
public class AuthServlet extends HttpServlet {


    public AuthServlet() {
        super();
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        PrintWriter out = response.getWriter();

        Gson gson = new Gson();

        PassengerObject passengerObject = new Gson().fromJson(request.getReader(), PassengerObject.class);

        int passengerId = passengerObject.passengerId;
        String firstName = passengerObject.firstName;
        String lastName= passengerObject.lastName;
        String email= passengerObject.email;
        String phoneNumber= passengerObject.phoneNumber;
        String userName= passengerObject.userName;
        String password= passengerObject.password;
        String regex = "^[\\w-_\\.+]*[\\w-_\\.]\\@([\\w]+\\.)+[\\w]+[\\w]$";
        String authStatus = "";

        Map<String, String> mp = new HashMap<>();

        if (email.matches(regex)){

            if (PassengerController.isValidUserName(userName)){
                Passenger passenger = new Passenger(passengerId,firstName,lastName,email,phoneNumber,userName,password);

                PassengerController.addPassenger(passenger);

                String token = PassengerController.generateToken(passenger);
                System.out.println("Token is " + token);
                System.out.println(PassengerController.getPassengerFromToken(token));

                mp.put("1", "Successfully registered");
                mp.put("token", token);
            }

            else{
                mp.put("2", "Such username already exists");
                mp.put("token", "");
            }
        } else{
            mp.put("3", "Email doesn't match");
            mp.put("token", "");

        }

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");


        out.append(gson.toJson(mp));
        out.flush();
    }

}
