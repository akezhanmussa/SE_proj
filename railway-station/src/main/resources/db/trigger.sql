create function check_date_conflict()
returns trigger as
    $$
    begin
        perform *
        from eDiwTC3jTl.Route
        where
            idRoute <> new.idRoute
            and (start_time < new.start_time and send_time > new.send_time));
        if found then
            raise exception 'date conflict occurred';
        end if;
        return new;
    end;
    $$
    language plpgsql;


create trigger route_ait
    after insert
    on eDiwTC3jTl.Route
    for each row
    execute procedure check_date_conflict();