package kz.edu.nu.cs.se.dao;

import kz.edu.nu.cs.se.model.RouteModel;
import kz.edu.nu.cs.se.model.ScheduleModel;
import kz.edu.nu.cs.se.model.TrainModel;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

public class ScheduleController {

    public static ArrayList<ScheduleModel> fetchSchedule(Integer origin, Integer destination, LocalDateTime startdate, String daytime) {

        Statement routeStatement = Connector.getStatement();

        ArrayList<ScheduleModel> scheduleModels = new ArrayList<>();

        try {
            Set<Integer> originScheduleId = RouteController.getScheduleIDs(origin, destination, startdate, daytime);

            StationController stationController = new StationController();
            for (Integer scheduleId : originScheduleId) {
                ResultSet routeSet = routeStatement.executeQuery(String.format("SELECT * FROM Route WHERE Schedule_idRoutes=%d", scheduleId));
                ScheduleModel scheduleModel = new ScheduleModel(scheduleId);
                Integer trainId = -1;
                while(routeSet.next()) {
                    trainId = routeSet.getInt(8);
                    Integer startStationId = routeSet.getInt(5);
                    Integer endStationId = routeSet.getInt(6);
                    String startDateString = routeSet.getString(2);
                    String endDateString = routeSet.getString(3);

                    String startName = stationController.getName(startStationId).get();
                    String endName = stationController.getName(endStationId).get();

                    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

                    LocalDateTime startDateTime = LocalDateTime.parse(startDateString, formatter);
                    LocalDateTime endDateTIme = LocalDateTime.parse(endDateString, formatter);

                    RouteModel route = new RouteModel(startName, endName, startDateTime, endDateTIme);
                    scheduleModel.AddRoute(route);
                }

                scheduleModel.setTrainModel(new TrainModel(trainId, TrainController.getCapacity(trainId)));
                scheduleModel.sortRoutes();
                scheduleModels.add(scheduleModel);
            }
            routeStatement.close();

        } catch(SQLException ex) {
            ex.printStackTrace();
        }
        scheduleModels.sort(new Comparator<ScheduleModel>() {
            @Override
            public int compare(ScheduleModel o1, ScheduleModel o2) {
                return o1.getStartTimeObject().compareTo(o2.getStartTimeObject());
            }
        });
        return scheduleModels;
    }
}
