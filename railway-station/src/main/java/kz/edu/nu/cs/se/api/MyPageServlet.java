package kz.edu.nu.cs.se.api;

import com.google.gson.Gson;
import kz.edu.nu.cs.se.api.utils.*;
import kz.edu.nu.cs.se.dao.PassengerController;
import kz.edu.nu.cs.se.model.User;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.logging.Logger;

import static kz.edu.nu.cs.se.api.utils.JWTUtils.*;

@WebServlet(urlPatterns = {"/myrailway/mypage"})
public class MyPageServlet extends HttpServlet {

    private static final Logger logger = Logger.getLogger(MyPageServlet.class.getName());

    public MyPageServlet() {super();}

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Gson gson = new Gson();
        logger.info("Incoming request reader: " + request.getReader());
        String token = new Gson().fromJson(request.getReader(), Token.class).getToken();
        logger.info("Token: : " + token);

        if (isExpired(token)){
            logger.warning("Token has expired");
            response.sendError(401, "Token has expired");
        }

        if(!isPassenger(token)) {
            logger.warning("Unauthorized as passenger");
            response.sendError(401, "Unauthorized as passenger");
        }


        User user = PassengerController.getPassenger(getUserFromToken(token)).get();
        MyPageObject myPageObject = new MyPageObject(user.getFirstName(),
                                                        user.getLastName(),
                                                        user.getEmail(),
                                                        user.getPhoneNumber(),
                                                        user.getUserName());


        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        PrintWriter out = response.getWriter();
        out.append(gson.toJson(myPageObject));
        out.flush();
    }

}