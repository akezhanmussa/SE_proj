package kz.edu.nu.cs.se.view;

import kz.edu.nu.cs.se.model.RouteModel;

import java.time.Duration;
import java.time.format.DateTimeFormatter;

public class Route {
    private String origin;
    private String destination;
    private String startTime;
    private String endTime;
    private String duration;

    private static DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    private static String durationFormat = "%2d minutes";

    Route(RouteModel routeModel) {
        this.origin = routeModel.getOrigin();
        this.destination = routeModel.getDestination();
        this.startTime = routeModel.getStartDateObject().format(dateFormatter);
        this.endTime = routeModel.getEndDateObject().format(dateFormatter);

        long minutes = Duration.between(routeModel.getEndDateObject(), routeModel.getEndDateObject()).toMinutes();
        this.duration = String.format(durationFormat, minutes);
    }

    public String getOrigin() {
        return origin;
    }

    public void setOrigin(String origin) {
        this.origin = origin;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }
}
