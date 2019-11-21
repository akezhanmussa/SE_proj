package kz.edu.nu.cs.se.model;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;

public class ScheduleModel {
    private Integer id;
    private String origin = null;
    private String destination = null;
    private String startTime;
    private String endTime;
    private LocalDateTime startTimeObject;
    private LocalDateTime endTimeObject;
    private TrainModel trainModel;
    private ArrayList<RouteModel> routes;
    private Integer capacity;
    private Integer price;

    public ScheduleModel(Integer id) {
        this.setId(id);
        this.setRoutes(new ArrayList<>());
        this.price = 0;
    }

    public ArrayList<RouteModel> getRoutes() { return routes; }

    public void AddRoute(RouteModel route) {
        if (routes.size() == 0) {
            capacity = route.getCapacity();
        } else {
            capacity = Math.min(capacity, route.getCapacity());
        }
        this.price += route.getPrice();
        routes.add(route);
    }

    public Integer getCapacity() {
        return this.capacity;
    }

    public Integer getId() {
        return id;
    }

    private void setId(Integer id) {
        this.id = id;
    }

    public void setRoutes(ArrayList<RouteModel> routes) {
        for (RouteModel routeModel : routes) this.AddRoute(routeModel);
    }

    public LocalDateTime getStartTimeObject() {
        return startTimeObject;
    }

    public void setStartTimeObject(LocalDateTime startTimeObject) {
        this.startTimeObject = startTimeObject;
    }

    public LocalDateTime getEndTimeObject() {
        return endTimeObject;
    }

    public void setEndTimeObject(LocalDateTime endTimeObject) {
        this.endTimeObject = endTimeObject;
    }

    public TrainModel getTrainModel() {
        return trainModel;
    }

    public void setTrainModel(TrainModel trainModel) {
        this.trainModel = trainModel;
    }

    public void sortRoutes() {
        Collections.sort(routes, new Comparator<RouteModel>() {
            @Override
            public int compare(RouteModel o1, RouteModel o2) {
                return o1.getStartDateObject().compareTo(o2.getStartDateObject());
            }
        });
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

    public void setStringDates() {
        for (RouteModel route : routes) {
            route.setStringDates();
        }
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/YYYY HH:mm:ss");
        startTime = startTimeObject.format(formatter);
        endTime = endTimeObject.format(formatter);
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }
}
