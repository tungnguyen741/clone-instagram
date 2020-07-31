import React, { Component } from 'react';
import './Comment.css'
import classNames from 'classnames'
import axios from 'axios'
import { Router, Redirect, Route, Link } from 'react-router-dom';
 

export default class Comment extends Component{
    constructor(){
        super();
        this.handleCommentPost = this.handleCommentPost.bind(this);
    }

    handleCommentPost(e){
        e.preventDefault();
        console.log("COMMENT");
        
    }

    render(){
        return(
           <div className="Comment">
             <form onSubmit={this.handleCommentPost}>
                    <input type="text" name="comment"/>
                    <button className="btn btn_post_cmt">post</button>
                </form>
           </div>
        );
    }
}