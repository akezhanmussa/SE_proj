import React, {Component} from "react"
import {motion} from "framer-motion"

export default class MapComponent extends Component{

    constructor(props){
        super(props)
        this.state = {
            color : "#858283",
            startPoint_x : 10,
            startPoint_y : 10,
            destinationPoint_x:15,
            destinationPoint_y:12,
            pointRadius : 0.15,
            lineWidth : 0.07
        }
    }

    render() {
        return (
            <svg
                width="300"
                height="300"
                x="0"
                y="0"
                // enableBackground="new 0 0 21.953 21.954"
                // version="1.1"
                viewBox="0 0 22 22"
                xmlSpace="preserve"
            >
                <path
                    fill={this.state.color}
                    d="M7.377 9.191c-1.206-.51-2.508.162-3.754-.498-1.332-.703-2.447.443-3.298 1.179-.919.792.367 1.349.748 2.021.503.89.946.005 1.4.085.326.058.785-.153.932.266.147.42-.174.568-.571.699-1.005.329-.559.907-.214 1.496.543.931 1.768.438 2.545 1.661.034-.767-.002-1.033.066-1.266.166-.562-.446-1.289.509-1.704.863-.378 1.373.107 1.924.512.412.307.717.688 1.326.554.8-.179 1.31.093 1.617.95.249.695.9 1.182 1.634.567 1.632-1.363 3.515-1.199 5.353-.842.78.151.888-.084.963-.642.164-1.19.952-1.834 1.982-2.227.425-.163 1.593-1.827 1.393-1.839-.949-.058-1.366-1.187-2.329-1.107-.993.083-1.651-.28-2.186-1.158-.481-.791-1.014-1.813-2.311-.91-.219.152-.977-.108-1.209-.398-.913-1.144-1.938-.691-2.994-.38-.732.215-1.467.468-2.217.561-1.329.162-1.179 1.226-.941 1.891.238.667-.057.66-.368.529z"
                ></path>
                <ellipse
                    id = "start_point"
                    cx = {this.state.startPoint_x}
                    cy = {this.state.startPoint_y}
                    rx = {this.state.pointRadius}
                    ry = {this.state.pointRadius}
                    fill = {"#ffffff"}
                >
                </ellipse>
                <motion.g
                    animate={{
                        scale:0.01
                    }}
                    transition = {{
                        duration:1,
                        loop: Infinity,
                        repeatDelay: 2
                    }}
                >
                    <line x1 = {this.state.startPoint_x} y1 = {this.state.startPoint_y} x2 = {this.state.destinationPoint_x} y2 = {this.state.destinationPoint_y} stroke = "black" stroke-width = {this.state.lineWidth}/>
                </motion.g>
                <ellipse
                    id = "destiny_point"
                    cx = {this.state.destinationPoint_x}
                    cy = {this.state.destinationPoint_y}
                    rx = {this.state.pointRadius}
                    ry = {this.state.pointRadius}
                    fill = {"#ffffff"}
                >
                </ellipse>
            </svg>
        );
    }
}

