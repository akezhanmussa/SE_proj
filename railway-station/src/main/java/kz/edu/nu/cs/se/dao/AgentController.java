
package kz.edu.nu.cs.se.dao;

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
}