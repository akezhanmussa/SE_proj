package kz.edu.nu.cs.se.api;

import com.google.gson.Gson;
import kz.edu.nu.cs.se.api.utils.JWTUtils;
import kz.edu.nu.cs.se.api.utils.MyPageObject;
import kz.edu.nu.cs.se.api.utils.Token;
import kz.edu.nu.cs.se.model.User;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

import static kz.edu.nu.cs.se.api.utils.JWTUtils.isExpired;

@WebServlet(urlPatterns = {"/myrailway/mypage"})
public class MyPageServlet extends HttpServlet {

    public MyPageServlet() {super();}

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {

        PrintWriter out = response.getWriter();

        Gson gson = new Gson();
        System.out.println("I AM HERE");
        String token = new Gson().fromJson(request.getReader(), Token.class).getToken();
        System.out.println(token);
        if (isExpired(token)){
            response.sendError(401, "Token has expired");
        }


        User user = JWTUtils.getUserFromToken(token);
        MyPageObject myPageObject = new MyPageObject(user.getFirstName(),
                                                        user.getLastName(),
                                                        user.getEmail(),
                                                        user.getPhoneNumber(),
                                                        user.getUserName());



        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        out.append(gson.toJson(myPageObject));
        out.flush();
    }

}