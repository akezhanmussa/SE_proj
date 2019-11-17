package kz.edu.nu.cs.se.dao;

import kz.edu.nu.cs.se.model.TicketModel;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Optional;

public class AgentController {
    public static ArrayList<TicketModel> getAgentTickets(Integer agentID) {
        ArrayList<TicketModel> result = new ArrayList<TicketModel>();
        try {
            Statement statement = Connector.getStatement();

            ResultSet stationIDResultSet = statement.executeQuery(String.format(
                    "SELECT station_id FROM Agent WHERE idAgent=%d", agentID));

            Integer stationID = stationIDResultSet.getInt(10);

            result = TicketController.getUnapprovedTickets(stationID);
        } catch (SQLException exception) {
            System.out.println(exception.getMessage());
        }
        return result;
    }

    public static Integer getAgentStationID(Integer agent_id) {
        Integer result = -1;
        try {
            Statement statement = Connector.getStatement();

            ResultSet stationResultSet = statement.executeQuery(String.format(
                    "SELECT station_id FROM Agent WHERE idAgent=%d", agent_id));

            result = stationResultSet.getInt(1);
        } catch (SQLException exception) {
            System.out.println(exception.getMessage());
        }
        return result;
    }

    public static Optional<Integer> getAgentStationIDByUsername(String agentUsername) {
        try {
            Statement statement = Connector.getStatement();

            ResultSet stationSet = statement.executeQuery(String.format(
                    "SELECT station_id FROM Agent WHERE username=\"%s\"", agentUsername));

            while (stationSet.next()) {
                System.out.println("[INFO] Successfully fetched station_id " + stationSet.getInt(1));
                return Optional.of(stationSet.getInt(1));
            }

        } catch (SQLException exception) {
            System.out.println(exception.getMessage());
        }
        return Optional.empty();
    }

    public static Optional<Integer> getDummyUserID(String agentEmail) {
        try {
            Statement statement = Connector.getStatement();

            ResultSet dummyUser = statement.executeQuery(String.format(
                    "SELECT idPassenger FROM Passenger WHERE email=%s", agentEmail));

            if (dummyUser.next()) {
                Integer dummyID = dummyUser.getInt(1);
                return Optional.of(dummyID);
            }

        } catch (SQLException exception) {
            System.out.println(exception.getMessage());
        }
        return Optional.empty();
    }

    public static Optional<Integer> getAgentIDByUsername(String username) {
        try {
            Statement statement = Connector.getStatement();

            ResultSet agentIDSet = statement.executeQuery(String.format(
                    "SELECT idAgent FROM Agent WHERE username=\"%s\"", username));

            while (agentIDSet.next()) {
                System.out.println("[INFO] Successfully fetched AgentID " + agentIDSet.getInt(1));
                return Optional.of(agentIDSet.getInt(1));
            }

        } catch (SQLException exception) {
            System.out.println(exception.getMessage());
        }
        return Optional.empty();
    }
}
