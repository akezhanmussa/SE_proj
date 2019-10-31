package kz.edu.nu.cs.se.dao;

import java.text.SimpleDateFormat;
import java.util.Date;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.sun.org.apache.xml.internal.security.algorithms.SignatureAlgorithm;
import kz.edu.nu.cs.se.model.Passenger;
import kz.edu.nu.cs.se.model.Ticket;

import javax.validation.Payload;
import java.security.interfaces.RSAPublicKey;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

import javax.crypto.spec.SecretKeySpec;
import javax.xml.bind.DatatypeConverter;
import java.security.Key;



import java.util.Date;








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

        String firstName = passenger.getFirstName();
        String lastName = passenger.getLastName();
        String email = passenger.getEmail();
        String phoneNumber = passenger.getPhoneNumber();
        String userName = passenger.getUserName();
        String password = passenger.getPassword();

        String values = firstName+ "," +lastName+ "," +email+ "," +phoneNumber+ "," +userName+ "," +password;

        System.out.println(values);

        String queryInsert = String.format("Insert into Passenger(firstname, lastname, email, phone_number, username, password) Values('%s','%s','%s','%s','%s','%s')",
                firstName,lastName,email,phoneNumber,userName,password);



        try {
            passengerStatement.executeUpdate(queryInsert);
        } catch (SQLException e) {
            e.printStackTrace();
        }


    }

    public static String login(String username, String pass){
        Statement passengerStatement = Connector.getStatement();

        try {
            ResultSet passengerSet = passengerStatement.executeQuery(String.format("SELECT * FROM Passenger where username = '%s' and password = '%s'", username, pass));
            System.out.println(username);
            while(passengerSet.next()){
                String firstName = passengerSet.getString(1);
                String lastName= passengerSet.getString(2);
                String email= passengerSet.getString(3);
                String phoneNumber= passengerSet.getString(4);
                String userName= passengerSet.getString(5);
                String password= passengerSet.getString(6);

                Passenger passenger = new Passenger(firstName,lastName,email,phoneNumber,userName,password);
                return generateToken(passenger);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return "";
    }




    public static String generateToken(Passenger passenger) {

        Date date = new Date();
        Date date2 = new Date();
        date2.setMinutes(date.getMinutes() + 60);



        try {
            Algorithm algorithm = Algorithm.HMAC256("secret");
            String token = JWT.create()
                    .withIssuer("auth0")
                    .withClaim("first_name", passenger.getFirstName())
                    .withClaim("last_name", passenger.getLastName())
                    .withClaim("email", passenger.getEmail())
                    .withClaim("phone_number", passenger.getPhoneNumber())
                    .withClaim("user_name", passenger.getUserName())
                    .withClaim("password", passenger.getPassword())
                    .withIssuedAt(date)
                    .withExpiresAt(date2)
                    .sign(algorithm);
            return token;
        } catch (JWTCreationException exception){
            //Invalid Signing configuration / Couldn't convert Claims.
        }

        return "error";

    }

    public static Passenger getPassengerFromToken(String token){
        DecodedJWT jwt = JWT.decode(token);
        String firstName = jwt.getClaim("first_name").asString();
        String lastName = jwt.getClaim("last_name").asString();
        String email = jwt.getClaim("email").asString();
        String phoneNumber = jwt.getClaim("phone_number").asString();
        String userName = jwt.getClaim("user_name").asString();
        String password = jwt.getClaim("password").asString();

        return new Passenger(firstName,lastName,email,phoneNumber,userName,password);
    }

    /*
        Token validity is checked in the corresponding servlet
     */
    public static ArrayList<Ticket> getPassengerTickets(String token){

        ArrayList<Ticket> tickets = new ArrayList<>();

        Passenger passenger = getPassengerFromToken(token);

        Statement passengerStatement = Connector.getStatement();

        int id = passenger.getPassengerId();

        String queryGet = String.format("Select * from Tickets where Passenger_idPassenger = %d", id);

        try {
            ResultSet ticketSet = passengerStatement.executeQuery(queryGet);

            while(ticketSet.next()){
                int ticketId = ticketSet.getInt(1);
                int passengerId = ticketSet.getInt(2);
                String startDate = ticketSet.getString(3);
                String endDate= ticketSet.getString(4);
                String originId= ticketSet.getString(5);
                String destinationId= ticketSet.getString(6);
                String status= ticketSet.getString(7);
                String ownerDocumentType= ticketSet.getString(8);
                String ownerFirstName= ticketSet.getString(9);
                String ownerLastName= ticketSet.getString(10);
                String ownerDocumentId= ticketSet.getString(11);
                String price= ticketSet.getString(12);
                String agentId= ticketSet.getString(13);
                String scheduleId = ticketSet.getString(14);

                Ticket ticketInstance = new Ticket(ticketId,passengerId,startDate,endDate,originId,destinationId,
                        status,ownerDocumentType,ownerFirstName,ownerLastName,ownerDocumentId,price,agentId,scheduleId);
                tickets.add(ticketInstance);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return tickets;

    }
}
