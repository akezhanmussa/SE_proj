package kz.edu.nu.cs.se.api;

import com.google.gson.Gson;
import kz.edu.nu.cs.se.api.utils.AgentStationWorkerObject;
import kz.edu.nu.cs.se.dao.StationWorkersController;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.logging.Logger;

import static kz.edu.nu.cs.se.api.utils.JWTUtils.isExpired;
import static kz.edu.nu.cs.se.api.utils.JWTUtils.isManager;

@WebServlet(urlPatterns = {"/myrailway/manager/update-station-worker"})
public class UpdateStationWorkersOfManagerServlet extends HttpServlet {
    private static final Logger logger = Logger.getLogger(UpdateStationWorkersOfManagerServlet.class.getName());

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        AgentStationWorkerObject agentStationWorkerObject = new Gson().fromJson(request.getReader(), AgentStationWorkerObject.class);
        String token = agentStationWorkerObject.getToken();

        if (isExpired(token) && isManager(token)){
            logger.warning("[ERROR] Token has expired");
            response.sendError(401, "Token has expired");
        }

        int stationWorkerId = agentStationWorkerObject.getId();
        Float salary = agentStationWorkerObject.getSalary();
        Integer workingHours = agentStationWorkerObject.getWorkingHours();

        if (salary!=null){
            StationWorkersController.updateStationWorkerSalary(stationWorkerId, salary);
        }

        if (salary!=null){
            StationWorkersController.updateStationWorkerWorkingHours(stationWorkerId, workingHours);
        }

        response.setStatus(200);


    }
}
