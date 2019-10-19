package kz.edu.nu.cs.se.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

public class StationController {
    Map<Integer, String> idToName;
    Map<String, Integer> nameToId;

    public StationController() {
        Statement statement = Connector.getStatement();
        try {
            ResultSet stations = statement.executeQuery("SELECT * FROM Station");

            idToName = new HashMap<>();
            nameToId = new HashMap<>();

            while(stations.next()) {
                Integer id = stations.getInt(1);
                String name = stations.getString(2);
                idToName.put(id, name);
                nameToId.put(name, id);
            }
            statement.close();
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }

    }

    public Optional<String> getName(Integer id) {
        if (idToName.containsKey(id)) return Optional.of(idToName.get(id));
        return Optional.empty();
    }
}
