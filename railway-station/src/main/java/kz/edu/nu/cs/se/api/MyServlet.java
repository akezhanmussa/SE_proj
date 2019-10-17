package kz.edu.nu.cs.se.api;

import java.io.IOException;
import java.io.PrintWriter;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import kz.edu.nu.cs.se.dao.RouteDB;
import kz.edu.nu.cs.se.dao.ScheduleDB;
import kz.edu.nu.cs.se.model.Route;
import kz.edu.nu.cs.se.model.Schedule;

@WebServlet(urlPatterns = { "/myrailway" })
public class MyServlet extends HttpServlet {

    public MyServlet() {
        super();
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        PrintWriter out = response.getWriter();
        Gson gson = new Gson();

        Integer origin = new Integer(request.getParameter("origin"));
        Integer destination = new Integer(request.getParameter("destination"));
        String dateString = request.getParameter("date");
        String dayTime = request.getParameter("daytime");

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime dateTime = LocalDateTime.parse(dateString + " 00:00:00", formatter);

        ArrayList<Schedule> schedules = ScheduleDB.fetchSchedule(origin, destination, dateTime, dayTime);

        for (Schedule schedule : schedules) schedule.setStringDates();

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        out.append(gson.toJson(schedules));
        out.flush();
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        doGet(request, response);
    }
}






