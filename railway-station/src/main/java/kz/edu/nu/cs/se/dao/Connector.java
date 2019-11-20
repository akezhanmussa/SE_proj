package kz.edu.nu.cs.se.dao;

import java.sql.*;

public class Connector {
    private static Connection connection = null;

    public static Statement getStatement() {
        Statement statement = null;
        try {
            if (connection != null)  return connection.createStatement();

            Class.forName("com.mysql.jdbc.Driver");
            connection = DriverManager.getConnection(
                    "jdbc:mysql://remotemysql.com:3306/E0Sz4Fo1Xp",
                    "E0Sz4Fo1Xp", "KIbCO7HKYR");
            statement = connection.createStatement();

        } catch(SQLException | ClassNotFoundException ex) {
            ex.printStackTrace();
        }
        return statement;
    }
    public static PreparedStatement prepareStatement(String sql) {
        PreparedStatement statement = null;
        try {
            if (connection != null)  return connection.prepareStatement(sql);

            Class.forName("com.mysql.jdbc.Driver");
            connection = DriverManager.getConnection(
                    "jdbc:mysql://remotemysql.com:3306/E0Sz4Fo1Xp",
                    "E0Sz4Fo1Xp", "KIbCO7HKYR");
            statement = connection.prepareStatement(sql);

        } catch(SQLException | ClassNotFoundException ex) {
            ex.printStackTrace();
        }
        return statement;
    }

    public static PreparedStatement prepareStatement(String sql, String[] generatedKeys) {
        PreparedStatement statement = null;
        try {
            if (connection != null)  return connection.prepareStatement(sql);

            Class.forName("com.mysql.jdbc.Driver");
            connection = DriverManager.getConnection(
                    "jdbc:mysql://remotemysql.com:3306/E0Sz4Fo1Xp",
                    "E0Sz4Fo1Xp", "KIbCO7HKYR");
            statement = connection.prepareStatement(sql, generatedKeys);

        } catch(SQLException | ClassNotFoundException ex) {
            ex.printStackTrace();
        }
        return statement;
    }
}
