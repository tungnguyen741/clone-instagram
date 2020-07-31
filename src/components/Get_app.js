import React, { Component } from 'react';
import logo_appstore from '../image/appstore.png'
import logo_chplay from '../image/chplay.png'
import './Get_app.css';
export default class Get_app extends Component{
    render(){
        return(
           <div className="get-app">
                <div className="app-download">
                Get the app.
                </div>
                <div className="img_app">
                <div className="img-app-store">
                    <img src={logo_appstore} alt=""/>
                </div>
                <div className="img-ch-play">
                    <img src={logo_chplay} alt=""/>
                </div>
                </div>
           </div>
        );
    }
}
