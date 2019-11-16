package kz.edu.nu.cs.se.api;

import com.google.gson.Gson;
import kz.edu.nu.cs.se.api.utils.PassengerObject;
import kz.edu.nu.cs.se.dao.PassengerController;
import kz.edu.nu.cs.se.model.User;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet(urlPatterns = { "/myrailway/auth/register" })
public class RegisterPassengerServlet extends HttpServlet {

    public RegisterPassengerServlet() {
        super();
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        Gson gson = new Gson();

        PassengerObject passengerObject = new Gson().fromJson(request.getReader(), PassengerObject.class);

        String firstName = passengerObject.getFirstName();
        String lastName= passengerObject.getLastName();
        String email= passengerObject.getEmail();
        String phoneNumber= passengerObject.getPhoneNumber();
        String userName= passengerObject.getUserName();
        String password= passengerObject.getPassword();

        if (email.matches(regex)){

            if (PassengerController.isValidUserName(userName)){
                User user = new User(firstName,lastName,email,phoneNumber,userName, -1);
                user.setUserRole("passenger");
                PassengerController.addPassenger(user, password);

                response.setContentType("application/json");
                response.setCharacterEncoding("UTF-8");

                PrintWriter out = response.getWriter();
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
