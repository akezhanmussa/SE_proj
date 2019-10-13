package kz.edu.nu.cs.se.model;

import java.util.Date;

public class Route {

    private String origin;
    private String destination;
    private Date startDate;
    private Date endDate;

    public Route() {}

    public Route(String origin, String destination, Date startDate, Date endDate) {
        this.origin = origin;
        this.destination = destination;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public String getOrigin() {
        return this.origin;
    }

    public String getDestination() {
        return this.destination;
    }

    public Date getStartDate() {
        return this.startDate;
    }

    public Date getEndDate() {
        return this.endDate;
    }
}
