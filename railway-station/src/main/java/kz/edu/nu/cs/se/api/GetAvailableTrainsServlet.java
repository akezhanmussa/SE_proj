package kz.edu.nu.cs.se.api;

import com.google.gson.Gson;
import kz.edu.nu.cs.se.api.utils.Token;
import kz.edu.nu.cs.se.dao.TrainController;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import static kz.edu.nu.cs.se.api.utils.JWTUtils.*;

@WebServlet(urlPatterns = {"/myrailway/manager/get-available-trains"})
public class GetAvailableTrainsServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String token = new Gson().fromJson(req.getReader(), Token.class).getToken();
        if (isExpired(token)){
            resp.sendError(401, "Token has expired");
        }

        if(!isManager(token)) {
            resp.sendError(401, "Unauthorized as passenger");
        }


        List<Integer> trainList = TrainController.getTrainsAvailable();


        Gson gson = new Gson();
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");
        PrintWriter out = resp.getWriter();
        out.append(gson.toJson(trainList));
        out.flush();
    }
}
