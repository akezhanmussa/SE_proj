package kz.edu.nu.cs.se.service;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Date;
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


    private static InternetAddress[] convertToInternetAddress(String[] toEmail) throws MessagingException{
        InternetAddress[] toEmailAdress = new InternetAddress[toEmail.length];
        for(int i = 0; i < toEmail.length; i++) {
            toEmailAdress[i] = new InternetAddress(toEmail[i]);
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

    public static void sendAgentCreated(String toEmail, String username, String password) {

        Session session = getSession();

        try {
            Transport transport = session.getTransport();
            InternetAddress addressFrom = new InternetAddress(username);

            MimeMessage message = new MimeMessage(session);
            message.setSender(addressFrom);
            message.setSubject(subjectAgentCreated());
            message.setContent(textAgentCreated(username, password), "text/plain");
            message.addRecipient(Message.RecipientType.TO, new InternetAddress(toEmail));

            transport.connect();
            Transport.send(message);
            transport.close();
        } catch (MessagingException ex) {
            ex.printStackTrace();
        }



    }

//    public static void main(String [] args) throws Exception {
//        send("daniker.ktl@gmail.com");
//    }

}

