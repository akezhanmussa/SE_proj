package kz.edu.nu.cs.se.api;

import com.google.gson.Gson;
import kz.edu.nu.cs.se.api.utils.*;
import kz.edu.nu.cs.se.dao.TicketController;
import kz.edu.nu.cs.se.model.Passenger;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import static kz.edu.nu.cs.se.api.utils.JWTUtils.isExpired;

@WebServlet(urlPatterns = {"/myrailway/mypage"})
public class MyPageServlet extends HttpServlet {

    public MyPageServlet() {super();}

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {

        PrintWriter out = response.getWriter();

        Gson gson = new Gson();
        System.out.println("I AM HERE");
        String token = new Gson().fromJson(request.getReader(), Token.class).getToken();
        System.out.println(token);
        if (isExpired(token)){
            response.sendError(401, "Token has expired");
        }


        Passenger passenger = JWTUtils.getPassengerFromToken(token);
        MyPageObject myPageObject = new MyPageObject(passenger.getFirstName(),
                                                        passenger.getLastName(),
                                                        passenger.getEmail(),
                                                        passenger.getPhoneNumber(),
                                                        passenger.getUserName());



        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        out.append(gson.toJson(myPageObject));
        out.flush();
    }

}