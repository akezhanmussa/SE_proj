package kz.edu.nu.cs.se.api;

import com.google.gson.Gson;
import kz.edu.nu.cs.se.api.utils.JWTUtils;
import kz.edu.nu.cs.se.api.utils.Token;
import kz.edu.nu.cs.se.dao.AgentController;
import kz.edu.nu.cs.se.dao.ManagerController;
import kz.edu.nu.cs.se.model.AgentModel;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

import static kz.edu.nu.cs.se.api.utils.JWTUtils.isExpired;
import static kz.edu.nu.cs.se.api.utils.JWTUtils.isManager;

@WebServlet(urlPatterns = {"/myrailway/manager/get-agents"})
public class GetAgentsOfManagerServlet extends HttpServlet {

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {

        String token = new Gson().fromJson(request.getReader(), Token.class).getToken();
        System.out.println(String.format("Received token: %s", token));

        if (isExpired(token) && isManager(token)){
            System.out.println("[ERROR] Token has expired");
            response.sendError(401, "Token has expired");
        }

        String managerUserName = JWTUtils.getUserFromToken(token);
        int managerStationId = ManagerController.getManagerStationID(managerUserName);
        System.out.println("Manager station id: " + managerStationId);

        ArrayList<AgentModel> agentModels = AgentController
                .getAgents(managerStationId);

        PrintWriter out = response.getWriter();
        out.append(new Gson().toJson(agentModels));
        out.flush();
    }
}
