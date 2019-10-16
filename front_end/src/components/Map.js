import React, {Component} from 'react';


class Map extends Component {

    render() {
        return (
            <div>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Kazakhstan_provinces_and_province_capitals.svg/650px-Kazakhstan_provinces_and_province_capitals.svg.png" usemap="#image-map"/>

                <map name="image-map">
                    <area target="_blank" alt="" title="" href="" coords="395,103" shape="poly"/>
                        <area target="" alt="" title="" href="" coords="" shape="0"/>
                </map>
            </div>
        );
    }
}
export default Map;