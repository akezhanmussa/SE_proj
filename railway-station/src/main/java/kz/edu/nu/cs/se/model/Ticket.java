package kz.edu.nu.cs.se.model;

public class Ticket {



    private int ticketId;
    private int passengerId;
    private String startDate;
    private String endDate;
    private String originId;
    private String destinationId;
    private String status;
    private String ownerDocumentType;
    private String ownerFirstName;
    private String ownerLastName;
    private String ownerDocumentId;
    private String price;
    private String agentId;
    private String scheduleId;

    public Ticket(int ticketId, int passengerId, String startDate, String endDate, String originId,
                  String destinationId, String status, String ownerDocumentType,
                  String ownerFirstName, String ownerLastName, String ownerDocumentId,
                  String price, String agentId, String scheduleId) {
        this.ticketId = ticketId;
        this.passengerId = passengerId;
        this.startDate = startDate;
        this.endDate = endDate;
        this.originId = originId;
        this.destinationId = destinationId;
        this.status = status;
        this.ownerDocumentType = ownerDocumentType;
        this.ownerFirstName = ownerFirstName;
        this.ownerLastName = ownerLastName;
        this.ownerDocumentId = ownerDocumentId;
        this.price = price;
        this.agentId = agentId;
        this.scheduleId = scheduleId;
    }

    public int getTicketId() {
        return ticketId;
    }

    public int getPassengerId() {
        return passengerId;
    }

    public void setPassengerId(int passengerId) {
        this.passengerId = passengerId;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public String getOriginId() {
        return originId;
    }

    public void setOriginId(String originId) {
        this.originId = originId;
    }

    public String getDestinationId() {
        return destinationId;
    }

    public void setDestinationId(String destinationId) {
        this.destinationId = destinationId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getOwnerDocumentType() {
        return ownerDocumentType;
    }

    public void setOwnerDocumentType(String ownerDocumentType) {
        this.ownerDocumentType = ownerDocumentType;
    }

    public String getOwnerFirstName() {
        return ownerFirstName;
    }

    public void setOwnerFirstName(String ownerFirstName) {
        this.ownerFirstName = ownerFirstName;
    }

    public String getOwnerLastName() {
        return ownerLastName;
    }

    public void setOwnerLastName(String ownerLastName) {
        this.ownerLastName = ownerLastName;
    }

    public String getOwnerDocumentId() {
        return ownerDocumentId;
    }

    public void setOwnerDocumentId(String ownerDocumentId) {
        this.ownerDocumentId = ownerDocumentId;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getAgentId() {
        return agentId;
    }

    public void setAgentId(String agentId) {
        this.agentId = agentId;
    }

    public String getScheduleId() {
        return scheduleId;
    }

    public void setScheduleId(String scheduleId) {
        this.scheduleId = scheduleId;
    }


}
