import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

// const name = "Some person";
// const element = <h1>Hello, {name}</h1>
//
// ReactDOM.render(element, document.getElementById('root'));

// Example, of how ReactDOM renders the DOM on each second of change
// function tick(){
//     const dateElement = (
//         <div>
//             <h1> Hello, world!</h1>
//             <h2> The current time is {new Date().toLocaleTimeString()}.</h2>
//         </div>
//     );
//     ReactDOM.render(dateElement, document.getElementById('root'))
// }
//
// setInterval(tick, 1000);

// Example of the functional component
// function Welcome(props){
//     return <h1> Hello, {props.name}</h1>;
// }
//
// const welcomeElem = <Welcome name = "Akezhan"/>
// ReactDOM.render(welcomeElem, document.getElementById('root'))
//

// Example of components composition
// function Welcome(props){
//     return <h1> Hello, {props.name}</h1>;
// }
//
// function AppWelcome(){
//     return(
//         <div>
//             <Welcome name = "Sara" />
//             <Welcome name = "Akezhan" />
//             <Welcome name = "Conor" />
//         </div>
//     );
// }
//
// ReactDOM.render(<AppWelcome/>, document.getElementById('root'))


// Example of creating the order of components
// const INTERVAL = 60;
// let total = 0;
//
//
// function Application(){
//     return(
//         <p>
//             <Timer/>
//             <Timer/>
//             <Timer/>
//         </p>
//     )
// }
//
// class Timer extends React.Component{
//
//     constructor(props){
//         super(props)
//         this.state = {value: 0};
//     }
//
//     increment(){
//         this.setState({value:this.state.value + 1})
//     }
//
//     componentDidMount(){
//         this.timerId = setInterval(() => this.increment(), 1000/INTERVAL);
//     }
//
//     componentWillUnmount() {
//         clearInterval(this.timerId)
//     }
//
//     render(){
//         const value = this.state.value;
//         return(
//             <div>
//                 <p>Timer:</p>
//                 <p>
//                    <ClockFace value = {value}/>
//                 </p>
//             </div>
//         );
//     }
// }
//
// function ClockFace(props){
//     const value = props.value;
//     return (
//         <p>
//             <span>{Math.round(value/INTERVAL/3600)} : </span>
//             <span>{Math.round(value/INTERVAL/60)} : </span>
//             <span>{Math.round(value/INTERVAL)} . : </span>
//             <span>{value % INTERVAL}</span>
//         </p>
//     );
// }
//
// ReactDOM.render(<Application/>, document.getElementById('root'))
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA


// Example with a Warning button
// function DangerAlert(props){
//     return (
//     <h3 className = "alert alert-danger">{props.text}</h3>
//     );
// }
//
// class Application extends React.Component{
//     constructor(props) {
//         super(props);
//         this.state = {isDangerAlertShowed: true}
//         this.toggleAlert = this.toggleAlert.bind(this)
//     }
//
//     toggleAlert(){
//         this.setState(prevState => ({
//             isDangerAlertShowed: !prevState.isDangerAlertShowed
//         }))
//     }
//
//     render(){
//         return (
//             <div>
//                 {this.state.isDangerAlertShowed ?
//                     <DangerAlert text = {"Warning"}/> : null}
//                 <button onClick = {this.toggleAlert}>{this.state.isDangerAlertShowed ? "Hide":"Show"}</button>
//             </div>
//         )
//     }
//
// }
//
// ReactDOM.render(<Application />, document.getElementById('root'))

// Rendering the array of mini jsx elements
// const someGuys = ["Akezhan", "Adilzhan","Izat"]
// const items = someGuys.map((guy) => <li>{guy}</li>)
//
// ReactDOM.render(<ul>{items}</ul>, document.getElementById('root'))

ReactDOM.render(<ul>"Hello World"</ul>, document.getElementById('root'));

serviceWorker.unregister();
