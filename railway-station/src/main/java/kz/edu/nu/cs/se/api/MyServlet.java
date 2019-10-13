package kz.edu.nu.cs.se.api;

import java.io.IOException;
import java.io.PrintWriter;
import java.text.DateFormat;
import java.util.ArrayList;
import java.util.Date;
import javax.validation.constraints.Null;
import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import kz.edu.nu.cs.se.dao.Routes;
import kz.edu.nu.cs.se.model.Route;

@WebServlet(urlPatterns = { "/myrailway" })
public class MyServlet extends HttpServlet {

    public MyServlet() {
        super();
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        PrintWriter out = response.getWriter();
        Gson gson = new Gson();

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        Routes rts = new Routes();
        Route res = new Route("Astana", "Pavlodar", null, null);
        ArrayList<Route> ans = new ArrayList<>();
        ans.add(res);
        out.append(gson.toJson(ans));
        out.flush();
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        doGet(request, response);
    }
}






