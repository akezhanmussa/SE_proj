import React, { Component } from 'react';

function Timer(props){
    const value = props.value;
    const interval = props.interval;

    return(
        <div>
            <p>Timer:</p>
            <p>
                <span>{Math.round(value/interval/3600)} : </span>
                <span>{Math.round(value/interval/60)} : </span>
                <span>{Math.round(value/interval)} . : </span>
            </p>
        </div>
    );
}
