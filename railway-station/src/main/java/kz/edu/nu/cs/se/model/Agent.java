package kz.edu.nu.cs.se.model;

public class Agent {

    private int idAgent;
    private int salary;
    private int workingHours;
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private String userName;
    private String password;
    private int stationId;

    public Agent(int idAgent, int salary, int workingHours, String firstName, String lastName,
                 String email, String phoneNumber, String userName, String password, int stationId) {
        this.idAgent = idAgent;
        this.salary = salary;
        this.workingHours = workingHours;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.userName = userName;
        this.password = password;
        this.stationId = stationId;
    }

    public Agent(int agentId, String firstName, String lastName, int salary, int workingHours, int stationId) {
        this.idAgent = agentId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.salary = salary;
        this.workingHours = workingHours;
        this.stationId = stationId;
    }

    public int getIdAgent() {
        return idAgent;
    }

    public int getSalary() {
        return salary;
    }

    public int getWorkingHours() {
        return workingHours;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getEmail() {
        return email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public String getUserName() {
        return userName;
    }

    public String getPassword() {
        return password;
    }

    public int getStationId() {
        return stationId;
    }
}
