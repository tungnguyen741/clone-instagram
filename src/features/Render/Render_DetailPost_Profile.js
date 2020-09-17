import React from 'react'
import { Component } from 'react';
import {Link} from 'react-router-dom';
import closeIcon from '../../image/close.svg'
import moment from 'moment'
import Like from '../Like/Like'
import comment from "../../image/comment.svg"
import share from "../../image/share.svg"
import Comment from '../Comment/Comment'
import io from 'socket.io-client'
import anotherLoading from '../../image/loading5.gif'
var socket;
export default class Render_DetailPost_Profile extends Component {
    constructor(){
        super();
        this.state={
            isShowUsersLike: false,
            isFocusCmt: false,
            isReFocusCmt: ''
        }
        socket = io(process.env.REACT_APP_URL_SOCKET); 
    }

    componentDidMount(){
        socket.on('sv-focus-inputCmt', data => {
            this.setState({isReFocusCmt: data})
        })
        socket.on('sv-stop-focus-inputCmt', data => {
            this.setState({isReFocusCmt: data})
        })
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
        if(!this.isEmpty(this.props.postDetail) ){
          
            var imgPostDetail = [].concat(this.props.postDetail).map( (post, i)=>
            <div className="overlay" key={i}>
            {/* {console.log(post.authorID)} */}
                    <div className="a_overlay" 
                        onClick={() => {this.props.history.goBack()} }>
                        <div>
                            <img onClick={() => {
                            this.props.history.goBack()
                        }} className="close_post_detail" src={closeIcon} alt=""/>
                        </div>
                    </div>
                    <div key={i} className="post_detail">
                    <div className="Img_posted">
                            <img src={post.imgPostUrl} alt=""/>
                    </div>
                        <div className="info_detail">
                            <div className="author">
                                <img src={post.authorID.avatarUrl} alt=""/>
                                <span className="author_name">{post.authorID.email}</span>
                            </div>
                            <hr/>
        
                            <div className="author">
                                <img src={post.authorID.avatarUrl} alt=""/>
                                <span className="author_name">{post.authorID.email}</span>
                                {post.description}
                            </div>
                            {/* ==========================User COMMENTS ========================== */}
                          <div className="wrapper_comment">
                            {
        
                                this.props.userCommented.map((cmt, i)=><div key={i} className="user_comment">
                                            <div className="user_nameAvatar">
                                                {cmt.userCommented ?
                                                <div className="avatar_content">
                                                    <Link to={`/${ cmt.userCommented.email }/`}>                  
                                                            <img src= {  cmt.userCommented.avatarUrl} alt=""/>    
                                                    </Link>
                                                    <div className="content_comment">
                                                        <Link to={`/${ cmt.userCommented.email }/`}>                
                                                                <span className="user_name">{ cmt.userCommented.name  }</span>                                                
                                                        </Link>
                                                            {cmt.textCommented}
                                                    </div>
                                                    {/* DATE comment */}
                                                </div>
                                                     :  <div className="avatar_content">
                                                    <div>
                                                                       
                                                            <img src='https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png' alt=""/>    
                                                    </div>
                                                    <div className="content_comment">
                                                        <div>
                                                     
                                                                <span className="user_name">Người dùng</span>                                                
                                                        </div>
                                                            {cmt.textCommented}
                                                    </div>
                                                    {/* DATE comment */}
                                                </div>
                                                }
                                            </div>
                                                <div className="date_comment">
                                                    { cmt.userCommented ? moment(cmt.dateComment).fromNow() : ''}
                                                </div>
                                                
                                                <span className="delCmt" onClick={() => this.props.handleDelComment(cmt)} >...</span>
                                   
                                </div>)
                                                
                            }
                            </div>
                            {/* ========================== btn like, cmt, share ==========================  */}
                            <hr/>
                            <div className="btn_emoji">
                             {/*======== ISLIKED BY ME ========*/}
                             { <Like liked={this.props.isLiked ? true : false} amountLike={this.props.amountLike} handleUpAmountLike={this.props.handleUpAmountLike} handleDownAmountLike={this.props.handleDownAmountLike}  handleLikePost={this.props.handleLikePost} data={this.props.match} />   }
                                <button onClick={this.handleFocusCmt} className="btn_comment"> <img src={comment} alt=""/> </button>
                        
                                <button className="btn_share"> <img src={share} alt=""/> </button>
                            </div>

                           <div className="likes">
                            {/* {
                                {/* ========================== User LIKES ==========================  */}
                                { post.likes.length === 0 ?
                                ! this.props.isLiked ?  <div className="like_first">
                                            Be the first to
                                            <Like liked={this.props.isLiked ? true : false} handleUpAmountLike={this.props.handleUpAmountLike} handleDownAmountLike={this.props.handleDownAmountLike}  handleLikePost={this.props.handleLikePost} data={this.props.match} />
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
                                            Be the first to
                                            <Like liked={this.props.isLiked ? true : false} handleUpAmountLike={this.props.handleUpAmountLike} handleDownAmountLike={this.props.handleDownAmountLike}  handleLikePost={this.props.handleLikePost} data={this.props.match} />
                                </span> }  </span>}
                                    </div> 
        
                                }
        
                             {this.state.isShowUsersLike && <div className="wrapper_other_likes">
                                 <div className="header_other_likes">Likes</div>
                                 {
                                    post.likes.map((like, i) => <div key={i} className="other_likes">
                                        
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
                        {/* DATE POST */}
                        {
                            this.state.isReFocusCmt==='focus_inputCmt' && <div className="another_cmt">
                                <img src={anotherLoading} alt="loading"/>
                                <span>ai đó đang nhập bình luận</span>
                            </div>
                        }  
                        <div className="date_post">
                            {moment(post.datePost).fromNow()}
                        </div>
                        <Comment handleFocusGetCmt={this.props.handleFocusGetCmt} data={this.props.match} handleComment={this.props.handleComment} isFocusCmt={this.state.isFocusCmt} />
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