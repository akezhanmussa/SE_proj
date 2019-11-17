package kz.edu.nu.cs.se.dao;

import kz.edu.nu.cs.se.model.TicketModel;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Optional;

public class TicketController {
    public static boolean BuyTicket(Integer scheduleId, Integer passengerId, Integer origin_id,
                                    Integer destination_id, Float price, String start_date,
                                    String end_date, String owner_document_type,
                                    Integer owner_document_id,
                                    String owner_first_name, String owner_last_name,
                                    String ticketStatus) {
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
                    origin_id, destination_id, ticketStatus, owner_document_type,
                    owner_first_name, owner_last_name, owner_document_id,
                    price.intValue(),scheduleId));
            statement.close();
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

    private static Optional<TicketModel> getTicketModel(ResultSet ticketSet) {
        try {
            Integer idTicket = ticketSet.getInt(1);
            Integer idPassenger = ticketSet.getInt(2);
            String starDate = ticketSet.getString(3);
            String endDate = ticketSet.getString(4);
            Integer originId = ticketSet.getInt(5);
            Integer destinationId = ticketSet.getInt(6);
            String status = ticketSet.getString(7);
            String owner_document_type = ticketSet.getString(8);
            String owner_first_name = ticketSet.getString(9);
            String owner_last_name = ticketSet.getString(10);
            String owner_document_id = ticketSet.getString(11);
            Integer price = ((int) ticketSet.getFloat(12));
            Integer agentId = ticketSet.getInt(13);
            Integer schedule_id = ticketSet.getInt(14);

            TicketModel ticketModel = new TicketModel(idTicket);

            ticketModel.setIdPassenger(idPassenger);
            ticketModel.setStartDate(starDate);
            ticketModel.setEndDate(endDate);
            ticketModel.setIdOrigin(originId);
            ticketModel.setIdDestination(destinationId);
            ticketModel.setStatus(status);
            ticketModel.setOwnerDocumentId(owner_document_id);
            ticketModel.setOwnerDocumentType(owner_document_type);
            ticketModel.setOwnerFirstName(owner_first_name);
            ticketModel.setOwnerLastName(owner_last_name);
            ticketModel.setPrice(price);
            ticketModel.setAgentId(agentId);
            ticketModel.setScheduleId(schedule_id);

            return Optional.of(ticketModel);
        } catch (SQLException exception) {
            System.out.println(exception.getMessage());
        }
        return Optional.empty();
    }

    public static ArrayList<TicketModel> getTicketsForPassenger(Integer passengerID) {
        ArrayList<TicketModel> result = new ArrayList<>();
        try {
            Statement statement = Connector.getStatement();
            ResultSet ticketSet = statement.executeQuery(
                    String.format("SELECT * FROM Ticket WHERE Passenger_idPassenger=%d", passengerID));
            while (ticketSet.next()) {
                Optional<TicketModel> optionalTicketModel = getTicketModel(ticketSet);
                if (optionalTicketModel.isPresent()) {
                    result.add(optionalTicketModel.get());
                } else {
                    System.out.printf("[FAILED] Failed to fetch ticketModel for passengerID:%d%n", passengerID);
                }
            }
        } catch (SQLException exception) {
            System.out.println(exception.getMessage());
        }
        return result;
    }

    public static ArrayList<TicketModel> getTicketsForAgent(Integer agentID) {
        ArrayList<TicketModel> result = new ArrayList<>();

        try {
            Statement statement = Connector.getStatement();
            ResultSet ticketSet = statement.executeQuery(
                    String.format("SELECT * FROM Ticket WHERE agent_id=%d", agentID));
            while (ticketSet.next()) {
                Optional<TicketModel> optionalTicketModel = getTicketModel(ticketSet);
                if (optionalTicketModel.isPresent()) {
                    result.add(optionalTicketModel.get());
                } else {
                    System.out.printf("[FAILED] Failed to fetch ticketModel with agentID:%d%n", agentID);
                }
            }
        } catch (SQLException exception) {
            System.out.println(exception.getMessage());
        }

        return result;
    }

    public static ArrayList<TicketModel> getUnapprovedTickets(Integer stationID) {
        ArrayList<TicketModel> result = new ArrayList<>();
        try {
            Statement statement = Connector.getStatement();

            ResultSet ticketSet = statement.executeQuery(String.format(
                    "SELECT * FROM Ticket WHERE status=\"UNAPPROVED\" and agent_id is NULL and origin_id=%d", stationID)
            );

            while (ticketSet.next()) {
                Optional<TicketModel> optionalTicketModel = getTicketModel(ticketSet);
                if (optionalTicketModel.isPresent()) {
                    result.add(optionalTicketModel.get());
                } else {
                    System.out.printf("[FAILED] Failed to fetch ticketModel for stationID:%d%n", stationID);
                }
            }
        } catch (SQLException exception) {
            System.out.println(exception.getMessage());
        }
        return result;
    }

    public static Boolean assignTicketToAgent(Integer agentID, Integer ticketID) {
        Boolean result = false;
        try {
            Statement statement = Connector.getStatement();

            statement.execute(String.format(
                    "UPDATE Ticket SET agent_id=%d WHERE idTicket=%d AND agent_id is NULL", agentID, ticketID)
            );

            result = statement.execute(String.format(
                    "SELECT * FROM Ticket WHERE agent_id=%d AND idTicket=%d",agentID, ticketID));

        } catch (SQLException exception) {
            System.out.println(exception.getMessage());
        }
        return result;
    }

    public static Boolean changeStatus(Integer ticketID, String newStatus) {
        Boolean status = false;

        try {
            Statement statement = Connector.getStatement();

            status = statement.execute(String.format("UPDATE Ticket SET status=%s WHERE idTicket=%d",
                    newStatus, ticketID));
            if (!status) {
                System.out.println(String.format(
                        "[ERROR] Failed to update ticket status for ticketID=%d, to new status=%s", ticketID, newStatus
                ));
            }

        } catch (SQLException exception) {
            System.out.println(exception.getMessage());
        }

        return status;
    }

    public static Boolean verifyAssigmentOfAgent(Integer agentID, Integer ticketID) {
        Boolean status = false;

        try {
            Statement statement = Connector.getStatement();

            ResultSet ticketRows = statement.executeQuery(String.format(
                    "SELECT * FROM Ticket WHERE ticketID=%d AND agent_id=%d", ticketID, agentID));

            status = ticketRows.isFirst();

        } catch (SQLException exception) {
            System.out.println(exception.getMessage());
        }

        return status;
    }
}