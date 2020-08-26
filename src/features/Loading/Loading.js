import React, { Component } from 'react';

import './Loading.css'
export default class Loading extends Component{
    render(){
        return(
            <div className="Loading">
                <img src={this.props.loadingIcon} alt=""/>
            </div>
        );
    }
}