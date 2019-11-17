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

import static kz.edu.nu.cs.se.api.utils.JWTUtils.*;

@WebServlet(urlPatterns = { "/myrailway/manager" })
public class ManagerCreateAgentServlet extends HttpServlet {

    public ManagerCreateAgentServlet() {
        super();
    }


    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {

        Gson gson = new Gson();
        CreateAgentObject agentObject = new Gson().fromJson(request.getReader(), CreateAgentObject.class);

        String token = agentObject.getToken();

        if(isExpired(token)){
            response.sendError(401, "Token has expired");
            return;
        }

        if(!isManager(token)) {
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

<<<<<<< HEAD
        System.out.println(salary);
        System.out.println(workHours);
        System.out.println(firstName);
        System.out.println(lastName);
        System.out.println(email);
        System.out.println(phoneNumber);
        System.out.println(password);


        Integer stationId = -1;//TODO
=======
        Integer stationId = ManagerController.getManagerStationID(getUserFromToken(token));
>>>>>>> 2656265c0b6c6ae1f5e5843556b6360663642165

        Boolean status = false;
        if(CreateAgentController.isValidAgentEmail(email)) {
            System.out.println("isValidAgentEmail");
            status = CreateAgentController.createAgent(salary, workHours, firstName, lastName, email, phoneNumber, username, password, stationId);

        }
        PrintWriter out = response.getWriter();
        if (status) {
            out.append(new Gson().toJson("Successfully Created Agent"));
        } else {
            out.append(new Gson().toJson("Error!"));
        }
        out.flush();
    }
}