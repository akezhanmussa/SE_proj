package kz.edu.nu.cs.se.dao;

import kz.edu.nu.cs.se.model.User;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Optional;

public class ManagerController {

    public static Integer getManagerStationID(String managerUserName) {
        Integer result = -1;
        try {
            Statement statement = Connector.getStatement();

            ResultSet stationResultSet = statement.executeQuery(String.format(
                    "SELECT * FROM Manager WHERE username='%s'", managerUserName));
            while(stationResultSet.next()){
                System.out.println("here in select manager stationId");
                result = stationResultSet.getInt(1);
                break;
            }
            System.out.println("Here: " + result);
        } catch (SQLException exception) {
            System.out.println(exception.getMessage());
        }
        return result;
    }


    public static Optional<User> getManager(String username){
        Statement passengerStatement = Connector.getStatement();
        try {
            ResultSet managerSet = passengerStatement.executeQuery(String.format("SELECT * FROM Manager where username = '%s'", username));
            while(managerSet.next()){
                int managerId = managerSet.getInt(1);
                Integer salary = managerSet.getInt(2);
                Integer workingHours = managerSet.getInt(3);
                String firstName = managerSet.getString(4);
                String lastName= managerSet.getString(5);
                String email= managerSet.getString(6);
                String phoneNumber= managerSet.getString(7);
                String userName= managerSet.getString(8);

                User user = new User(firstName,lastName,email,phoneNumber,userName,managerId, salary, workingHours);
                user.setUserRole("manager");
                passengerStatement.close();
                return Optional.of(user);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return Optional.empty();
    }

}
