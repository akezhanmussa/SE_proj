package kz.edu.nu.cs.se.api;

import com.google.gson.Gson;
import kz.edu.nu.cs.se.api.utils.CreateRouteObject;
import kz.edu.nu.cs.se.dao.RouteController;
import kz.edu.nu.cs.se.model.RouteShortModel;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

import static kz.edu.nu.cs.se.api.utils.JWTUtils.isExpired;
import static kz.edu.nu.cs.se.api.utils.JWTUtils.isManager;

@WebServlet(urlPatterns = {"/myrailway/manager/create-route"})
public class CreateRouteServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        CreateRouteObject createRouteObject = new Gson().fromJson(req.getReader(),
                CreateRouteObject.class);

        String token = createRouteObject.getToken();
        if (isExpired(token)) {
            System.out.println("[ERROR] Token has expired");
            resp.sendError(401, "Token has expired");
            return;
        }

        if (!isManager(token)) {
            System.out.println("[ERROR] Unauthorized as Manager");
            resp.sendError(401, "Unauthorized as Manager");
            return;
        }

        Integer scheduleId = createRouteObject.getScheduleId();
        Integer trainId = createRouteObject.getTrainId();
        List<RouteShortModel> routesList = createRouteObject.getRoutes();


        Boolean status = RouteController.createRoutes(scheduleId, trainId, routesList);

        if (status) {
            resp.sendError(202, "Success");
        } else {
            resp.sendError(503, "An internal error occurred");
        }
    }
}