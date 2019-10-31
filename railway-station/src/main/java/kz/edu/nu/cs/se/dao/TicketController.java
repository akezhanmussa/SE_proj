package kz.edu.nu.cs.se.dao;

import java.sql.SQLException;
import java.sql.Statement;
import java.time.LocalDateTime;
import java.util.ArrayList;

public class TicketController {
    public static boolean BuyTicket(Integer scheduleId, Integer passengerId, Integer origin_id,
                                 Integer destination_id, Float price, String start_date,
                                 String end_date, String owner_document_type,
                                 Integer owner_document_id,
                                 String owner_first_name, String owner_last_name) {
        Statement statement = Connector.getStatement();

        try {
            // Creates ticket on database
            boolean status = statement.execute(String.format("INSERT INTO Ticket(" +
                            "Passenger_idPassenger, start_date, end_date, origin_id, " +
                            "destination_id, status, owner_document_type," +
                            "owner_first_name, owner_last_name, owner_document_id, " +
                            "price, schedule_id)" +
                            "VALUE(%d, \"%s\", \"%s\", %d, %d, \"%s\", \"%s\", \"%s\", \"%s\", %d, %d, %d)",
                    passengerId, start_date, end_date,
                    origin_id, destination_id, "UNAPPROVED", owner_document_type,
                    owner_first_name, owner_last_name, owner_document_id,
                    price.intValue(), scheduleId));
            System.out.println("SQL INSERT Status: " + status);
            // Increase capacity for all routes in the given range
            ArrayList<Integer> rangeIDs = RouteController.getRangeIDs(scheduleId, origin_id, destination_id);
            for (Integer id : rangeIDs) {
                RouteController.updatePassengerNumber(id);
            }
            return true;
        } catch (SQLException exception) {
            System.out.println(exception.getMessage());
            return false;
        }

    }
}
