import React from 'react'
import { Component } from 'react';
import {  Link, Router, Route } from 'react-router-dom';
import closeIcon from '../../image/close.svg'
import moment from 'moment'
import Like from '../Like/Like'
import comment from "../../image/comment.svg"
import share from "../../image/share.svg"
import Comment from '../Comment/Comment'

export default class Render_DetailPost_TimeLine extends Component {
    constructor(){
        super();
        this.state={
            isShowUsersLike: false,
            isFocusCmt: false,
        }
    }
    handleFocusCmt = () => {
        this.setState({isFocusCmt: true})
    }
    
    handleShowLike = () => {
        this.setState({isShowUsersLike: !this.state.isShowUsersLike});
    }
    

    isEmpty(obj) {
        for(var prop in obj) {
          if(obj.hasOwnProperty(prop)) {
            return false;
          }
        }
      
        return JSON.stringify(obj) === JSON.stringify({});
      }
    render(){
        const info = JSON.parse(localStorage.getItem("info"));
        if(!this.isEmpty(this.props.postDetail) ){
            var imgPostDetail = [].concat(this.props.postDetail).map( (post, i)=> <div>
                <img src={post.imgPostUrl} alt=""/>
            </div>)
            var imgPostDetail = [].concat(this.props.postDetail).map( (post, i)=>
            <div className="post">
            {/* {console.log(post.authorID)} */}
                    <div key={i} className="post_detailTL">
                        <div className="author">
                            <img src={post.authorID.avatarUrl} alt=""/>
                            <span className="author_name">{post.authorID.email}</span>
                        </div>
                        <div className="Img_postedTL">
                            <img src={post.imgPostUrl} alt=""/>
                        </div>
                            <div className="btn_emoji">
                             {/*======== ISLIKED BY ME ========*/}
                             { <Like liked={this.props.isLiked ? true : false} amountLike={this.props.amountLike} handleUpAmountLike={this.props.handleUpAmountLike} handleDownAmountLike={this.props.handleDownAmountLike}  handleLikePost={this.props.handleLikePost} data={this.props.match} />   }
                                <button onClick={this.handleFocusCmt} className="btn_comment"> <img src={comment} alt=""/> </button>
                        
                                <button className="btn_share"> <img src={share} alt=""/> </button>
                            </div>
                        <div className="info_detailTL">
                            <div className="author">
                                <span className="author_name">{post.authorID.email}</span>
                                {post.description}
                            </div>
                            {/* ==========================User COMMENTS ========================== */}
                          <div className="wrapper_commentTL">
                            {
        
                                this.props.userCommented.map(cmt=><div className="user_comment">
                                            <div className="user_nameAvatar">
                                                <div className="avatar_content">
                                                    <Link to={`/${cmt.userCommented.email}/`}>                  
                                                            <img src= {cmt.userCommented.avatarUrl} alt=""/>    
                                                    </Link>
        
                                                    <div className="content_comment">
                                                        <Link to={`/${cmt.userCommented.email}/`}>                
                                                                <span className="user_name">{cmt.userCommented.name}</span>                                                
                                                            </Link>
                                                            {cmt.textCommented}
                                                    </div>
                                                    {/* DATE comment */}
                                                </div>
                                            </div>
                                                <div className="date_comment">
                                                    {moment(cmt.dateComment).fromNow()}
                                                </div>
                                                <span className="delCmt" onClick={() => this.props.handleDelComment(cmt)} >...</span>
                                   
                                </div>)
                            }
                            </div>
                            {/* ========================== btn like, cmt, share ==========================  */}
                           
                          
        
        
                       
                         
                          
                        {/* DATE POST */}
                        <div className="date_postTL">
                            {moment(moment(post.datePost).format("MMMM DD, YYYY")).fromNow()}
                        </div>
                        <Comment data={this.props.match} handleComment={this.props.handleComment} isFocusCmt={this.state.isFocusCmt} />
                        </div>
                    </div>
                    
                </div> 
        
            )
        }
    return(
        <div>
            {imgPostDetail}
        </div>
    );
    }
}