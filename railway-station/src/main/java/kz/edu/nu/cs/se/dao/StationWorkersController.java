package kz.edu.nu.cs.se.dao;

import kz.edu.nu.cs.se.model.StationWorker;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

public class StationWorkersController {

    public static ArrayList<StationWorker> getStationWorkers(int station_id){
        Statement stationWorkerStatement = Connector.getStatement();
        ArrayList<StationWorker> stationWorkers = new ArrayList<>();

        try {
            ResultSet stationWorkerSet = stationWorkerStatement.executeQuery(String.format("SELECT * FROM StationWorker where station_id = %d", station_id));
            while(stationWorkerSet.next()){
                int stationWorkerId = stationWorkerSet.getInt(1);
                String firstName = stationWorkerSet.getString(2);
                String lastName = stationWorkerSet.getString(3);
                int salary = stationWorkerSet.getInt(4);
                int workingHours = stationWorkerSet.getInt(5);
                int stationId = stationWorkerSet.getInt(6);

                StationWorker sw = new StationWorker(stationWorkerId,firstName,
                        lastName,salary,workingHours,stationId);
                stationWorkers.add(sw);
            }
            stationWorkerSet.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return stationWorkers;

    }

    public static void updateStationWorkerSalary(int stationWorkerId, Float salary) {

        Statement passengerStatement = Connector.getStatement();

        String queryInsert = String.format("Update StationWorker Set salary = %f where idStationWorker = %d",
                salary, stationWorkerId);
        try {
            passengerStatement.executeUpdate(queryInsert);
            passengerStatement.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }

    }

    public static void updateStationWorkerWorkingHours(int stationWorkerId, int workingHours) {

        Statement passengerStatement = Connector.getStatement();

        String queryInsert = String.format("Update StationWorker Set working_hours = %d where idStationWorker = %d",
                workingHours, stationWorkerId);
        try {
            passengerStatement.executeUpdate(queryInsert);
            passengerStatement.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }



    }
}
