package kz.edu.nu.cs.se.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class TrainController {

    public static Integer getCapacity(Integer id) {
        Integer capacity = -1;
        try {
            Statement statement = Connector.getStatement();
            ResultSet trainSet = statement.executeQuery("SELECT capacity FROM Train WHERE idTrain=" +  id);
            while(trainSet.next()) {
                capacity = trainSet.getInt(1);
            }

            statement.close();
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }

        return capacity;
    }



}
