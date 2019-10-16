package kz.edu.nu.cs.se.api;

import com.google.gson.Gson;
import kz.edu.nu.cs.se.model.Route;

import javax.ws.rs.*;
import javax.ws.rs.core.Response;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;


@Path("/routes")
public class RailwayService {

    private List<Route> routesList = new CopyOnWriteArrayList<>();

    public RailwayService() {}

    @GET
    public Response getList() {
        Gson gson = new Gson();

        return Response.ok(gson.toJson(routesList)).build();
    }

    @GET
    @Path("{id: [0-9]+}")
    public Response getListItem(@PathParam("id") String id) {
        int i = Integer.parseInt(id);

        return Response.ok(routesList.get(i).getOrigin()).build();
    }

    @POST
    public Response postListItem(@FormParam("origin") String origin,
                                 @FormParam("destination") String destination,
                                 @FormParam("startdate") String date) {

        try {
            Date start = new SimpleDateFormat("dd-MM-yyyy").parse(date);
            routesList.add(0, new Route(origin, destination, start, new Date()));
        } catch (ParseException e) {
            System.out.println(e.getMessage());
        }



        return Response.ok().build();
    }

}






