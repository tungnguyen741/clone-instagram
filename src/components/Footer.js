import React, { Component } from 'react';
import './Footer.css'
export default class Footer extends Component{
    render(){
        return(
            <div className="Footer">
                <ul >
                    <li><a >about</a></li>
                    <li><a >help</a></li>
                    <li><a >press</a></li>
                    <li><a >api</a></li>
                    <li><a >jobs</a></li>
                    <li><a >privacy</a></li>
                    <li><a >terms</a></li>
                    <li><a >locations</a></li>
                    <li><a >top accounts</a></li>
                    <li><a >hashtags</a></li>
                    <li><a >language</a></li>
                </ul>
            <span>© 2020 INSTAGRAM FROM FACEBOOK</span>
            </div>
        );
    }
}