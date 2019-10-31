package kz.edu.nu.cs.se.model;

public class TicketModel {
    private Integer idTicket;
    private Integer idPassenger;
    private String startDate;
    private String endDate;
    private Integer idOrigin;
    private Integer idDestination;
    private String status;
    private String ownerDocumentType;
    private String ownerFirstName;
    private String ownerLastName;
    private String ownerDocumentId;
    private Integer price;
    private Integer agentId;
    private Integer scheduleId;

    public TicketModel(Integer idTicket) {
        this.setIdTicket(idTicket);
    }

    public Integer getIdTicket() {
        return idTicket;
    }

    public void setIdTicket(Integer idTicket) {
        this.idTicket = idTicket;
    }

    public Integer getIdPassenger() {
        return idPassenger;
    }

    public void setIdPassenger(Integer idPassenger) {
        this.idPassenger = idPassenger;
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

    public Integer getIdOrigin() {
        return idOrigin;
    }

    public void setIdOrigin(Integer idOrigin) {
        this.idOrigin = idOrigin;
    }

    public Integer getIdDestination() {
        return idDestination;
    }

    public void setIdDestination(Integer idDestination) {
        this.idDestination = idDestination;
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

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public Integer getAgentId() {
        return agentId;
    }

    public void setAgentId(Integer agentId) {
        this.agentId = agentId;
    }

    public Integer getScheduleId() {
        return scheduleId;
    }

    public void setScheduleId(Integer scheduleId) {
        this.scheduleId = scheduleId;
    }




}
