package kz.edu.nu.cs.se.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class CreateAgentController {

    public static Integer getManagerStationError(Integer managerUsername) {
        Statement statement = Connector.getStatement();
        Integer stationId = -1;
        try {
            ResultSet passengerAgentSet = statement.executeQuery(String.format("SELECT station_id FROM Manager where username = '%s' limit 1", managerUsername));
            while(passengerAgentSet.next()){
                stationId = passengerAgentSet.getInt(1);
            }
            statement.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return stationId;
    }

    public static Boolean isValidAgentEmail(String email) {
        Statement statement = Connector.getStatement();
        try {
            ResultSet passengerAgentSet = statement.executeQuery(String.format("SELECT email FROM Passenger where email = '%s' UNION SELECT email from Agent where email = '%s'", email, email));
            while(passengerAgentSet.next()){
                return false;
            }
            statement.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return true;
    }

    public static Boolean createAgent(Float salary,
                                   Integer workHours,
                                   String firstName,
                                   String lastName,
                                   String email,
                                   String phoneNumber,
                                   String username,
                                   String password,
                                   Integer stationId) {

        Statement statement = Connector.getStatement();
        try {
            boolean statusAgent = statement.execute(String.format("INSERT INTO Agent(salary, working_hours, firstname, lastname, email, phone_number, username, password, station_id" +
                            "VALUE('%s','%s','%s','%s','%s','%s','%s','%s','%s')",
                    salary, workHours, firstName, lastName, email, phoneNumber, username, password, stationId));

            boolean statusPassenger = statement.execute(String.format("INSERT INTO Passenger(firstname, lastname, email, phone_number, username, password" +
                            "VALUE('%s','%s','%s','%s','%s','%s')", firstName, lastName, email, phoneNumber, username, password));
            statement.close();
            return statusAgent && statusPassenger;
        } catch (SQLException exception) {
            System.out.println(exception.getMessage());
            return false;
        }
    }
}
