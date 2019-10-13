import React, {Component} from 'react';


class ScheduleRow extends Component {
    render() {
        const origin = this.props.origin;
        const destination = this.props.destination
        const timeRange = this.props.timeRange
        const capacity = this.props.capacity
        const trainName = this.props.trainName

        return (
            <tr>
                <td>{origin}</td>
                <td>{destination}</td>
                <td>{timeRange}</td>
                <td>{capacity}</td>
                <td>{trainName}</td>
            </tr>
        );
    }
}
class ScheduleTable extends Component{

    render() {
        const rows = []
        this.props.schedule.schedule.forEach((route) => {
            console.log(route.Capacity + " " + route.Train)
            rows.push(
                <ScheduleRow
                    origin = {route.Origin}
                    destination = {route.Destination}
                    trainName = {route.Train}
                    capacity = {route.Capacity}
                    timeRange = {route.Date}
                />
            );
        });

        return(
            <table border={"1"}>
                <thead>
                <tr>
                    <th>Origin</th>
                    <th>Destination</th>
                    <th>TrainName</th>
                    <th>Capacity</th>
                    <th>TimeRange</th>
                </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        )
    }
}

export default ScheduleTable;