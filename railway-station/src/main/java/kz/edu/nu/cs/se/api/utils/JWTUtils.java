package kz.edu.nu.cs.se.api.utils;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import kz.edu.nu.cs.se.model.Passenger;

import java.util.Date;

public class JWTUtils {

    public static String generateToken(Passenger passenger) {
        Date date = new Date();
        Date date2 = new Date();
        date2.setMinutes(date.getMinutes() + 60);
        try {
            Algorithm algorithm = Algorithm.HMAC256("secret");
            String token = JWT.create()
                    .withIssuer("auth0")
                    .withClaim("user_id", passenger.getPassengerId())
                    .withClaim("first_name", passenger.getFirstName())
                    .withClaim("last_name", passenger.getLastName())
                    .withClaim("email", passenger.getEmail())
                    .withClaim("phone_number", passenger.getPhoneNumber())
                    .withClaim("user_name", passenger.getUserName())
                    .withClaim("password", passenger.getPassword())
                    .withIssuedAt(date)
                    .withExpiresAt(date2)
                    .sign(algorithm);
            return token;
        } catch (JWTCreationException exception){
            //Invalid Signing configuration / Couldn't convert Claims.
        }
        return "error";
    }

    public static Passenger getPassengerFromToken(String token){
        DecodedJWT jwt = JWT.decode(token);
        int userId = jwt.getClaim("user_id").asInt();
        String firstName = jwt.getClaim("first_name").asString();
        String lastName = jwt.getClaim("last_name").asString();
        String email = jwt.getClaim("email").asString();
        String phoneNumber = jwt.getClaim("phone_number").asString();
        String userName = jwt.getClaim("user_name").asString();
        String password = jwt.getClaim("password").asString();

        return new Passenger(firstName,lastName,email,phoneNumber,userName,password,userId);
    }

    public static Long getExpiresAt(String token){
        DecodedJWT jwt = JWT.decode(token);
        Long expiresAt = jwt.getClaim("exp").asLong();
        return expiresAt;
    }
}
