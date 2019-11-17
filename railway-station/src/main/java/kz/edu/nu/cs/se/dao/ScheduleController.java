package kz.edu.nu.cs.se.dao;

import kz.edu.nu.cs.se.model.RouteModel;
import kz.edu.nu.cs.se.model.ScheduleModel;
import kz.edu.nu.cs.se.model.TrainModel;

import javax.xml.transform.Result;
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
                ResultSet routeSet = routeStatement.executeQuery(String.format("SELECT * FROM Route WHERE schedule_id=%d", scheduleId));
                ScheduleModel scheduleModel = new ScheduleModel(scheduleId);
                Integer trainId = -1;
                while (routeSet.next()) {
                    trainId = routeSet.getInt(8);
                    Integer routeId = routeSet.getInt(1);
                    Integer startStationId = routeSet.getInt(5);
                    Integer endStationId = routeSet.getInt(6);
                    String startDateString = routeSet.getString(2);
                    String endDateString = routeSet.getString(3);

                    Optional<String> optionalStartName = stationController.getName(startStationId);
                    Optional<String> optionalEndName = stationController.getName(endStationId);

                    if (!optionalStartName.isPresent() || !optionalEndName.isPresent()) {
                        System.out.println("[ERROR] Failed to fetch start station name or end station name.");
                        return scheduleModels;
                    }

                    String startName = optionalStartName.get();
                    String endName = optionalEndName.get();

                    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

                    LocalDateTime startDateTime = LocalDateTime.parse(startDateString, formatter);
                    LocalDateTime endDateTIme = LocalDateTime.parse(endDateString, formatter);

                    RouteModel route = new RouteModel(startName, endName, startDateTime, endDateTIme);

                    if (startStationId.equals(origin)) {
                        scheduleModel.setOrigin(startName);
                        scheduleModel.setStartTimeObject(startDateTime);
                    }
                    if (endStationId.equals(destination)) {
                        scheduleModel.setDestination(endName);
                        scheduleModel.setEndTimeObject(endDateTIme);
                    }
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

    private static void setOriginDestinationTrain(ScheduleModel scheduleModel, ArrayList<RouteModel> routeModels) {
        if (routeModels.size() > 0) {
            scheduleModel.setStartTimeObject(routeModels.get(0).getStartDateObject());
            scheduleModel.setOrigin(routeModels.get(0).getOrigin());

            scheduleModel.setEndTimeObject(routeModels.get(routeModels.size() - 1).getEndDateObject());
            scheduleModel.setDestination(routeModels.get(routeModels.size() - 1).getDestination());

            Integer trainID = routeModels.get(0).getTrainId();
            scheduleModel.setTrainModel(new TrainModel(trainID, TrainController.getCapacity(trainID)));
        }
    }

    public static ArrayList<ScheduleModel> fetchAllSchedules() {
        ArrayList<ScheduleModel> scheduleModels = new ArrayList<>();

        try {
            Statement statement = Connector.getStatement();

            ResultSet schedules = statement.executeQuery(
                    "SELECT schedule_id FROM Route WHERE start_time > NOW() GROUP BY schedule_id;");

            while (schedules.next()) {
                Integer scheduleID = schedules.getInt(1);

                ArrayList<RouteModel> routeModels = RouteController.getRoutesFromSchedule(scheduleID);

                ScheduleModel scheduleModel = new ScheduleModel(scheduleID);

                setOriginDestinationTrain(scheduleModel, routeModels);

                scheduleModel.setRoutes(routeModels);
                scheduleModels.add(scheduleModel);

            }

        } catch (SQLException exception) {
            System.out.println(exception.getMessage());
        }

        System.out.println(scheduleModels.size());

        return scheduleModels;
    }
}
