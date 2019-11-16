package kz.edu.nu.cs.se.dao;

import kz.edu.nu.cs.se.model.Passenger;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class PassengerController {

    static Statement passengerStatement = Connector.getStatement();
    public static boolean isValidUserName(String userName){
        try {
            ResultSet passengerSet = passengerStatement.executeQuery(String.format("SELECT * FROM Passenger where username = '%s'", userName));
            while(passengerSet.next()){
                return false;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return true;
    }

    public static void addPassenger(Passenger passenger){

        String firstName = passenger.getFirstName();
        String lastName = passenger.getLastName();
        String email = passenger.getEmail();
        String phoneNumber = passenger.getPhoneNumber();
        String userName = passenger.getUserName();
        String password = passenger.getPassword();

        String queryInsert = String.format("Insert into Passenger(firstname, lastname, email, phone_number, username, password) Values('%s','%s','%s','%s','%s','%s')",
                firstName,lastName,email,phoneNumber,userName,password);
        try {
            passengerStatement.executeUpdate(queryInsert);
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public static Passenger getPassenger(String username, String pass){
        try {
            ResultSet passengerSet = passengerStatement.executeQuery(String.format("SELECT * FROM Passenger where username = '%s' and password = '%s'", username, pass));
            while(passengerSet.next()){
                int passengerId = passengerSet.getInt(1);
                String firstName = passengerSet.getString(2);
                String lastName= passengerSet.getString(3);
                String email= passengerSet.getString(4);
                String phoneNumber= passengerSet.getString(5);
                String userName= passengerSet.getString(6);
                String password= passengerSet.getString(7);

                Passenger passenger = new Passenger(firstName,lastName,email,phoneNumber,userName,password,passengerId);
                return passenger;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

}
