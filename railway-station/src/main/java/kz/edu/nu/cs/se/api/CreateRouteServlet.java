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
import java.io.PrintWriter;
import java.util.List;
import java.util.logging.Logger;

import static kz.edu.nu.cs.se.api.utils.JWTUtils.isExpired;
import static kz.edu.nu.cs.se.api.utils.JWTUtils.isManager;

@WebServlet(urlPatterns = {"/myrailway/manager/create-route"})
public class CreateRouteServlet extends HttpServlet {

    Logger logger = Logger.getLogger(CreateRouteServlet.class.getName());

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        CreateRouteObject createRouteObject = new Gson().fromJson(req.getReader(),
                CreateRouteObject.class);

        String token = createRouteObject.getToken();
        if (isExpired(token)) {
            logger.warning("[ERROR] Token has expired");
            resp.sendError(401, "Token has expired");
            return;
        }

        if (!isManager(token)) {
            logger.warning("[ERROR] Unauthorized as Manager");
            resp.sendError(401, "Unauthorized as Manager");
            return;
        }

        Integer trainId = createRouteObject.getTrainId();
        List<RouteShortModel> routesList = createRouteObject.getRoutes();

        Boolean status = RouteController.createRoutes(trainId, routesList);
        System.out.println(status);

        if (!status) {
            logger.severe("An internal error occurred");
            resp.sendError(503, "An internal error occurred");
            return;
        }

        Gson gson = new Gson();
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");
        PrintWriter out = resp.getWriter();
        out.append(gson.toJson("SUCCESS"));
        out.flush();
    }
}
