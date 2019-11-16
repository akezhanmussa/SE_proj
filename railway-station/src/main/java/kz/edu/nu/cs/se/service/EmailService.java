package kz.edu.nu.cs.se.service;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Properties;


public class EmailService {

    private static String username = "...";
    private static String password = "...";
    private static String host = "smtp.gmail.com";
    private static String port = "465";

    private static InternetAddress[] convertToInternetAddress(String[] toEmail) throws MessagingException{
        InternetAddress[] toEmailAdress = new InternetAddress[toEmail.length];
        for(int i = 0; i < toEmail.length; i++) {
            toEmailAdress[i] = new InternetAddress(toEmail[i]);
        }
        return toEmailAdress;
    }

    private static void send(String subject, String text, String[] toEmail) {
        Properties props = new Properties();
        props.put("mail.smtps.host", host);
        props.put("mail.smtps.port", port);
        props.put("mail.transport.protocol", "smtps");

        Session session = Session.getInstance(props);

        MimeMessage msg = new MimeMessage(session);
        try {
            msg.setFrom(new InternetAddress(username));
            msg.setRecipients(Message.RecipientType.TO, convertToInternetAddress(toEmail));
            msg.setSubject(subject);
            msg.setSentDate(new Date());
            msg.setText(text);

            Transport transport = session.getTransport();
            try {
                transport.connect(username, password);
                transport.sendMessage(msg, msg.getAllRecipients());
            } finally {
                transport.close();
            }

        } catch (MessagingException ex) {
            ex.getMessage();
        }
    }

}

