package kz.edu.nu.cs.se.dao;

import kz.edu.nu.cs.se.model.RouteModel;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

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
                            "SELECT idRoute, start_station_id, end_station_id FROM Route WHERE schedule_id=%d ORDER BY start_time",
                            schedule_id)
            );
            ArrayList<Integer> routeIDs = new ArrayList<>();
            ArrayList<Integer> start_station_ids = new ArrayList<>();
            ArrayList<Integer> end_station_ids = new ArrayList<>();
            while(routeIDSet.next()) {
                routeIDs.add(routeIDSet.getInt(1));
                start_station_ids.add(routeIDSet.getInt(2));
                end_station_ids.add(routeIDSet.getInt(3));
            }
            System.out.println("allIDs empty: " + routeIDs.isEmpty());
            routeIDs.forEach(System.out::println);
            int index = 0;
            while (index < routeIDs.size() && !start_station_ids.get(index).equals(origin_id)) index++;
            //  if (index < routeIDs.size()) rangeIDs.add(routeIDs.get(index));
            while (index < routeIDs.size() && !end_station_ids.get(index).equals(destination_id)) {
                rangeIDs.add(routeIDs.get(index));
                index++;
            }
            if (index < routeIDs.size()) rangeIDs.add(routeIDs.get(index));

            statement.close();
            routeIDSet.close();
        } catch (SQLException exception) {
            System.out.println(exception.getMessage());
        }
        System.out.println("rangeIDs empty: " + rangeIDs.isEmpty());

        return rangeIDs;
    }

    public static void updatePassengerNumber(Integer routeId) {
        try {
            Statement statement = Connector.getStatement();
            statement.execute(String.format(
                    "UPDATE Route SET passenger_number = passenger_number + 1 WHERE idRoute = %d",
                    routeId)
            );
            statement.close();
        } catch (SQLException exception) {
            System.out.println(exception.getMessage());
        }
    }

    public static ArrayList<RouteModel> getRoutesFromSchedule(Integer scheduleID) {
        ArrayList<RouteModel> routeModels = new ArrayList<>();

        try {
            Statement statement = Connector.getStatement();
            ResultSet routes = statement.executeQuery(
                    String.format("SELECT start_station_id, end_station_id, start_time, end_time, price, Train_idTrain, idRoute FROM Route WHERE schedule_id=%d ORDER BY start_time ASC",
                            scheduleID));
            while (routes.next()) {
                Integer originID = routes.getInt(1);
                Integer destinationID = routes.getInt(2);
                String startTimeString = routes.getString(3);
                String endTimeString = routes.getString(4);
                Integer price = ((int) routes.getFloat(5));
                Integer trainId = routes.getInt(6);
                Integer routeId = routes.getInt(7);

                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
                LocalDateTime startTime = LocalDateTime.parse(startTimeString, formatter);
                LocalDateTime endTime = LocalDateTime.parse(endTimeString, formatter);

                StationController stationController = new StationController();

                Optional<String> optionalStartName = stationController.getName(originID);
                Optional<String> optionalDestinationName = stationController.getName(destinationID);

                if (!optionalDestinationName.isPresent() || !optionalStartName.isPresent()) {
                    System.out.println("[ERROR] Failed to fetch station name");
                    return routeModels;
                }

                String startName = optionalStartName.get();
                String destinationName = optionalDestinationName.get();

                RouteModel routeModel = new RouteModel(startName, destinationName, startTime, endTime, routeId);
                routeModel.setPrice(price);
                routeModel.setTrainId(trainId);

                routeModels.add(routeModel);
            }

        } catch (SQLException exception) {
            System.out.println(exception.getMessage());
        }

        return routeModels;
    }

    private static Boolean isValidRouteUpdate(Integer scheduleId, Integer routeId, LocalDateTime startTime, LocalDateTime endTime) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        try {
            Statement statement = Connector.getStatement();
            ResultSet routePrev = statement.executeQuery(String.format("SELECT start_time, end_time FROM Route WHERE idRoute=%d", routeId-1));
            while(routePrev.next()) {
                System.out.println("I FOUND THIS SUB-ROUT");
                String endTimePrevString = routePrev.getString(2);
                LocalDateTime endTimePrev = LocalDateTime.parse(endTimePrevString, formatter);

                System.out.println(endTimePrev);
                System.out.println(endTimePrevString);

                if(startTime.isBefore(endTimePrev)) return false;
            }

            System.out.println("I AM BEFORE THE NEXT");
            ResultSet routeNext = statement.executeQuery(String.format("SELECT start_time, end_time FROM Route WHERE schedule_id=%d ", scheduleId));
            while(routeNext.next()) {
                String startTimeNextString = routeNext.getString(1);
                LocalDateTime startTimeNext = LocalDateTime.parse(startTimeNextString, formatter);
                System.out.println(startTimeNext);
                if(endTime.isAfter(startTimeNext)) {
                    System.out.println("AFTER TIME THE LAST ROUD");
                    return false;
                }
            }

            return true;
        } catch (SQLException ex) {
            System.out.println(ex.getMessage());
            return false;
        }
    }

    public static Optional<RouteModel> getRouteFromId(Integer routeId) {
        try {
            Statement statement = Connector.getStatement();
            ResultSet route = statement.executeQuery(String.format("SELECT start_time, end_time FROM Route WHERE idRoute=%d limit 1", routeId));
            while (route.next()) {
                String startTimeString = route.getString(1);
                String endTimeString = route.getString(2);

                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
                LocalDateTime startTime = LocalDateTime.parse(startTimeString, formatter);
                LocalDateTime endTime = LocalDateTime.parse(endTimeString, formatter);

                RouteModel routeModel = new RouteModel(startTime, endTime);
                return Optional.of(routeModel);
            }

        } catch (SQLException exception) {
            System.out.println(exception.getMessage());
        }
        return Optional.empty();
    }

    public static Boolean updateRoute(Integer routeId, LocalDateTime startTime, LocalDateTime endTime) {

        try {
            Statement statement = Connector.getStatement();

            System.out.println("BEFORE VALIDATION");

//            if(isValidRouteUpdate(routeId, startTime, endTime)) {

                System.out.println("HERE IN IS VALID");
                String sqlStart = "UPDATE Route SET start_time=? WHERE idRoute=?";
                PreparedStatement preparedStatementStart = Connector.prepareStatement(sqlStart);
                preparedStatementStart.setTimestamp(1, java.sql.Timestamp.valueOf(startTime));
                preparedStatementStart.setInt(2, routeId);
                int startTimeRow = preparedStatementStart.executeUpdate();

                System.out.println("HERE HERE1");

                String sqlEnd = "UPDATE Route SET end_time=? WHERE idRoute=?";
                PreparedStatement preparedStatementEnd = Connector.prepareStatement(sqlEnd);
                preparedStatementEnd.setTimestamp(1, java.sql.Timestamp.valueOf(endTime));
                preparedStatementEnd.setInt(2, routeId);

                int endTimeRow = preparedStatementEnd.executeUpdate();
                System.out.println("HERE HERE2");

                statement.close();
                if (!(endTimeRow == 1 && startTimeRow == 1)) {
                    System.out.println(String.format(
                            "[ERROR] Failed to change route_id to agent (id=%d)", routeId));
                    return false;
                }
//            }
        } catch (SQLException exception) {
            System.out.println(exception.getMessage());
            return false;
        }
        return true;
    }

    public static Boolean deleteRoutesByScheduleId(Integer scheduleId) {
        try {
            Statement statement = Connector.getStatement();
            int deleteRoute = statement.executeUpdate(String.format("DELETE FROM Route where schedule_id=%d", scheduleId));

            statement.close();
            if (deleteRoute <= 0) {
                System.out.println(String.format("[ERROR] Failed to delete route with schedule_id %d", scheduleId));
                return false;
            }

        } catch (SQLException ex) {
            System.out.println(ex.getMessage());
            return false;
        }

        return true;
    }

//    public static Boolean createRoutes(Integer scheduleId, List<>)

    public static void main(String[] args) {


    }

}