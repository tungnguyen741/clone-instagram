import React, { Component } from 'react';
import './Not_account.css';
import {
    Link
  } from "react-router-dom";
export default class Not_account extends Component{
    render(){
        return(
            <div className="have-account">
                <span>{this.props.children}</span>
                <Link to="/accounts/emailsignup" className="btn-sign-up">{this.props.btn_signUp}</Link>
            </div>
        );
    }
}
