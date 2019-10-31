//package kz.edu.nu.cs.se.auth;
//
//import javax.inject.Inject;
//import javax.servlet.ServletConfig;
//import javax.servlet.annotation.WebServlet;
//import javax.servlet.http.HttpServlet;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import java.io.IOException;
//
//@WebServlet(urlPatterns = {"/logout"})
//public class LogoutServlet extends HttpServlet {
//
//    @Inject  private String domain;
//    @Inject private String clientId;
//
//    @Override
//    public void init(ServletConfig config) {
//        domain = config.getServletContext().getInitParameter("com.auth0.domain");
//        clientId = config.getServletContext().getInitParameter("com.auth0.clientId");
//    }
//
//    @Override
//    protected void doGet(final HttpServletRequest request, final HttpServletResponse response) throws IOException {
//        clearSession(request);
//        response.sendRedirect(getLogoutUrl(request));
//    }
//
//    private void clearSession(HttpServletRequest request) {
//        if (request.getSession() != null) {
//            request.getSession().invalidate();
//        }
//    }
//
//    private String getLogoutUrl(HttpServletRequest request) {
//        System.out.println("LOGOUt HEREEEEE");
//        String returnUrl = String.format("%s://%s", request.getScheme(), request.getServerName());
//        int port = request.getServerPort();
//        String scheme = request.getScheme();
//
//        if (("http".equals(scheme) && port != 80) ||
//                ("https".equals(scheme) && port != 443)) {
//            returnUrl += ":" + port;
//        }
//
//        returnUrl += request.getContextPath();
//        System.out.println("RETURN URL: " + returnUrl);
//
//        String logoutUrl = String.format(
//                "https://%s/v2/logout?client_id=%s&returnTo=%s",
//                domain,
//                clientId,
//                returnUrl
//        );
//
//
//        return returnUrl;
//    }
//}
