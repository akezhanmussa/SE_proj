package kz.edu.nu.cs.se.dao;

import kz.edu.nu.cs.se.model.Agent;
import kz.edu.nu.cs.se.model.TicketModel;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

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

    public static ArrayList<Agent> getAgents(int stationId){

        Statement agentStatement = Connector.getStatement();
        ArrayList<Agent> agents = new ArrayList<>();

        try {
            ResultSet agentsSet = agentStatement.executeQuery(String.format("SELECT * FROM Agent where station_id = '%d'", stationId));
            while(agentsSet.next()){
                int agentId = agentsSet.getInt(1);
                String firstName = agentsSet.getString(4);
                String lastName = agentsSet.getString(5);
                int salary = agentsSet.getInt(2);
                int workingHours = agentsSet.getInt(3);
                int station_id = agentsSet.getInt(10);

                Agent agent = new Agent(agentId,firstName,
                        lastName,salary,workingHours,stationId);
                agents.add(agent);
            }
            agentsSet.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return agents;

    }

    public static void updateAgentSalary(int agentId, int salary) {

        Statement passengerStatement = Connector.getStatement();

        String queryInsert = String.format("Update Agent Set salary = %d where idAgent = %d",
                salary, agentId);
        try {
            passengerStatement.executeUpdate(queryInsert);
            passengerStatement.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }

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
