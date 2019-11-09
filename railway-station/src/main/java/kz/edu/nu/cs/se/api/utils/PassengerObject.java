package kz.edu.nu.cs.se.api.utils;

public class PassengerObject {
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private String userName;
    private String password;
    private int userId;
    private String token;
    private Long expiresAt;

    public PassengerObject(){}

    public PassengerObject(String firstName, String lastName, String email, String phoneNumber, String userName, String password, int userId, String token, Long expiresAt) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.userName = userName;
        this.password = password;
        this.userId = userId;
        this.token = token;
        this.expiresAt = expiresAt;
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

    public int getUserId() {
        return userId;
    }

    public String getToken() {
        return token;
    }

    public Long getExpiresAt() {
        return expiresAt;
    }
}
