package kz.edu.nu.cs.se.auth;


import com.auth0.AuthenticationController;
import kz.edu.nu.cs.se.auth.security.AuthenticationControllerProvider;

import javax.inject.Inject;
import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.UnsupportedEncodingException;

@WebServlet(urlPatterns = {"/login"})
public class LoginServlet extends HttpServlet {

    @Inject private AuthenticationController authenticationController;
    @Inject private String domain;
    @Inject private String scope;

    @Override
    public void init(ServletConfig config) throws ServletException {
        super.init(config);
        domain = config.getServletContext().getInitParameter("com.auth0.domain");
        scope = config.getServletContext().getInitParameter("auth0.scope");

        authenticationController = AuthenticationControllerProvider.getInstance(config);

    }

    private String buildAuthUrl(HttpServletRequest request) {
        String redirectUrl = String.format(
                "%s://%s:%s%s/callback",
                request.getScheme(),
                request.getServerName(),
                request.getServerPort(),
                request.getContextPath()
        );

        System.out.println("LOGIN SERVLET redirectUrl: "+redirectUrl);
        System.out.println("config domain: "+"https://" + domain + "/userinfo");

        String loginUrl = authenticationController.buildAuthorizeUrl(request, redirectUrl)
                            .withAudience("https://" + domain + "/userinfo")
                            .withScope(scope)
                            .build();
        return loginUrl;
    }

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.sendRedirect(buildAuthUrl(request));
    }

}
