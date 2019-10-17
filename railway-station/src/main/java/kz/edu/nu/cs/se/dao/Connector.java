package kz.edu.nu.cs.se.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

public class Connector {
    private static Connection connection = null;

    public static Statement getStatement() {
        Statement statement = null;
        try {
            if (connection != null)  return connection.createStatement();

            Class.forName("com.mysql.jdbc.Driver");
            connection = DriverManager.getConnection(
                    "jdbc:mysql://remotemysql.com:3306/eDiwTC3jTl",
                    "eDiwTC3jTl", "SgCzizCkgZ");
            statement = connection.createStatement();

        } catch(SQLException ex) {
            ex.printStackTrace();
        } catch(ClassNotFoundException e) {
            e.printStackTrace();
        }
        return statement;
    }
}
