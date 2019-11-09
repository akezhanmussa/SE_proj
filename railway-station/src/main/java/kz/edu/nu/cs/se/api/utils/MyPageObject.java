package kz.edu.nu.cs.se.api.utils;

public class MyPageObject {

    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private String userName;

    public MyPageObject(String firstName, String lastName, String email, String phoneNumber, String userName) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.userName = userName;
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

}
