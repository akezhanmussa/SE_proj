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
import kz.edu.nu.cs.se.dao.*;
import kz.edu.nu.cs.se.model.*;
import kz.edu.nu.cs.se.view.*;


@WebServlet(urlPatterns = { "/myrailway" })
public class MyServlet extends HttpServlet {

    public MyServlet() {
        super();
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        ScheduleRequestObject scheduleRequestObject = new Gson().fromJson(request.getReader(), ScheduleRequestObject.class);

        Integer origin = new Integer(scheduleRequestObject.origin);
        Integer destination = new Integer(scheduleRequestObject.destination);
        String dateString = scheduleRequestObject.date;
        String dayTime = scheduleRequestObject.daytime;

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime dateTime = LocalDateTime.parse(dateString + " 00:00:00", formatter);

        ArrayList<ScheduleModel> scheduleModels = ScheduleController.fetchSchedule(origin, destination, dateTime, dayTime);

        for (ScheduleModel scheduleModel : scheduleModels) scheduleModel.setStringDates();

        ArrayList<Schedule> schedules = new ArrayList<>();
        for (ScheduleModel scheduleModel : scheduleModels) schedules.add(new Schedule(scheduleModel));

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        PrintWriter out = response.getWriter();
        out.append(new Gson().toJson(schedules));
        out.flush();
    }
}






