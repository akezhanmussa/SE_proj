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
                    .withClaim("username", user.getUserName())
                    .withClaim("user_role", user.getUserRole())
                    .withIssuedAt(date)
                    .withExpiresAt(date2)
                    .sign(algorithm);

            return Optional.of(token);
        } catch (JWTCreationException | IllegalArgumentException ex){
            return null;
        }
    }

    public static String getUserFromToken(String token) {
        DecodedJWT jwt = JWT.decode(token);
        String username = jwt.getClaim("username").asString();
        return username;
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