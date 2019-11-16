package kz.edu.nu.cs.se.dao;

import kz.edu.nu.cs.se.model.User;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Optional;

public class AdminController {
    public static Optional<User> getAdmin(String username, String pass){
        Statement adminStatement = Connector.getStatement();
        User user = new User();
        try {
            ResultSet agentSet = adminStatement.executeQuery(String.format("SELECT * FROM Agent where username = '%s' and password = '%s'", username, pass));
            while(agentSet.next()){
                int userId = agentSet.getInt(1);
                String firstName = agentSet.getString(4);
                String lastName= agentSet.getString(5);
                String email= agentSet.getString(6);
                String phoneNumber= agentSet.getString(7);
                String userName = agentSet.getString(8);
                System.out.println(firstName + lastName + email);
                user = new User(firstName,lastName,email,phoneNumber,userName,userId);
                System.out.println(user);
                user.setUserRole("agent");
            }

            ResultSet managerSet = adminStatement.executeQuery(String.format("SELECT * FROM Manager where username = '%s' and password = '%s'", username, pass));
            while(managerSet.next()){
                int userId = managerSet.getInt(1);
                String firstName = managerSet.getString(4);
                String lastName= managerSet.getString(5);
                String email= managerSet.getString(6);
                String phoneNumber= managerSet.getString(7);
                String userName= managerSet.getString(8);

                user = new User(firstName,lastName,email,phoneNumber,userName,userId);
                System.out.println("HEREREE");
                user.setUserRole("manager");
                adminStatement.close();

            }
            return Optional.of(user);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

}
