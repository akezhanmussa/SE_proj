package kz.edu.nu.cs.se.api;

import com.google.gson.Gson;
import kz.edu.nu.cs.se.api.utils.CreateAgentObject;
import kz.edu.nu.cs.se.dao.CreateAgentController;
import kz.edu.nu.cs.se.dao.ManagerController;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.logging.Logger;

import static kz.edu.nu.cs.se.api.utils.JWTUtils.*;

@WebServlet(urlPatterns = { "/myrailway/manager" })
public class ManagerCreateAgentServlet extends HttpServlet {

    private static final Logger logger = Logger.getLogger(ManagerCreateAgentServlet.class.getName());

    public ManagerCreateAgentServlet() {
        super();
    }


    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {

        CreateAgentObject agentObject = new Gson().fromJson(request.getReader(), CreateAgentObject.class);

        String token = agentObject.getToken();
        logger.info("Received token: " + token);

        if(isExpired(token)){
            logger.warning("Token has expired.");
            response.sendError(401, "Token has expired");
            return;
        }

        if(!isManager(token)) {
            logger.warning("Unauthorized as manager");
            response.sendError(401, "Unauthorized as manager");
            return;
        }

        Float salary = agentObject.getSalary();
        Integer workHours = agentObject.getWorkHours();
        String firstName = agentObject.getFirstName();
        String lastName = agentObject.getLastName();
        String email = agentObject.getEmail();
        String phoneNumber = agentObject.getPhoneNumber();
        String username = agentObject.getUsername();
        String password = agentObject.getPassword();

        Integer stationId = ManagerController.getManagerStationID(getUserFromToken(token));

        Boolean status = false;
        if(CreateAgentController.isValidAgentEmail(email)) {
            logger.info("isValidAgentEmail");
            status = CreateAgentController.createAgent(salary, workHours, firstName, lastName, email, phoneNumber, username, password, stationId);

        }
        PrintWriter out = response.getWriter();
        if (status) {
            logger.info("Successfully Created Agent");
            out.append(new Gson().toJson("Successfully Created Agent"));
        } else {
            logger.info("Error, agent is not created");
            out.append(new Gson().toJson("Error!"));
        }
        out.flush();
    }
}