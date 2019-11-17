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

import static kz.edu.nu.cs.se.api.utils.JWTUtils.isExpired;
import static kz.edu.nu.cs.se.api.utils.JWTUtils.isManager;

@WebServlet(urlPatterns = {"/myrailway/manager/update-station-worker"})
public class UpdateStationWorkersOfManagerServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        AgentStationWorkerObject agentStationWorkerObject = new Gson().fromJson(request.getReader(), AgentStationWorkerObject.class);
        String token = agentStationWorkerObject.getToken();
        if (isExpired(token) && isManager(token)){
            System.out.println("[ERROR] Token has expired");
            response.sendError(401, "Token has expired");
        }

        int stationWorkerId = agentStationWorkerObject.getId();
        int salary = agentStationWorkerObject.getSalary();
        int workingHours = agentStationWorkerObject.getWorkingHours();

        if (salary>=0){
            StationWorkersController.updateStationWorkerSalary(stationWorkerId, salary);
        }

        if (workingHours>=0){
            StationWorkersController.updateStationWorkerWorkingHours(stationWorkerId, workingHours);
        }

        response.setStatus(200);


    }
}
