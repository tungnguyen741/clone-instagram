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
        socket = io(process.env.REACT_APP_URL_SOCKET);
        this.inputMess = React.createRef();
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
        e.preventDefault();
        this.inputMess.current.value = '';
        socket.emit('client-send-message', this.state.message);
    }
    render(){
      
        return(
            <div className="Messenger" style={{margin:'0 auto', textAlign: 'center' }}>
                <h1>Messenger</h1>
                <div id="save_data" className="wrapper_content" style={{width: '300px', minHeight:'150px',margin:'0 auto', border:'1px solid '}}>
                { this.state.messageRe.length && this.state.messageRe.map(item => <div className="data">{item===0 ? '' : item}</div>)}
                </div>
                <form >
                    <input ref={this.inputMess} onChange={this.getDataInput} type="text"/>
                    <button onClick={this.handleSendData} type="submit"> Gửi </button>
                </form>
            
            </div>
        );
    }
}