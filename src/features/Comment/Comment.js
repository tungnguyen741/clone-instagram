import React, { Component } from 'react';
import './Comment.css'
import classNames from 'classnames'
import { Router, Redirect, Route, Link } from 'react-router-dom';
import comment from "../../image/comment.svg"
import axios from "axios"
export default class Comment extends Component{
    constructor(){
        super();
        this.state = {
            disabled: true,
            textCommented: ""
        }
        this.inputCmt = React.createRef();
        this.handleCommentPost = this.handleCommentPost.bind(this);

    }
   
    handleCommentPost(e){
        e.preventDefault();
        const info = JSON.parse( localStorage.getItem("info") );
        console.log("COMMENT");
        this.inputCmt.current.value = "";
        axios.post(`http://localhost:3001/api/post/${this.props.data.params.id}/comment`, {
            "userCommented": info.user._id,
            "textCommented": this.state.textCommented
        })
        .then(res => {
            console.log(res)
        } )
        .catch(err => console.log(err) )

        this.props.handleComment({
            "userCommented": {
                avatarUrl : info.user.avatarUrl,
                name: info.user.name
            },
            "textCommented": this.state.textCommented
        });

    }
    handleOnChange = (e) => {
        e.target.value ? this.setState({disabled: false, textCommented: e.target.value }) : this.setState({disabled: true, textCommented: ""});
    }
    render(){
        if( this.props.isFocusCmt){
            this.inputCmt.current.focus();
        }
        return(
           <div className="Comment">
             <form onSubmit={this.handleCommentPost}>
                    <input placeholder="Add a comment..." ref={this.inputCmt} onChange={this.handleOnChange} type="text" name="comment"/>
                    <button className={this.state.disabled ? "btn_post_cmt" : "btn_post_cmt active"}  disabled={this.state.disabled ? true : false} >post</button>
                </form>
           </div>
        );
    }
}