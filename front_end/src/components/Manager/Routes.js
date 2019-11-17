import React, {Component} from 'react';
import {getRoutesUrl} from "../../shared/BaseUrl";


const getRoutesData = () => {
    let body = {"token":localStorage.getItem("admin_token")}
    return fetch(getRoutesUrl, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body:JSON.stringify(body)
    })
        .then(response => {
            return response.json();
        })
        .then(response => {
            console.log(response)
            return response;
        })
        .catch (error => {
            throw error
        });
}
//
// const RenderMainRoute = (props) => {
//
//     const mainRows = []
//
//     props.routes.forEach(function(elem){
//         let id = elem.id
//         let routes = elem.routes
//
//         let mainOrigin = routes[0].origin
//         let finalDestination = routes[routes.length - 1].destination
//
//         mainRows.push(<RenderRoutes ></RenderRoutes>)
//
//
//
//     })
//
//
//
//
//
// }
//
//
// const RenderRoutes = (props) => {
//     const rows = [];
//     for(let i = 0; i < props.routes.length; i++){
//         let newRow =
//             <tr key={i}>
//                 <td>
//                     {i + 1}
//                 </td>
//                 <td>
//                     {props.routes[i].startStation + " " + props.routes[i].endStation}
//                 </td>
//                 <td>
//                     {props.routes[i].startTime}
//                 </td>
//
//                 <td>
//                     {props.routes[i].endTime}
//                 </td>
//             </tr>
//         rows.push(newRow)
//     }
//     return(
//         <div className = 'container'>
//             <table className="table">
//                 <thead className="thead-dark">
//                 <tr>
//                     <th className="left aligned" scope="col">#</th>
//                     <th className="left aligned" scope="col">Route</th>
//                     <th className="center aligned" scope="col">Start Time</th>
//                     <th className="right aligned" scope="col">End Time</th>
//                 </tr>
//                 </thead>
//                 <tbody>
//                 {rows}
//                 </tbody>
//             </table>
//         </div>
//     );
// };
//
//
// class Routes extends Component{
//     constructor(props){
//         super(props)
//         this.state = {
//             routes:[],
//             expandedRoutes : []
//         }
//     }
//
//     handleRowClick(rowId){
//         const currentExpandedRows = this.state.expandedRows;
//         const isRowCurrentlyExpanded = currentExpandedRows.includes(rowId);
//
//         const newExpandedRows = isRowCurrentlyExpanded ?
//             currentExpandedRows.filter(id => id !== rowId) :
//             currentExpandedRows.concat(rowId);
//
//         this.setState({expandedRows : newExpandedRows});
//     }
//
//     renderItem(item) {
//         const clickCallback = () => this.handleRowClick(item.id);
//         const itemRows = [
//             <tr onClick={clickCallback} key={"row-data-" + item.id}>
//                 <td>{item.date}</td>
//                 <td>{item.total}</td>
//                 <td>{item.status}</td>
//             </tr>
//         ];
//
//         if(this.state.expandedRows.includes(item.id)) {
//             itemRows.push(
//                 <tr key={"row-expanded-" + item.id}>
//                     <td>{item.name}</td>
//                     <td>{item.points}</td>
//                     <td>{item.percent}</td>
//                 </tr>
//             );
//         }
//
//         return itemRows;
//     }
//
//     componentDidMount() {
//         getRoutesData().then(res =>{
//                 this.setState({routes:res})
//             }
//         ).catch(error =>
//             {
//                 throw error
//             }
//         )
//     }
//
//         render(){
//         return(
//             <div>
//
//                 {/*<RenderRoutes routes = {this.state.routes}></RenderRoutes>*/}
//             </div>
//         )
//     }
// }

class Routes extends Component {
    constructor() {
        super();

        this.state = {
            routes : [],
            expandedRows : []
        };
    }

    componentDidMount() {
        getRoutesData().then(res =>{
                this.setState({routes:res})
            }
        ).catch(error =>
            {
                throw error
            }
        )
    }

    handleRowClick(rowId) {
        const isRowCurrentlyExpanded = this.state.expandedRows.includes(rowId);

        const newExpandedRows = isRowCurrentlyExpanded ?
            this.state.expandedRows.filter(id => id !== rowId) :
            this.state.expandedRows.concat(rowId);

        this.setState({expandedRows : newExpandedRows});
    }

    renderItem(item) {
        const clickCallback = () => this.handleRowClick(item.id);

        const itemRows = [
            <tr onClick={clickCallback} key={"row-data-" + item.id}>
                <td>{item.id}</td>
            </tr>
        ];

        if(this.state.expandedRows.includes(item.id)) {
            item.routes.forEach(function(elem){
                itemRows.push(
                    <tr key = {"row-data-" + item.id}>
                        <td>{elem.origin}</td>
                        <td>{elem.destination}</td>
                    </tr>
                );
            })
        }

        return itemRows;
    }

    render() {
        let allItemRows = [];

        this.state.routes.forEach(item => {
            const perItemRows = this.renderItem(item);
            allItemRows = allItemRows.concat(perItemRows);
        });

        return (
            <div className = 'container'>
                <table className="table">
                    <thead className="thead-dark">
                    <tr>
                        <th className="left aligned" scope="col">Start Destination</th>
                        <th className="right aligned" scope="col">End Destination</th>
                    </tr>
                    </thead>
                    <tbody>{allItemRows}</tbody>
                </table>
            </div>
        );
    }
}
export default Routes;