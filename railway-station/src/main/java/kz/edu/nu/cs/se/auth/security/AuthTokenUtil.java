package kz.edu.nu.cs.se.auth.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;

import java.util.Date;

public class AuthTokenUtil {
    public static String generateToken(String username, String password, Integer pid) {

        Date date = new Date();
        Date date2 = new Date();
        date2.setMinutes(date.getMinutes() + 60);

        try {
            Algorithm algorithm = Algorithm.HMAC256("secret");
            String token = JWT.create()
                    .withIssuer("auth0")
                    .withClaim("pid", pid)
                    .withClaim("username", username)
                    .withClaim("password", password)
                    .withIssuedAt(date)
                    .withExpiresAt(date2)
                    .sign(algorithm);
            return token;
        } catch (JWTCreationException exception){
            //Invalid Signing configuration / Couldn't convert Claims.
        }
        return "error";

    }

}
