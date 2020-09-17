import React, { Component } from 'react'
import io from 'socket.io-client'
// socket = io(process.env.REACT_APP_URL_SOCKET); 
var socket;
export const SocketIoContext = React.createContext();
export class SocketIoProvider extends Component{
    
    constructor(){
        super();
        this.state = {
            message:'',
            messageRe: ''
        }
        socket = io(process.env.REACT_APP_URL_SOCKET);        
    }

    componentDidMount(){
        socket.on('server-send-message', data => {
            this.setState({messageRe: data})
            console.log(data);
        })

    }
    sendMess = (value) => {
        console.log('value sent',value)
        socket.emit('client-send-message', value);
    }
    componentDidUpdate(){
 
    }
    render(){
        //fail
        // socket.on('sv-comment', data => {
        //     console.log('client-listen socket-context-render: ', data);
        // })

        return(
            <SocketIoContext.Provider value={{data: this.state,sendMess: this.sendMess, test: 100}}>
                {this.props.children}
            </SocketIoContext.Provider>
        )
    }
}

