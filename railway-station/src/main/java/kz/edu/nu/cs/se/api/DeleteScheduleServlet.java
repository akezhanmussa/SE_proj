package kz.edu.nu.cs.se.api;

import com.google.gson.Gson;
import kz.edu.nu.cs.se.api.utils.DeleteScheduleObject;
import kz.edu.nu.cs.se.dao.ScheduleController;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.logging.Logger;

import static kz.edu.nu.cs.se.api.utils.JWTUtils.isExpired;
import static kz.edu.nu.cs.se.api.utils.JWTUtils.isManager;

@WebServlet(urlPatterns = {"/myrailway/manager/delete-route"})
public class DeleteScheduleServlet extends HttpServlet {

    private static final Logger logger = Logger.getLogger(DeleteScheduleServlet.class.getName());

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        DeleteScheduleObject deleteScheduleObject = new Gson().fromJson(req.getReader(), DeleteScheduleObject.class);

        String token = deleteScheduleObject.getToken();
        if (isExpired(token)){
            logger.warning("[ERROR] Token has expired");
            resp.sendError(401, "Token has expired");
            return;
        }

        if (!isManager(token)){
            logger.warning("[ERROR] Unauthorized as Manager");
            resp.sendError(401, "Unauthorized as Manager");
            return;
        }

        Integer scheduleId = deleteScheduleObject.getScheduleId();

        Boolean status = ScheduleController.deleteSchedule(scheduleId);

        if(!status) {
            logger.severe("An internal error occured");
            resp.sendError(503, "An internal error occurred");
        }

        Gson gson = new Gson();

        PrintWriter out = resp.getWriter();
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        out.append(gson.toJson("SUCCESS"));
        out.flush();
    }
}
