package kz.edu.nu.cs.se.model;

public class RouteShortModel {
    String startTime;
    String endTime;
    Integer startStationId;
    Integer endStationId;
    Float price;

    public RouteShortModel(String startTime, String endTime, Integer startStationId, Integer endStationId, Float price) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.startStationId = startStationId;
        this.endStationId = endStationId;
        this.price = price;

    }

    public String getStartTime() {
        return startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public Integer getStartStationId() {
        return startStationId;
    }

    public Integer getEndStationId() {
        return endStationId;
    }

    public Float getPrice() {
        return price;
    }
}
