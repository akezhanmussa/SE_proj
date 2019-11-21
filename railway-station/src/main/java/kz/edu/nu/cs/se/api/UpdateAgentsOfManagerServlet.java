package kz.edu.nu.cs.se.api;

import com.google.gson.Gson;
import kz.edu.nu.cs.se.api.utils.AgentStationWorkerObject;
import kz.edu.nu.cs.se.dao.AgentController;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.logging.Logger;

import static kz.edu.nu.cs.se.api.utils.JWTUtils.isExpired;
import static kz.edu.nu.cs.se.api.utils.JWTUtils.isManager;

@WebServlet(urlPatterns = {"/myrailway/manager/update-agents"})
public class UpdateAgentsOfManagerServlet extends HttpServlet {
    private static final Logger logger = Logger.getLogger(UpdateAgentsOfManagerServlet.class.getName());

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        AgentStationWorkerObject updateAgentsOfManagerObject = new Gson().
                fromJson(request.getReader(), AgentStationWorkerObject.class);

        String token = updateAgentsOfManagerObject.getToken();
        if (isExpired(token) && isManager(token)){
            logger.warning("[ERROR] Token has expired");
            response.sendError(401, "Token has expired");
        }

        int agentId = updateAgentsOfManagerObject.getId();
        Float salary = updateAgentsOfManagerObject.getSalary();
        Integer workingHours = updateAgentsOfManagerObject.getWorkingHours();

        if (salary!=null){
            AgentController.updateAgentSalary(agentId, salary);
        }

        if (workingHours!=null){
            AgentController.updateAgentWorkingHours(agentId, workingHours);
        }

        response.setStatus(200);





    }
}
