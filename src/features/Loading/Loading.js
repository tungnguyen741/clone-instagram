import React, { Component } from 'react';
import loadingIcon from '../../image/loading.gif'
import './Loading.css'
export default class Loading extends Component{
    render(){
        return(
            <div className="Loading">
                <img src={loadingIcon} alt=""/>
            </div>
        );
    }
}