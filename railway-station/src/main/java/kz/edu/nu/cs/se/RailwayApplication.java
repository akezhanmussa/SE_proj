package kz.edu.nu.cs.se;

import kz.edu.nu.cs.se.api.RailwayService;

import java.util.HashSet;
import java.util.Set;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

@ApplicationPath("/myrailway")
public class RailwayApplication extends Application{

    private Set<Object> singletons = new HashSet<Object>();
    private Set<Class<?>> empty = new HashSet<Class<?>>();

    public RailwayApplication() {
        singletons.add(new RailwayService());
    }

    @Override
    public Set<Class<?>> getClasses() {
        return empty;
    }

    @Override
    public Set<Object> getSingletons() {
        return singletons;
    }

}
