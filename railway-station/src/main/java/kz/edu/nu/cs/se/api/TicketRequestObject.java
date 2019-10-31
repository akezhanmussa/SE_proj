package kz.edu.nu.cs.se.api;

public class TicketRequestObject {
    Integer scheduleId;
    Integer passengerId;
    Integer origin_id;
    Integer destination_id;
    Integer owner_document_id;
    Float price;


    String start_date;
    String end_date;
    String owner_document_type;
    String owner_firstname;
    String owner_lastname;
}