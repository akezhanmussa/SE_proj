package kz.edu.nu.cs.se.api;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import kz.edu.nu.cs.se.api.utils.JWTUtils;
import kz.edu.nu.cs.se.api.utils.PassengerObject;
import kz.edu.nu.cs.se.dao.PassengerController;
import kz.edu.nu.cs.se.model.Passenger;

@WebServlet(urlPatterns = { "/myrailway/auth/register" })
public class RegisterServlet extends HttpServlet {

    public RegisterServlet() {
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

        String firstName = passengerObject.getFirstName();
        String lastName= passengerObject.getLastName();
        String email= passengerObject.getEmail();
        String phoneNumber= passengerObject.getPhoneNumber();
        String userName= passengerObject.getUserName();
        String password= passengerObject.getPassword();
        String regex = "^[\\w-_\\.+]*[\\w-_\\.]\\@([\\w]+\\.)+[\\w]+[\\w]$";

        if (email.matches(regex)){

            if (PassengerController.isValidUserName(userName)){
                Passenger passenger = new Passenger(firstName,lastName,email,phoneNumber,userName,password, -1);
                PassengerController.addPassenger(passenger);
                String token = JWTUtils.generateToken(passenger);

                response.setContentType("application/json");
                response.setCharacterEncoding("UTF-8");

                out.append(gson.toJson("Successfully registered!"));
                out.flush();
            }
            else{
                response.sendError(400, "Such username already exists");
            }
        } else{
            response.sendError(400, "Invalid email");
        }


    }

}
