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
import kz.edu.nu.cs.se.dao.ScheduleController;
import kz.edu.nu.cs.se.model.ScheduleModel;
import kz.edu.nu.cs.se.view.Schedule;


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
        PrintWriter out = response.getWriter();

        Gson gson = new Gson();

        RequestObject requestObject = new Gson().fromJson(request.getReader(), RequestObject.class);

        Integer origin = new Integer(requestObject.origin);
        Integer destination = new Integer(requestObject.destination);
        String dateString = requestObject.date;
        String dayTime = requestObject.daytime;

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime dateTime = LocalDateTime.parse(dateString + " 00:00:00", formatter);

        ArrayList<ScheduleModel> scheduleModels = ScheduleController.fetchSchedule(origin, destination, dateTime, dayTime);

        for (ScheduleModel scheduleModel : scheduleModels) scheduleModel.setStringDates();

        ArrayList<Schedule> schedules = new ArrayList<>();
        for (ScheduleModel scheduleModel : scheduleModels) schedules.add(new Schedule(scheduleModel));

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        out.append(gson.toJson(schedules));
        out.flush();
    }
}






