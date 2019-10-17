package kz.edu.nu.cs.se.dao;

import kz.edu.nu.cs.se.model.Route;
import kz.edu.nu.cs.se.model.Schedule;
import kz.edu.nu.cs.se.model.Train;

import javax.swing.plaf.nimbus.State;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

public class ScheduleDB {

    private static Boolean isValidRouteByDateTime(LocalDateTime current, LocalDateTime time, String daytime) {
        return true;
//        if (current.compareTo(time) < 0) return false;
//
//        if (daytime == "night") {
//            if (current.getHour() > 0 && current.getHour() <= 6) return true;
//        } else if (daytime == "morning") {
//            if (current.getHour() > 6 && current.getHour() <= 12) return true;
//        } else if (daytime == "afternoon") {
//            if (current.getHour() > 12 && current.getHour() <= 18) return true;
//        } else if (daytime == "evening") {
//            if (current.getHour() > 18) return true;
//        }
//
//        return false;
    }

    public static ArrayList<Schedule> fetchSchedule(Integer origin, Integer destination, LocalDateTime startdate, String daytime) {

        Statement originStatement = Connector.getStatement();
        Statement destinationStatement = Connector.getStatement();
        Statement routeStatement = Connector.getStatement();

        ArrayList<Schedule> schedules = new ArrayList<>();

        try {
            ResultSet originRouteSet = originStatement.executeQuery("SELECT * FROM Route WHERE start_station_id=" + origin);
            ResultSet destinationRouteSet = destinationStatement.executeQuery("SELECT * FROM Route WHERE end_station_id=" + destination);

            Set<Integer> originScheduleId = new TreeSet<>();
            Set<Integer> destinationScheduleId = new TreeSet<>();

            while (originRouteSet.next()) {
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
                String currentDateTimeString = originRouteSet.getString(2);
                LocalDateTime currentDateTime = LocalDateTime.parse(currentDateTimeString, formatter);
                if (isValidRouteByDateTime(currentDateTime, startdate, daytime)) {
                    originScheduleId.add(originRouteSet.getInt(7));
                }
            }

            while (destinationRouteSet.next()) {
                destinationScheduleId.add(destinationRouteSet.getInt(7));
            }

            originScheduleId.retainAll(destinationScheduleId);

            StationDB stationDB = new StationDB();
            for (Integer scheduleId : originScheduleId) {
                ResultSet routeSet = routeStatement.executeQuery("SELECT * FROM Route WHERE Schedule_idRoutes=" + scheduleId);
                Schedule schedule = new Schedule(scheduleId);
                Integer trainId = -1;
                while(routeSet.next()) {
                    trainId = routeSet.getInt(8);
                    Integer startStationId = routeSet.getInt(5);
                    Integer endStationId = routeSet.getInt(6);
                    String startDateString = routeSet.getString(2);
                    String endDateString = routeSet.getString(3);

                    String startName = stationDB.getName(startStationId).get();
                    String endName = stationDB.getName(endStationId).get();

                    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

                    LocalDateTime startDateTime = LocalDateTime.parse(startDateString, formatter);
                    LocalDateTime endDateTIme = LocalDateTime.parse(endDateString, formatter);

                    Route route = new Route(startName, endName, startDateTime, endDateTIme);
                    schedule.AddRoute(route);
                }

                Train train = new Train(trainId, TrainDB.getCapacity(trainId));
                schedule.setTrain(train);
                schedule.sortRoutes();
                schedules.add(schedule);
            }
            routeStatement.close();

        } catch(SQLException ex) {
            ex.printStackTrace();
        }
        Collections.sort(schedules, new Comparator<Schedule>() {
            @Override
            public int compare(Schedule o1, Schedule o2) {
                return o1.getStartTime().compareTo(o2.getStartTime());
            }
        });
        return schedules;
    }
}
