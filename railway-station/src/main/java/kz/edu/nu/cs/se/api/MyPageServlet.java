package kz.edu.nu.cs.se.api;

import com.google.gson.Gson;
import kz.edu.nu.cs.se.api.utils.*;
import kz.edu.nu.cs.se.model.User;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

import static kz.edu.nu.cs.se.api.utils.JWTUtils.*;

@WebServlet(urlPatterns = {"/myrailway/mypage"})
public class MyPageServlet extends HttpServlet {

    public MyPageServlet() {super();}

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Gson gson = new Gson();
        String token = new Gson().fromJson(request.getReader(), Token.class).getToken();
        if (isExpired(token)){
            response.sendError(401, "Token has expired");
        }

        if(!isAgent(token)) {
            response.sendError(401, "Unauthorized as passenger");
        }


        User user = JWTUtils.getUserFromToken(token);
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