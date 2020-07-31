import React, { Component } from 'react';
import {Redirect} from "react-router-dom";
export default class NotFound extends Component{
    render(){
        return(
            <h1>
                Sorry, this page isn't available.
                The link you followed may be broken, or the page may have been removed. Go back to Instagram.
                <Redirect to="/" />
            </h1>
        );
    }
}