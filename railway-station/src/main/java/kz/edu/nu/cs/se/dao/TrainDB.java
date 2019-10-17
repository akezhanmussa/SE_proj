package kz.edu.nu.cs.se.dao;

import kz.edu.nu.cs.se.model.Schedule;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class TrainDB {

    public static Integer getCapacity(Integer id) {
        Integer capacity = 0;
        try {
            Statement statement = Connector.getStatement();
            ResultSet trainSet = statement.executeQuery("SELECT capacity FROM Train WHERE idTrain=" +  id);
            capacity = trainSet.getInt(3);

            statement.close();
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }

        return capacity;
    }
}
