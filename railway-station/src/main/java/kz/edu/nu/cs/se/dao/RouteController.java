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

}