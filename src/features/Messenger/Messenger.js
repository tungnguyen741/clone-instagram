import React from 'react'
import { Component } from 'react';
import {SocketIoProvider, SocketIoContext} from '../../contexts/SocketIoContext'
import io from 'socket.io-client'
var socket;
socket = io(process.env.REACT_APP_URL_SOCKET);    
export default class Messenger extends Component {
    constructor(){
        super();
        this.state={
            message: '',
            messageRe: '',
            test2: false
        }
        this.inputMess = React.createRef();
    }
    componentDidMount(){
        // socket.on('server-send-message', data => {
        //     this.setState({messageRe: data})
        // })
        socket.on('test-sv',data=>this.setState({test2: data}));
    }
    
    getDataInput = (e) => {
       socket.emit('test', e.target.value);
       this.setState( {message:e.target.value } )
    }
    handleSendData = (e) => {
        e.preventDefault();
        this.inputMess.current.value = '';
        
    }
    render(){
        console.log('test2: ', (this.state.test2))
        return(
            <SocketIoProvider>
            <h1>Messenger</h1>
            <div className="Messenger" style={{width:'350px',minHeight:'250px',margin:'0 auto', textAlign: 'center' ,border:'1px solid'}}>
                <SocketIoContext.Consumer>
                { 
                    ({data, sendMess, test}) => <div>
                    <form>
                     </form>
                     <span>{data.messageRe}</span> 
                     <span>{test}</span>
                        <input ref={this.inputMess} onChange={this.getDataInput} type="text"/>
                        <button onClick={(e) => {e.preventDefault(); sendMess(this.state.message)}} type="submit"> Gửi </button> 
                     </div>
                }
                </SocketIoContext.Consumer>
            </div>
            </SocketIoProvider>
        );
    }
}