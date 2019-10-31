package kz.edu.nu.cs.se.auth.security;

import com.auth0.jwt.interfaces.DecodedJWT;
import javax.security.enterprise.CallerPrincipal;

/**
 * Represents the caller principal associated with the request.
 */
public class Auth0JwtPrincipal extends CallerPrincipal {

    private final DecodedJWT idToken;


    Auth0JwtPrincipal(DecodedJWT idToken) {
        super(idToken.getClaim("name").asString());
        this.idToken = idToken;
    }

    /**
     * @return the decoded ID token
     */
    public DecodedJWT getIdToken() {
        return this.idToken;
    }


}
