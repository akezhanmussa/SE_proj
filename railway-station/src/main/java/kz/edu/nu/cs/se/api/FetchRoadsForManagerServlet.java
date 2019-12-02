package kz.edu.nu.cs.se.api;

import com.google.gson.Gson;
import kz.edu.nu.cs.se.api.utils.Token;
import kz.edu.nu.cs.se.dao.ManagerController;
import kz.edu.nu.cs.se.dao.ScheduleController;
import kz.edu.nu.cs.se.model.ScheduleModel;
import kz.edu.nu.cs.se.view.Schedule;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.logging.Logger;

import static kz.edu.nu.cs.se.api.utils.JWTUtils.*;

@WebServlet(urlPatterns = {"/myrailway/manager/fetch-all-tickets"})
public class FetchRoadsForManagerServlet extends HttpServlet {

    private static final Logger logger = Logger.getLogger(FetchRoadsForManagerServlet.class.getName());

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException,
                                                                                            IOException {

        logger.info("I AM CALLED");
        String token = new Gson().fromJson(request.getReader(), Token.class).getToken();

        if (isExpired(token)){
            logger.warning("[ERROR] Token has expired");
            response.sendError(401, "Token has expired");
            return;
        }

        if (!isManager(token)) {
            logger.warning("[ERROR] Access denied. User is not a manager.");
            response.sendError(401, "Access denied. User is not a manager.");
            return;
        }

        Integer managerStationID = ManagerController.getManagerStationID(getUserFromToken(token));

        ArrayList<ScheduleModel> scheduleModels = ScheduleController.fetchAllSchedules(managerStationID);
        logger.info("Fetched array of ScheduleModel of size: " + scheduleModels.size());

        for (ScheduleModel scheduleModel : scheduleModels) scheduleModel.setStringDates();
        logger.info("Changed Dates to String values for schedules");

        ArrayList<Schedule> schedules = new ArrayList<>();
        for (ScheduleModel scheduleModel : scheduleModels) schedules.add(new Schedule(scheduleModel));
        logger.info("Changed from ScheduleModel to Schedule (View Class)");

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        PrintWriter out = response.getWriter();
        out.append(new Gson().toJson(schedules));
        out.flush();
    }
}
