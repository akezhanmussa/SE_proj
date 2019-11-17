package kz.edu.nu.cs.se.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class ManagerController {

    public static Integer getManagerStationID(String managerUserName) {
        Integer result = -1;
        try {
            Statement statement = Connector.getStatement();

            ResultSet stationResultSet = statement.executeQuery(String.format(
                    "SELECT * FROM Manager WHERE username='%s'", managerUserName));
            while(stationResultSet.next()){
                result = stationResultSet.getInt(1);
                break;
            }
            System.out.println("Here: " + result);
        } catch (SQLException exception) {
            System.out.println(exception.getMessage());
        }
        return result;
    }

}
