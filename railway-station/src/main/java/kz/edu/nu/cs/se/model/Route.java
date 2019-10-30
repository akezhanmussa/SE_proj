package kz.edu.nu.cs.se.model;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class Route {

    private String origin;
    private String destination;
    private String startDate;
    private String endDate;
    private LocalDateTime startDateObject;
    private LocalDateTime endDateObject;

    public Route(String origin, String destination, LocalDateTime startDateObject, LocalDateTime endDateObject) {
        this.origin = origin;
        this.destination = destination;
        this.startDateObject = startDateObject;
        this.endDateObject = endDateObject;
    }

    public String getOrigin() {
        return this.origin;
    }

    public String getDestination() {
        return this.destination;
    }

    public LocalDateTime getStartDateObject() {
        return this.startDateObject;
    }

    public LocalDateTime getEndDateObject() {
        return this.endDateObject;
    }

    public void setStringDates(){
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/YYYY HH:mm:ss");
        startDate = startDateObject.format(formatter);
        endDate = endDateObject.format(formatter);
        startDateObject = null;
        endDateObject = null;
    }

}
