package kz.edu.nu.cs.se.api;

import com.google.gson.Gson;
import kz.edu.nu.cs.se.api.utils.MyPageObject;
import kz.edu.nu.cs.se.api.utils.Token;
import kz.edu.nu.cs.se.dao.AgentController;
import kz.edu.nu.cs.se.dao.ManagerController;
import kz.edu.nu.cs.se.model.User;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.logging.Logger;

import static kz.edu.nu.cs.se.api.utils.JWTUtils.*;

@WebServlet(urlPatterns = {"/myrailway/admin/mypage"})
public class AdminPageServlet extends HttpServlet {

    private final static Logger logger = Logger.getLogger(AdminPageServlet.class.getName());

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Gson gson = new Gson();

        logger.info("Received request body: : "+request.getReader());

        String token = new Gson().fromJson(request.getReader(), Token.class).getToken();
        logger.info("Fetched token: : " + token);

        if (isExpired(token)){
            logger.warning("Token has expired");
            response.sendError(401, "Token has expired");
            return;
        }

        if(!(isManager(token) || isAgent(token))) {
            logger.warning("Unauthorized as admin");
            response.sendError(401, "Unauthorized as admin");
            return;
        }

        User user = new User();
        if(isManager(token)) {
            user = ManagerController.getManager(getUserFromToken(token)).get();
        } else {
            user = AgentController.getAgent(getUserFromToken(token)).get();
        }


        MyPageObject myPageObject = new MyPageObject(user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getPhoneNumber(),
                user.getUserName(),
                user.getSalary(),
                user.getWorkingHours());


        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        out.append(gson.toJson(myPageObject));
        out.flush();
    }

}