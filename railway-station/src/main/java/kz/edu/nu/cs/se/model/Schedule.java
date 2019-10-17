package kz.edu.nu.cs.se.model;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;

public class Schedule {
    private Integer id;
    private String origin = null;
    private String destination = null;
    private String startTime;
    private String endTime;
    private LocalDateTime startTimeObject;
    private LocalDateTime endTimeObject;
    private Train train;
    private ArrayList<Route> routes;

    public Schedule(Integer id) {
        this.setId(id);
        this.setTrain(train);
        this.setRoutes(new ArrayList<>());
    }

    public ArrayList<Route> getRoutes() { return routes; }

    public void AddRoute(Route route) {
        getRoutes().add(route);
        if (this.getStartTimeObject() == null) this.setStartTimeObject(route.getStartDateObject());
        if (this.getEndTimeObject() == null) this.setEndTimeObject(route.getEndDateObject());

        if (this.getOrigin() == null) this.setOrigin(route.getOrigin());
        if (this.getDestination() == null) this.setDestination(route.getDestination());

        if (this.getStartTimeObject().compareTo(route.getStartDateObject()) > 0) {
            setStartTimeObject(route.getStartDateObject());
            setOrigin(route.getOrigin());
        }

        if (this.getEndTimeObject().compareTo(route.getEndDateObject()) < 0) {
            setEndTimeObject(route.getEndDateObject());
            setDestination(route.getDestination());
        }
    }

    public Integer getId() {
        return id;
    }

    private void setId(Integer id) {
        this.id = id;
    }

    public void setRoutes(ArrayList<Route> routes) {
        this.routes = routes;
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

    public Train getTrain() {
        return train;
    }

    public void setTrain(Train train) {
        this.train = train;
    }

    public void sortRoutes() {
        Collections.sort(routes, new Comparator<Route>() {
            @Override
            public int compare(Route o1, Route o2) {
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
        for (Route route : routes) {
            route.setStringDates();
        }
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/YYYY HH:mm:ss");
        startTime = startTimeObject.format(formatter);
        endTime = endTimeObject.format(formatter);
        startTimeObject = null;
        endTimeObject = null;
    }
}
