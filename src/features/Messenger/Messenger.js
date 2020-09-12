import React from 'react'
import { Component } from 'react';
import io from "socket.io-client";

var socket;
export default class Messenger extends Component {
    constructor(props){
        super(props);
        this.state={
            test: '',
            message: '',
            messageRe: ''
        }
        socket = io('http://localhost:3001/');
        
    }

    componentDidMount(){
        socket.on('server-send-message', data => {
            this.setState({messageRe: data})
           
        })
    }
    getDataInput = (e) => {
        this.setState( {message:e.target.value } )
    }
    handleSendData = (e) => {
        socket.emit('client-send-message', this.state.message);
    }
    render(){
 
        return(
            <div className="Messenger" style={{margin:'0 auto', textAlign: 'center' }}>
                <h1>Messenger</h1>
                <div id="save_data" className="wrapper_content" style={{width: '300px', height:'150px',margin:'0 auto', border:'1px solid '}}>
                { this.state.messageRe.length && this.state.messageRe.map(item => <div className="data">{item}</div>)}
                </div>
                <input onChange={this.getDataInput} type="text"/>
                <input onClick={this.handleSendData} type="button" value="Gửi"/>
            
            </div>
        );
    }
}