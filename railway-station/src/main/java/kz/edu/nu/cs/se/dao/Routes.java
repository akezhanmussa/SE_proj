package kz.edu.nu.cs.se.dao;

import java.sql.*;

public class Routes {

    public static void main(String[] args) {
        try {

            Class.forName("com.mysql.jdbc.Driver");
            Connection conn = DriverManager.getConnection(
                    "jdbc:mysql://remotemysql.com:3306/eDiwTC3jTl",
                    "eDiwTC3jTl", "SgCzizCkgZ");
            Statement stmt = conn.createStatement();


            ResultSet resultSet = stmt.executeQuery("SELECT * FROM Station");
            while (resultSet.next()){
                System.out.println(resultSet.getString(2));
            }
            resultSet.close();
            stmt.close();
            conn.close();

        } catch(SQLException ex) {
            ex.printStackTrace();
        } catch(ClassNotFoundException e) {
            e.printStackTrace();

        }
    }
}




