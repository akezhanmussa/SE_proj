package kz.edu.nu.cs.se.dao;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.sql.*;

public class RouteController {

    private static Boolean isValidRouteByDateTime(LocalDateTime current, LocalDateTime time, String daytime) {

        DateTimeFormatter formatter  = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        if (current.format(formatter).equals(time.format(formatter))) {
            switch (daytime) {
                case "night":
                    return current.getHour() > 0 && current.getHour() <= 6;
                case "morning":
                    return current.getHour() > 6 && current.getHour() <= 12;
                case "afternoon":
                    return current.getHour() > 12 && current.getHour() <= 18;
                case "evening":
                    return current.getHour() > 18;
            }
        }

        return false;

    }

    public static Set<Integer> getScheduleIDs(Integer origin, Integer destination, LocalDateTime startdate, String daytime) {

        Set<Integer> scheduleIDs = new HashSet<>();

        try {
            Statement originStatement = Connector.getStatement();
            Statement destinationStatement = Connector.getStatement();

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

            scheduleIDs.addAll(originScheduleId);

            originStatement.close();
            destinationStatement.close();

            originRouteSet.close();
            destinationRouteSet.close();

        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }

        return scheduleIDs;
    }

    public static ArrayList<Integer> getRangeIDs(Integer schedule_id, Integer origin_id, Integer destination_id) {
        ArrayList<Integer> rangeIDs = new ArrayList<>();
        try {
            Statement statement = Connector.getStatement();
            ResultSet routeIDSet = statement.executeQuery(
                    String.format(
                            "SELECT idRoute FROM Route WHERE Schedule_idRoutes=%d ORDER BY start_time",
                            schedule_id)
            );
            ArrayList<Integer> allIDs = new ArrayList<>();
            while(routeIDSet.next()) {
                allIDs.add(routeIDSet.getInt(1));
            }
            int index = 0;
            while (index < allIDs.size() && !allIDs.get(index).equals(origin_id)) index++;
            while (index < allIDs.size() && !allIDs.get(index).equals(destination_id)) {
                rangeIDs.add(allIDs.get(index));
                index++;
            }
            if (index < allIDs.size()) rangeIDs.add(allIDs.get(index));

            statement.close();
            routeIDSet.close();
        } catch (SQLException exception) {
            System.out.println(exception.getMessage());
        }

        return rangeIDs;
    }

    public static void updatePassengerNumber(Integer routeId) {
        try {
            Statement statement = Connector.getStatement();
            statement.executeQuery(String.format(
                    "UPDATE Route SET passenger_number = passenger_number + 1 WHERE idRoute = %d",
                    routeId)
            );
            statement.close();
        } catch (SQLException exception) {
            System.out.println(exception.getMessage());
        }
    }

}