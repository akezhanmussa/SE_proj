package kz.edu.nu.cs.se.view;

import kz.edu.nu.cs.se.model.RouteModel;
import kz.edu.nu.cs.se.model.ScheduleModel;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;

public class Schedule {
    private Integer id;
    private String origin;
    private String destination;
    private String startTime;
    private String endTime;
    private Train train;
    private ArrayList<Route> routes;

    public Schedule(ScheduleModel model) {
        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

        this.id = model.getId();
        this.origin = model.getOrigin();
        this.destination = model.getDestination();
        this.startTime = model.getStartTimeObject().format(dateFormatter);
        this.endTime = model.getEndTimeObject().format(dateFormatter);

        this.train = new Train(model.getTrainModel());

        this.routes = new ArrayList<>();
        for (RouteModel route : model.getRoutes()) {
            routes.add(new Route(route));
        }
    }

    public String getOrigin() {
        return origin;
    }

    public void setOrigin(String origin) {
        this.origin = origin;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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

    public Train getTrain() {
        return train;
    }

    public void setTrain(Train train) {
        this.train = train;
    }

    public void setRoutes(ArrayList<Route> routes) {
        this.routes = routes;
    }
}
