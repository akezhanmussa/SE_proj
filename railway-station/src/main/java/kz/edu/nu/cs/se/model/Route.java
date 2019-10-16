package kz.edu.nu.cs.se.model;

import java.time.LocalDateTime;
import java.util.Date;

public class Route {

    private String origin;
    private String destination;
    private LocalDateTime startDate;
    private LocalDateTime endDate;

    public Route() {}

    public Route(String origin, String destination, LocalDateTime startDate, LocalDateTime endDate) {
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

    public LocalDateTime getStartDate() {
        return this.startDate;
    }

    public LocalDateTime getEndDate() {
        return this.endDate;
    }

}
