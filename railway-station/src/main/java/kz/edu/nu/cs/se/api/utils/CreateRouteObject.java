package kz.edu.nu.cs.se.api.utils;

import kz.edu.nu.cs.se.model.RouteShortModel;

import java.util.List;

public class CreateRouteObject {
    String token;
    Integer scheduleId;
    Integer trainId;
    List<RouteShortModel> routes;

    public String getToken() {
        return token;
    }

    public Integer getScheduleId() {
        return scheduleId;
    }

    public Integer getTrainId() {
        return trainId;
    }

    public List<RouteShortModel> getRoutes() {
        return routes;
    }
}
