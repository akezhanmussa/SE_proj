package kz.edu.nu.cs.se.view;

import kz.edu.nu.cs.se.model.TicketModel;

public class TicketForAgent {
    private Integer ticketID;
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
    private Integer scheduleId;

    public TicketForAgent(TicketModel model) {
        ticketID = model.getIdTicket();
        startDate = model.getStartDate();
        endDate = model.getEndDate();
        idOrigin = model.getIdOrigin();
        idDestination = model.getIdDestination();
        status = model.getStatus();
        ownerDocumentType = model.getOwnerDocumentType();
        ownerFirstName = model.getOwnerFirstName();
        ownerLastName = model.getOwnerLastName();
        ownerDocumentId = model.getOwnerDocumentId();
        price = model.getPrice();
        scheduleId = model.getScheduleId();
    }
}
