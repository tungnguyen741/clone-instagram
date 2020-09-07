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
        // console.log(this.props.handleLikePost);
        if(!this.isEmpty(this.props.postDetail) ){
            var imgPostDetail = [].concat(this.props.postDetail).map( (post, i)=> <div>
                <img src={post.imgPostUrl} alt=""/>
            </div>)
            var imgPostDetail = [].concat(this.props.postDetail).map( (post, i)=>
            <div className="post">
            {/* {console.log(post.authorID)} */}
                    <div key={i} className="post_detailTL">
                        <Link to={post.authorID.email} className="author">
                            <img src={post.authorID.avatarUrl} alt=""/>
                            <span className="author_name">{post.authorID.email}</span>
                        </Link>
                        <div className="Img_postedTL">
                           <Link to={`/p/${post._id}`}>
                            <img src={post.imgPostUrl} alt=""/>
                           </Link>
                        </div>
                            <div className="btn_emoji">
                             {/*======== ISLIKED BY ME ========*/}
                             { <Like item={post} liked={this.props.isLiked ? true : false} amountLike={this.props.amountLike} handleUpAmountLike={this.props.handleUpAmountLike} handleDownAmountLike={this.props.handleDownAmountLike}  handleLikePost={this.props.handleLikePost} data={this.props.match} />   }
                                <button onClick={this.handleFocusCmt} className="btn_comment"> <img src={comment} alt=""/> </button>
                        
                                <button className="btn_share"> <img src={share} alt=""/> </button>
                            </div>
                        <div className="info_detailTL">
                            <div className="author">
                                <Link to={post.authorID.email} className="author_name">{post.authorID.email}</Link>
                                {post.description}
                            </div>

                            <div className="likes">
                            {/* {
                                {/* ========================== User LIKES ==========================  */}
                                { post.likes.length === 0 ?
                                ! this.props.isLiked ?  <div className="like_first">
                                </div>
                                : <span className="user_other_like" onClick={this.handleShowLike}>1 like</span>
                                : ""
                                }
                    
                                {/* other User LIKES rest */}
                                {
                                    post.likes.length >= 1 &&
                                    <div className="other_like_list">
                                        {/* <span className="user_other_like" onClick={this.handleShowLike}>  { this.props.isLiked ? (post.likes.length - 1 ) + " others" :  (post.likes.length-2 === 0 ? "" :post.likes.length-2 + " others")  } </span> */}
                                        { <span className="user_other_like" onClick={this.handleShowLike}> { this.props.amountLike !== 0 ? this.props.amountLike + " like" : <span className="like_first">
                                </span> }  </span>}
                                    </div> 
        
                                }
        
        
                             {this.state.isShowUsersLike && <div className="wrapper_other_likes">
                                 <div className="header_other_likes">Likes</div>
                                 {
                                    post.likes.map(like => <div className="other_likes">
                                        
                                        <div className="user_nameAvatar">
                                            <Link to={`/${like.email}/`}>                  
                                                    <img className="avatar_like" src= {like.avatarUrl} alt=""/>
                                                    <span className="user_name">{ like.name}</span> 
                                            </Link>
                                        </div>
                                        <button className="btn_follow">Follow</button>
                                    </div>)
                                }
                                </div>}
        
                           </div>

                            {/* ==========================User COMMENTS ========================== */}
                          <div className="wrapper_commentTL">
                            {this.props.userCommented.map((cmt, index)=><div className="user_comment">
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
                            {/* {this.props.userCommentRest.length ? <Link  to={`/p/${post._id}`} className="user_cmt_rest">View All {this.props.userCommentRest.length} Comment</Link>: ''} */}
                            {this.props.userCommentRest.length ? <div onClick className="user_cmt_rest">View All {this.props.userCommentRest.length} Comment </div>: ''}
                            </div>
                            {/* ========================== btn like, cmt, share ==========================  */}
                        {/* DATE POST */}
                        <div className="date_postTL">
                            {moment(post.datePost).fromNow()}
                        </div>
                        <Comment data={this.props.match} indexItem={this.props.indexItem} handleComment={this.props.handleComment} isFocusCmt={this.state.isFocusCmt} />
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