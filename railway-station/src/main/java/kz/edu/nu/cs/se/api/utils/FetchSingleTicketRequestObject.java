package kz.edu.nu.cs.se.api.utils;

public class FetchSingleTicketRequestObject {
    private String userToken;
    private String agentToken;
    private Integer ticketID;

    public String getUserToken() {
        return userToken;
    }

    public String getAgentToken() {
        return agentToken;
    }

    public Integer getTicketID() {
        return ticketID;
    }
}
