package kz.edu.nu.cs.se.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

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


    public static List<Integer> getTrainsFree() {
        List<Integer> trains = new ArrayList<>();
        try {
            Statement statement = Connector.getStatement();
            ResultSet trainSet = statement.executeQuery("SELECT train_id FROM Train WHERE train_id NOT IN (SELECT Train_idTrain from Route)");
            while(trainSet.next()) {
                int train = trainSet.getInt(1);
                trains.add(train);
            }

            statement.close();
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }

        return trains;
    }

}
