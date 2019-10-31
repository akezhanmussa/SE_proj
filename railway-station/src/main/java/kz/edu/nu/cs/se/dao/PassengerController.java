package kz.edu.nu.cs.se.dao;


import kz.edu.nu.cs.se.model.Passenger;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class PassengerController {

    public static boolean isValidUserName(String userName){

        Statement passengerStatement = Connector.getStatement();

        try {
            ResultSet passengerSet = passengerStatement.executeQuery(String.format("SELECT * FROM Passenger where username = '%s'", userName));
            System.out.println(userName);
            while(passengerSet.next()){
                return false;
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return true;

    }

    public static void addPassenger(Passenger passenger){

        Statement passengerStatement = Connector.getStatement();

        int passengerId = passenger.getPassengerId();
        String firstName = passenger.getFirstName();
        String lastName= passenger.getLastName();
        String email= passenger.getEmail();
        String phoneNumber= passenger.getPhoneNumber();
        String userName= passenger.getUserName();
        String password= passenger.getPassword();

        String values = passengerId + "," + firstName+ "," +lastName+ "," +email+ "," +phoneNumber+ "," +userName+ "," +password;

        System.out.println(values);

        String queryInsert = String.format("Insert into Passenger(idPassenger, firstname, lastname, email, phone_number, username, password) Values(%d,'%s','%s','%s','%s','%s','%s')",
                passengerId,firstName,lastName,email,phoneNumber,userName,password);

        try {
            passengerStatement.executeUpdate(queryInsert);
        } catch (SQLException e) {
            e.printStackTrace();
        }

    }

    public static boolean isPassengerUsername(String username) {
        try {
            Statement statement = Connector.getStatement();

            ResultSet passengerSet = statement.executeQuery("SELECT username FROM Passenger WHERE username="+username);
            while (passengerSet.next()) {
                Boolean userName = passengerSet.getBoolean(1);
                if (userName == true) return true;
            }


        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }

        return false;
    }

    public static boolean isPassengerPassword(String password) {
        try {
            Statement statement = Connector.getStatement();

            ResultSet passengerSet = statement.executeQuery("SELECT password FROM Passenger WHERE password="+password);
            while (passengerSet.next()) {
                Boolean pw = passengerSet.getBoolean(1);
                if (pw == true) return true;
            }


        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }

        return false;
    }


    public static int getPID() {
        try {
            Statement statement = Connector.getStatement();

            ResultSet passengerSet = statement.executeQuery("SELECT idPassenger FROM Passenger");
            while (passengerSet.next()) {
                Integer  passengerId = passengerSet.getInt(1);
                return passengerId;
            }
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }

        return -1;
    }




}
