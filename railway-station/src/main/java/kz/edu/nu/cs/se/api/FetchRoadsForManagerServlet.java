package kz.edu.nu.cs.se.api;

import com.google.gson.Gson;
import kz.edu.nu.cs.se.api.utils.JWTUtils;
import kz.edu.nu.cs.se.api.utils.TicketRequestObject;
import kz.edu.nu.cs.se.api.utils.Token;
import kz.edu.nu.cs.se.dao.ScheduleController;
import kz.edu.nu.cs.se.model.ScheduleModel;
import kz.edu.nu.cs.se.model.User;
import kz.edu.nu.cs.se.view.Schedule;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

import static kz.edu.nu.cs.se.api.utils.JWTUtils.isExpired;
import static kz.edu.nu.cs.se.api.utils.JWTUtils.isManager;

@WebServlet(urlPatterns = {"/myrailway/manager/fetch-all-tickets"})
public class FetchRoadsForManagerServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException,
                                                                                            IOException {

        System.out.println("I AM CALLED");
//        String token = new Gson().fromJson(request.getReader(), Token.class).getToken();
//
//        if (isExpired(token)){
//            System.out.println("[ERROR] Token has expired");
//            response.sendError(401, "Token has expired");
//        }
//
//        if (!isManager(token)) {
//            System.out.println("[ERROR] Access denied. User is not a manager.");
//            response.sendError(401, "Access denied. User is not a manager.");
//        }

        ArrayList<ScheduleModel> scheduleModels = ScheduleController.fetchAllSchedules();
        System.out.println("HERE 4");
        //for (ScheduleModel scheduleModel : scheduleModels) scheduleModel.setStringDates();
        System.out.println("HERE 3");
        ArrayList<Schedule> schedules = new ArrayList<>();
        for (ScheduleModel scheduleModel : scheduleModels) schedules.add(new Schedule(scheduleModel));
        System.out.println("HERE 2");
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        System.out.println(schedules.size() + " IN SERVLET");
        PrintWriter out = response.getWriter();
        out.append(new Gson().toJson(schedules));
        out.flush();
    }
}
