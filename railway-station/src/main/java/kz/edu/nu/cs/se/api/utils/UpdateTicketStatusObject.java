package kz.edu.nu.cs.se.api.utils;

public class UpdateTicketStatusObject {
    private String token;
    private Integer ticketID;
    private Boolean isApproved;

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Integer getTicketID() {
        return ticketID;
    }

    public void setTicketID(Integer ticketID) {
        this.ticketID = ticketID;
    }

    public Boolean getApproved() {
        return isApproved;
    }
}
