import React, {Component} from 'react';
import Map from './Map';

class Main extends Component{
    render() {
        return(
        <div className='container'>
            <div className='row justify-content-center'>
                    <Map></Map>
            </div>
            <div className='row justify-content-center'>
                <Search></Search>
            </div>
        </div>
        );
    }
}

export default Main;