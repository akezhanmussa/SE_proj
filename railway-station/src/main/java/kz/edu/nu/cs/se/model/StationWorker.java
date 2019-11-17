package kz.edu.nu.cs.se.model;

public class StationWorker {

    private int stationWorkerId;
    private String firstName;
    private String lastName;
    private int salary;
    private int workingHours;
    private int stationId;

    public StationWorker(int stationWorkerId, String firstName, String lastName, int salary, int workingHours, int stationId) {
        this.stationWorkerId = stationWorkerId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.salary = salary;
        this.workingHours = workingHours;
        this.stationId = stationId;
    }

    public int getStationWorkerId() {
        return stationWorkerId;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public int getSalary() {
        return salary;
    }

    public int getWorkingHours() {
        return workingHours;
    }

    public int getStationId() {
        return stationId;
    }
}
