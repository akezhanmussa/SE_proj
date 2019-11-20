package kz.edu.nu.cs.se.service;

import javax.mail.*;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Date;
import java.util.List;
import java.util.Properties;


public class EmailService {

    private static String username = "daneker.vacation@gmail.com";
    private static String password = "12vacation3";
    private static String host = "smtp.gmail.com";
    private static String port = "465";
    private static String sslFactory = "javax.net.ssl.SSLSocketFactory";
    private static String protocol = "smtp";

    private static String subjectAgentCreated() {
        return "An account with your email has been created on railways.kz. Please change your password.";
    }

    private static String textAgentCreated(String username, String password) {
        return String.format("Your account username: %s \n temporary password: %s", username, password);
    }

    private static String subjectTicketCanceled() {
        return "PLEASE BE INFORMED: Your ticket has been canceled!";
    }

    private static String textTicketCanceled() {
        return String.format("One of your tickets has been canceled due to route cancellation. Please visit your account to change the ticket!");
    }


    private static InternetAddress[] convertToInternetAddress(List<String> toEmail) {
        InternetAddress[] toEmailAdress = new InternetAddress[toEmail.size()];
        try {
            for(int i = 0; i < toEmail.size(); i++) {
                toEmailAdress[i] = new InternetAddress(toEmail.get(i));
            }
        } catch (AddressException ex) {
            System.out.println(ex.getMessage() + " -> " + ex.getPos());
        }
        return toEmailAdress;
    }

    private static Session getSession() {
        Properties props = new Properties();
        props.setProperty("mail.transport.protocol", protocol);
        props.setProperty("mail.host", host);
        props.put("mail.smtp.port", port);
        props.put("mail.debug", "true");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.socketFactory.port", port);
        props.put("mail.smtp.socketFactory.class",sslFactory);
        props.put("mail.smtp.socketFactory.fallback", "false");
        Session session = Session.getDefaultInstance(props,
                new javax.mail.Authenticator() {
                    protected PasswordAuthentication getPasswordAuthentication() {
                        return new PasswordAuthentication(username,password);
                    }
                });
        return session;
    }

    public static void sendAgentCreated(String toEmail, String agentUsername, String agentPassword) {

        Session session = getSession();

        try {
            Transport transport = session.getTransport();
            InternetAddress addressFrom = new InternetAddress(username);

            MimeMessage message = new MimeMessage(session);
            message.setSender(addressFrom);
            message.setSubject(subjectAgentCreated());
            message.setContent(textAgentCreated(agentUsername, agentPassword), "text/plain");
            message.addRecipient(Message.RecipientType.TO, new InternetAddress(toEmail));

            transport.connect();
            Transport.send(message);
            transport.close();
        } catch (MessagingException ex) {
            ex.printStackTrace();
        }
    }

    public static void sendTicketCanceled(List<String> toEmailList) {

        InternetAddress[] toEmail = convertToInternetAddress(toEmailList);

        try {
            Session session = getSession();
            Transport transport = session.getTransport();
            InternetAddress addressFrom = new InternetAddress(username);

            MimeMessage message = new MimeMessage(session);
            message.setSender(addressFrom);
            message.setSubject(subjectTicketCanceled());
            message.setContent(textTicketCanceled(), "text/plain");
            message.addRecipients(Message.RecipientType.TO, toEmail);

            transport.connect();
            Transport.send(message);
            transport.close();
        } catch (MessagingException ex) {
            ex.printStackTrace();
        }
    }

}

