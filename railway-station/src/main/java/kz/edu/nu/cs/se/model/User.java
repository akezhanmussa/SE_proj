package kz.edu.nu.cs.se.model;

public class User {

    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private String userName;
    private Integer userId;
    private String userRole;
    private Integer salary;
    private Integer workingHours;

    public User(){}
    public User(String firstName, String lastName, String email, String phoneNumber,
                String userName, int userId){
        this.setFirstName(firstName);
        this.setLastName(lastName);
        this.setEmail(email);
        this.setPhoneNumber(phoneNumber);
        this.setUserName(userName);
        this.userId = userId;
    }

    public User(String firstName, String lastName, String email, String phoneNumber, String userName, int userId, Integer salary, Integer workingHours) {
        this.setFirstName(firstName);
        this.setLastName(lastName);
        this.setEmail(email);
        this.setPhoneNumber(phoneNumber);
        this.setUserName(userName);
        this.userId = userId;
        this.salary = salary;
        this.workingHours = workingHours;

    }

    public Integer getSalary() {
        return salary;
    }

    public Integer getWorkingHours() {
        return workingHours;
    }

    public void setUserId(int passengerId) {
        this.userId = passengerId;
    }

    public int getUserId(){
        return userId;
    }


    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserRole() {
        return userRole;
    }

    public void setUserRole(String userRole) {this.userRole = userRole; }
}
