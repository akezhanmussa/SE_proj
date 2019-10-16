import React, {Component} from 'react';

class ScheduleRow extends Component {
    render() {
        const id = this.props.id;
        const origin = this.props.origin;
        const destination = this.props.destination;
        const startDate = this.props.startDate;
        const endDate = this.props.endDate;
        const capacity = this.props.capacity;
        const train = this.props.train;

        return (
            <tr>
                <td>
                    <div align='center'>
                        <h5>{origin}</h5>
                        <h6>Departure Time: {startDate}</h6>
                    </div>
                </td>
                <td>
                    <div align='center'>
                        <h5>{destination}</h5>
                        <h6>Arrival Time: {endDate}</h6>
                    </div>
                </td>
                <td>
                    <div align='center'>
                        <h5>{train}</h5>
                    </div>
                </td>
                <td>
                    <div align='center'>
                        <h5 align='center'>{capacity}</h5>
                        {capacity > 0 ?
                            <button className='btn btn-secondary' onClick={()=>this.props.handleBuy(id)}>Buy a ticket</button>
                            :
                            <button className='btn btn-secondary disabled'>No tickets</button>
                        }
                    </div>
                </td>
            </tr>
        );
    }
}
class ScheduleTable extends Component{

    constructor(props){
        super(props);

        this.handleBuy = this.handleBuy.bind(this);
    }

    handleBuy = (id) =>{
        var message = "Are you sure?\nThis will cost you some money";
        if (window.confirm(message))
            console.log("This " + id + " will be send to agent");
    }

    render() {
        const rows = []
        this.props.schedule.schedule.forEach((route) => {
            rows.push(
                <ScheduleRow key={route.id}
                    id = {route.id}
                    origin = {route.origin}
                    destination = {route.destination}
                    train = {route.train}
                    capacity = {route.capacity}
                    startDate = {route.startDate}
                    endDate = {route.endDate}
                    handleBuy = {this.handleBuy}
                />
            );
        });

        return(
            <table className='mt-3 table table-striped table-responsive-md btn-table'>
                <thead>
                <tr>
                    <th><div align='center'>Origin</div></th>
                    <th><div align='center'>Destination</div></th>
                    <th><div align='center'>Train Number</div></th>
                    <th><div align='center'>Free Spaces</div></th>
                </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        )
    }
}

export default ScheduleTable;