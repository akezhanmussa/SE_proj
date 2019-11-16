package kz.edu.nu.cs.se.dao;

import kz.edu.nu.cs.se.model.User;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Optional;

public class PassengerController {

    public static boolean isValidUserName(String userName){
        Statement passengerStatement = Connector.getStatement();
        try {
            ResultSet passengerSet = passengerStatement.executeQuery(String.format("SELECT * FROM Passenger where username = '%s'", userName));
            while(passengerSet.next()){
                return false;
            }
            passengerStatement.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return true;
    }

    public static void addPassenger(User user, String password){
        Statement passengerStatement = Connector.getStatement();
        String firstName = user.getFirstName();
        String lastName = user.getLastName();
        String email = user.getEmail();
        String phoneNumber = user.getPhoneNumber();
        String userName = user.getUserName();

        String queryInsert = String.format("Insert into Passenger(firstname, lastname, email, phone_number, username, password) Values('%s','%s','%s','%s','%s','%s')",
                firstName,lastName,email,phoneNumber,userName,password);
        try {
            passengerStatement.executeUpdate(queryInsert);
            passengerStatement.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public static Optional<User> getPassenger(String username, String pass){
        Statement passengerStatement = Connector.getStatement();
        try {
            ResultSet passengerSet = passengerStatement.executeQuery(String.format("SELECT * FROM Passenger where username = '%s' and password = '%s'", username, pass));
            while(passengerSet.next()){
                int passengerId = passengerSet.getInt(1);
                String firstName = passengerSet.getString(2);
                String lastName= passengerSet.getString(3);
                String email= passengerSet.getString(4);
                String phoneNumber= passengerSet.getString(5);
                String userName= passengerSet.getString(6);

                User user = new User(firstName,lastName,email,phoneNumber,userName,passengerId);
                user.setUserRole("passenger");
                passengerStatement.close();
                return Optional.of(user);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

}
