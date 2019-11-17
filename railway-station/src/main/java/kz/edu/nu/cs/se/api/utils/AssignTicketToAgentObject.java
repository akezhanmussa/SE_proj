package kz.edu.nu.cs.se.api.utils;

public class AssignTicketToAgentObject {
    private String token;
    private Integer ticketID;

    public String getToken() {
        return token;
    }

    public Integer getTicketID() {
        return ticketID;
    }

    public void setTicketID(Integer ticketID) {
        this.ticketID = ticketID;
    }
}
