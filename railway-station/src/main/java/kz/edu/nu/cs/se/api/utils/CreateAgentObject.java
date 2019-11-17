package kz.edu.nu.cs.se.api.utils;

public class CreateAgentObject {
    private String token;
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private String username;
    private String password;
    private Float salary;
    private Integer workHours;


    public CreateAgentObject(String firstName,
                             String lastName,
                             String email,
                             String phoneNumber,
                             String userName,
                             Float salary,
                             String password,
                             Integer workHours,
                             String token
                             ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.username = userName;
        this.salary = salary;
        this.password = password;
        this.workHours = workHours;
        this.token = token;
    }


    public String getToken() {
        return token;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public Float getSalary() {
        return salary;
    }

    public Integer getWorkHours() {
        return workHours;
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
        return username;
    }
}
