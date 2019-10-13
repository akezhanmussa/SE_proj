package kz.edu.nu.cs.se.dao;

import java.sql.*;

import kz.edu.nu.cs.se.model.Route;

public class Routes {

    public Routes() {}

    public static Route getRoute() {

        Route route = new Route();
        try {

            Class.forName("com.mysql.jdbc.Driver");
            Connection conn = DriverManager.getConnection(
                    "jdbc:mysql://remotemysql.com:3306/eDiwTC3jTl",
                    "eDiwTC3jTl", "SgCzizCkgZ");
            Statement stmt = conn.createStatement();

            ResultSet resultSet = stmt.executeQuery("SELECT * FROM Route");
            while (resultSet.next()){
                Date startDate = resultSet.getDate(2);
                Date endDate = resultSet.getDate(3);
                String origin = "origin";
                String destination = "destination";
                route = new Route(origin, destination, startDate, endDate);
                System.out.println(route.getOrigin());
                System.out.println(route.getDestination());
                System.out.println(route.getStartDate());
                System.out.println(route.getEndDate());
            }
        } catch(SQLException ex) {
            ex.printStackTrace();
        } catch(ClassNotFoundException e) {
            e.printStackTrace();
        }
        return route;
    }

    public static void main(String[] args) {
        getRoute();
    }

}





