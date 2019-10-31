<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html lang="en" class="h-100">
<head>
    <title>My trips</title>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.20/css/jquery.dataTables.css">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.auth0.com/js/auth0-samples-theme/1.0/css/auth0-theme.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/css/all.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.8/styles/monokai-sublime.min.css"/>
    <style>
        .wrap-table100 {
            margin-right: 164px;
            margin-left: 164px;
        }
        td.details-control {
            background-image: url("https://img.icons8.com/pastel-glyph/2x/plus.png") ;
            background-position: center;
            background-size: 28px 28px;
            background-repeat: no-repeat;
            cursor: pointer;
        }
        tr.shown td.details-control {
            background-image: url("https://img.icons8.com/pastel-glyph/2x/minus.png");
            background-size: 28px 28px;
            background-repeat: no-repeat;
            background-position: center;


        }
    </style>

</head>


<body>
<div class="h-100 d-flex flex-column">
    <%@include file="fragments/navbar.jspf"%>
    <div class="wrap-table100">
        <table id="upcoming-trips" class="display" style="width:100%">
            <thead>
                <tr>
                    <th></th>
                    <th>Passenger name</th>
                    <th>From-To</th>
                    <th>Departure time</th>
                    <th>Arrival time</th>
                    <th>Trip Status</th>
                </tr>
            </thead>
        </table>
    </div>
</div>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.8/highlight.min.js"></script>
<script>hljs.initHighlightingOnLoad();</script>
<script charset="utf8" src="https://cdn.datatables.net/1.10.20/js/jquery.dataTables.js"></script>
<script type="text/javascript">


    function format ( d ) {
        // `d` is the original data object for the row
        return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">'+
            '<tr>'+
            '<td>Ticket ID:</td>'+
            '<td>'+d.ticketId+'</td>'+
            '</tr>'+
            '<tr>'+
            '<td>Passenger name:</td>'+
            '<td>'+d.userFirstName+' '+d.userLastName+'</td>'+
            '</tr>'+
            '<tr>'+
            '<td>Route:</td>'+
            '<td>'+d.firstStatName+' - '+d.lastStatName+'</td>'+
            '</tr>'+
            '<tr>'+
            '<td>Departure date and time:</td>'+
            '<td>'+d.depDate+' - '+d.depTime+'</td>'+
            '</tr>'+
            '<tr>'+
            '<td>Arrival date and time:</td>'+
            '<td>'+d.arrDate+' - '+d.arrTime+'</td>'+
            '</tr>'+
            '<tr>'+
            '<td>Trip status:</td>'+
            '<td>'+d.tripStatus+'</td>'+
            '</tr>'+
            '<tr>'+
            '<td>Train #:</td>'+
            '<td>'+d.trainId+'</td>'+
            '</tr>'+
            '<tr>'+
            '<td>Train #:</td>'+
            '<td>'+d.trainId+'</td>'+
            '</tr>'+
            '<tr>'+
            '<td>Car #:</td>'+
            '<td>'+d.railcarId+'</td>'+
            '</tr>'+
            '<tr>'+
            '<td>Seat #:</td>'+
            '<td>'+d.seatNum+' ('+d.seatLocation+')</td>'+
            '</tr>'+
            '<tr>'+
            '<td>Price:</td>'+
            '<td>'+d.price+'$</td>'+
            '</tr>'+
            '<tr>'+
            '<td>Status:</td>'+
            '<td>'+d.ticketStatus+'</td>'+
            '</tr>'+
            '<tr>'+
            '</table>';
    }
    $(document).ready(function() {
        var table = $('#upcoming-trips').DataTable({
            "ajax" : {
                "url" : 'api/tickets?user_id=5&limit=1000&offset=0',
                dataSrc : ''
            },
            "columns" : [
                {
                    "class":          "details-control",
                    "orderable":      false,
                    "data":           null,
                    "defaultContent": ""
                },
                { data: null, render: function ( data) {
                        return data.userFirstName+' '+data.userLastName;
                    } }, { data: null, render: function ( data) {
                        return data.firstStatName+' - '+data.lastStatName;
                    } }, { data: null, render: function ( data) {
                        return data.depDate+' - '+data.depTime;
                    } }, { data: null, render: function ( data) {
                        return data.arrDate+' - '+data.arrTime;
                    } }, {
                    "data" : "tripStatus"
                }],

            "order": [[1, 'asc']]
        });

        $('#upcoming-trips tbody').on('click', 'td.details-control', function () {
            var tr = $(this).closest('tr');
            var row = table.row( tr );

            if ( row.child.isShown() ) {
                row.child.hide();
                tr.removeClass('shown');
            }
            else {
                row.child( format(row.data()) ).show();
                tr.addClass('shown');
            }
        } );
    });
</script>


</body>
</html>




