import React, { Component } from 'react';
import './Comment.css'
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
        this.inputCmt.current.value = "";
        axios.post(`${process.env.REACT_APP_URL_POST}/${this.props.data.params.id}/comment`, {
            "userCommented": info.user._id,
            "textCommented": this.state.textCommented
        })
        .catch();
        
        this.props.handleComment({
            "userCommented": {
                ...info.user
            },
            "textCommented": this.state.textCommented,
            dateComment: Date.now()
        }, this.props.indexItem);
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