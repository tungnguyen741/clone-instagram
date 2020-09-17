import React, { Component } from 'react';
import './Comment.css'
import axios from "axios"
import io from 'socket.io-client'
import anotherLoading from '../../image/loading5.gif'
var socket;

export default class Comment extends Component{
    constructor(){
        super();
        this.state = {
            disabled: true,
            textCommented: "",
            isReFocusCmt: ''
        }
        this.inputCmt = React.createRef();
        this.handleCommentPost = this.handleCommentPost.bind(this);
        socket = io(process.env.REACT_APP_URL_SOCKET); 
    }
   
    handleCommentPost(e){
        e.preventDefault();
        const info = JSON.parse( localStorage.getItem("info") );
        this.inputCmt.current.value = "";
        let data = {
            "userCommented": info.user._id,
            "textCommented": this.state.textCommented
        };
        
        socket.emit('client-comment', { "userCommented": {
                ...info.user
            },
            "textCommented": this.state.textCommented,
            dateComment: Date.now()
        }
        );
    
        axios.post(`${process.env.REACT_APP_URL_POST}/${this.props.data.params.id}/comment`, data)
        .catch();
        
        // this.props.handleComment({
        //     "userCommented": {
        //         ...info.user
        //     },
        //     "textCommented": this.state.textCommented,
        //     dateComment: Date.now()
        // }, this.props.indexItem);
        
    }
    
    handleOnChange = (e) => {
        e.target.value ? this.setState({disabled: false, textCommented: e.target.value }) : this.setState({disabled: true, textCommented: ""});
    }
    
    handleFocusCmt = () => {
        socket.emit('client-focus-inputCmt', 'focus_inputCmt');
    }
    handleBlurCmt = () => {
        socket.emit('client-stop-focus-inputCmt', 'stop_focus_inputCmt');
    }


    render(){
       
        

        if( this.props.isFocusCmt){
            this.inputCmt.current.focus();
        }
        return(
           <div className="Comment">
           {/* {this.state.isReFocusCmt==='focus_inputCmt' && <div className="another_cmt"> */}
            {/* <div className="another_cmt">
                <img src={anotherLoading} alt="loading"/>
                <span>ai đó đang nhập bình luận</span>
           </div>   */}
             <form onSubmit={this.handleCommentPost}>
                    <input autoComplete="off" onBlur={this.handleBlurCmt} onFocus={this.handleFocusCmt} placeholder="Add a comment..." ref={this.inputCmt} onChange={this.handleOnChange} type="text" name="comment"/>
                    <button className={this.state.disabled ? "btn_post_cmt" : "btn_post_cmt active"}  disabled={this.state.disabled ? true : false} >post</button>
                </form>
           </div>
        );
    }
}