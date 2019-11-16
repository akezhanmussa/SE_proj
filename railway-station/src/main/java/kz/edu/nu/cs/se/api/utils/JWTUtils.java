package kz.edu.nu.cs.se.api.utils;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import kz.edu.nu.cs.se.model.User;

import java.util.Date;
import java.util.Optional;

public class JWTUtils {

    public static Optional<String> generateToken(User user) {
        Date date = new Date();
        Date date2 = new Date();
        date2.setTime(date.getTime() + 180000);
        try {
            Algorithm algorithm = Algorithm.HMAC256("secret");
            String token = JWT.create()
                    .withIssuer("auth0")
                    .withClaim("user_id", user.getUserId())
                    .withClaim("first_name", user.getFirstName())
                    .withClaim("last_name", user.getLastName())
                    .withClaim("email", user.getEmail())
                    .withClaim("phone_number", user.getPhoneNumber())
                    .withClaim("username", user.getUserName())
                    .withClaim("user_role", user.getUserRole())
                    .withClaim("station_id", user.getStationId())
                    .withIssuedAt(date)
                    .withExpiresAt(date2)
                    .sign(algorithm);

            return Optional.of(token);
        } catch (JWTCreationException | IllegalArgumentException ex){
            return null;
        }
    }

    public static User getUserFromToken(String token){
        DecodedJWT jwt = JWT.decode(token);
        int userId = jwt.getClaim("user_id").asInt();
        String firstName = jwt.getClaim("first_name").asString();
        String lastName = jwt.getClaim("last_name").asString();
        String email = jwt.getClaim("email").asString();
        String phoneNumber = jwt.getClaim("phone_number").asString();
        String userName = jwt.getClaim("username").asString();


        return new User(firstName,lastName,email,phoneNumber,userName,userId);
    }

    public static Integer getStationIdFromToken(String token) {
        DecodedJWT jwt = JWT.decode(token);
        Integer stationId = jwt.getClaim("station_id").asInt();
        return stationId;
    }

    public static Long getExpiresAt(String token){
        DecodedJWT jwt = JWT.decode(token);
        return jwt.getClaim("exp").asLong();
    }

    public static Boolean isExpired(String token){
        Date dateToken = new Date(getExpiresAt(token) * 1000);
        Date dateCurrent = new Date();

        System.out.println("Current date " + dateCurrent);
        System.out.println("Expire date " + dateToken);

        return dateCurrent.compareTo(dateToken) >= 0;
    }

    private static String getUserRole(String token) {
        DecodedJWT jwt = JWT.decode(token);
        String userRole = jwt.getClaim("user_role").asString();
        return userRole;
    }

    public static Boolean isPassenger(String token) {
        return getUserRole(token).equals("passenger");
    }

    public static Boolean isAgent(String token) {
        return getUserRole(token).equals("agent");
    }

    public static Boolean isManager(String token) {
        return getUserRole(token).equals("manager");
    }
}
