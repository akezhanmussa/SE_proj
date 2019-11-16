package kz.edu.nu.cs.se.api.utils;

public class TicketRequestObject {
    private String token;

    private Integer scheduleId;
    private Integer passengerId;
    private Integer origin_id;
    private Integer destination_id;
    private Integer owner_document_id;
    private Float price;

    private String start_date;
    private String end_date;
    private String owner_document_type;
    private String owner_firstname;
    private String owner_lastname;

    public String getToken() {
        return token;
    }

    public Integer getScheduleId() {
        return scheduleId;
    }

    public void setScheduleId(Integer scheduleId) {
        this.scheduleId = scheduleId;
    }

    public Integer getPassengerId() {
        return passengerId;
    }

    public void setPassengerId(Integer passengerId) {
        this.passengerId = passengerId;
    }

    public Integer getOrigin_id() {
        return origin_id;
    }

    public void setOrigin_id(Integer origin_id) {
        this.origin_id = origin_id;
    }

    public Integer getDestination_id() {
        return destination_id;
    }

    public void setDestination_id(Integer destination_id) {
        this.destination_id = destination_id;
    }

    public Integer getOwner_document_id() {
        return owner_document_id;
    }

    public void setOwner_document_id(Integer owner_document_id) {
        this.owner_document_id = owner_document_id;
    }

    public Float getPrice() {
        return price;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    public String getStart_date() {
        return start_date;
    }

    public void setStart_date(String start_date) {
        this.start_date = start_date;
    }

    public String getEnd_date() {
        return end_date;
    }

    public void setEnd_date(String end_date) {
        this.end_date = end_date;
    }

    public String getOwner_document_type() {
        return owner_document_type;
    }

    public void setOwner_document_type(String owner_document_type) {
        this.owner_document_type = owner_document_type;
    }

    public String getOwner_firstname() {
        return owner_firstname;
    }

    public void setOwner_firstname(String owner_firstname) {
        this.owner_firstname = owner_firstname;
    }

    public String getOwner_lastname() {
        return owner_lastname;
    }

    public void setOwner_lastname(String owner_lastname) {
        this.owner_lastname = owner_lastname;
    }
}