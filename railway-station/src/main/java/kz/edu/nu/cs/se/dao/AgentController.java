package kz.edu.nu.cs.se.dao;

import kz.edu.nu.cs.se.model.AgentModel;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Optional;

public class AgentController {

    public static Optional<Integer> getAgentStationID(Integer agent_id) {
        try {
            Statement statement = Connector.getStatement();

            ResultSet stationResultSet = statement.executeQuery(String.format(
                    "SELECT station_id FROM Agent WHERE idAgent=%d", agent_id));

            while (stationResultSet.next()) {
                return Optional.of(stationResultSet.getInt(1));
            }
        } catch (SQLException exception) {
            System.out.println(exception.getMessage());
        }
        return Optional.empty();
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

    public static ArrayList<AgentModel> getAgents(int stationId){

        Statement agentStatement = Connector.getStatement();
        ArrayList<AgentModel> agentModels = new ArrayList<>();

        try {
            ResultSet agentsSet = agentStatement.executeQuery(String.format("SELECT * FROM Agent where station_id = '%d'", stationId));
            while(agentsSet.next()){
                int agentId = agentsSet.getInt(1);
                String firstName = agentsSet.getString(4);
                String lastName = agentsSet.getString(5);
                int salary = agentsSet.getInt(2);
                int workingHours = agentsSet.getInt(3);
                int station_id = agentsSet.getInt(10);

                AgentModel agentModel = new AgentModel(agentId,firstName,
                        lastName,salary,workingHours,stationId);
                agentModels.add(agentModel);
            }
            agentsSet.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return agentModels;

    }

    public static void updateAgentSalary(int agentId, float salary) {

        Statement passengerStatement = Connector.getStatement();

        String queryInsert = String.format("Update Agent Set salary = %f where idAgent = %d",
                salary, agentId);
        try {
            passengerStatement.executeUpdate(queryInsert);
            passengerStatement.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }

    }

    public static Optional<String> getEmailByUsername(String username) {
        try {
            Statement statement = Connector.getStatement();
            ResultSet emailSet = statement.executeQuery(
                    String.format("SELECT email FROM Agent WHERE username=\"%s\"", username));

            if (emailSet.next()) return Optional.of(emailSet.getString(1));

        } catch (SQLException exception) {
            System.out.println(exception.getMessage());
        }
        return Optional.empty();
    }

    public static void updateAgentWorkingHours(int agentId, int workingHours) {

        Statement passengerStatement = Connector.getStatement();

        String queryInsert = String.format("Update Agent Set working_hours = %d where idAgent = %d",
                workingHours, agentId);
        try {
            passengerStatement.executeUpdate(queryInsert);
            passengerStatement.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }

    }
}
