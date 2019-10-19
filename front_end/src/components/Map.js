import React, {Component} from 'react';
    import MapComponent from "./MapComponent";


export default class Map extends Component {

    render() {
        return (
            <div className='row justify-content-around'>
                <MapComponent/>
            </div>
        );
    }
}
