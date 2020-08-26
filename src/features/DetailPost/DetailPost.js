import React, { Component } from 'react';
import loadingIcon from '../../image/loading.svg'
import './DetailPost.css'
import { Redirect, Link, Router, Route } from 'react-router-dom';
import axios from 'axios';
import Footer from '../../components/Footer'
import closeIcon from '../../image/close.svg'
import Loading from '../Loading/Loading'
import Comment from '../Comment/Comment'
import ProfileFriend from '../ProfileFriend/ProfileFriend'
import Menu from '../Menu/Menu'
import Like from '../Like/Like'
import comment from "../../image/comment.svg"
import share from "../../image/share.svg"
export default class DetailPost extends Component{
    constructor(){
        super();
        this.state={
            users:[],
            usersLike:[],
            isShowUsersLike: false,
            isShowOverlay: false,
            loading: true,
            user_signed: {},
            postDetail:[],
            infoAuthor:{},
            btn_like: false,
            isLiked: false,
            isFocusCmt: false,
            amountLike: 0,
            userCommented: ""
        }
        this.url = 'http://demo-express-codersx.herokuapp.com/api/users';
        this.url1 = 'http://localhost:3001/api/users';
        this.url2 = 'http://localhost:3001/api/post';
 
 
        this.isShowOverlay = this.isShowOverlay.bind(this);
        const info = JSON.parse( localStorage.getItem('info') );
 
    }
    componentDidMount(){
        const info = JSON.parse( localStorage.getItem('info') );
        axios.get(process.env.REACT_APP_URL_POST+"/"+this.props.match.params.id, axios.defaults.headers.common['Authorization'] = info.accessToken)    
        .then(res => {
            const u_isLiked = res.data.likes.find(item => item._id === info.user._id);
            this.setState({loading: false, postDetail: res.data, isLiked: u_isLiked, amountLike: res.data.likes.length, userCommented: res.data.comments});
        })
        .catch(error => {
            this.setState({loading: false});
            console.log('USER SIGNED ERROR',error)
        })       
    }
    handleFocusCmt = () => {
        this.setState({isFocusCmt: true})
    }

    handleLikePost = () => {
        //this.setState({btn_like : !this.state.btn_like})
        this.setState((prevState) => ({ isLiked: !prevState.isLiked  }))
    }

    handleUnlikePost = () => {
        this.setState({isLiked : true})
    }
    handleShowLike = () => {
        this.setState({isShowUsersLike: !this.state.isShowUsersLike});
    }
    handleUpAmountLike = () => {
        this.setState((prevState) => ({ amountLike: prevState.amountLike + 1  }))
    }
    handleDownAmountLike = () => {
        this.setState((prevState) => ({ amountLike: prevState.amountLike - 1  }))
    }

    handleComment = (item) => {
        this.setState((prevState)=> ({ userCommented: prevState.userCommented.concat(item) }))
    }

    handleDelComment = (item) => {
        let i = this.state.userCommented.indexOf(item);
        this.setState((prevState) => ({userCommented: prevState.userCommented.slice(0,i).concat(prevState.userCommented.slice(i+1) ) }));
        
    }

    isShowOverlay(){    
        this.setState({isShowOverlay: !this.state.isShowOverlay})
    }

    isEmpty(obj) {
        for(var prop in obj) {
          if(obj.hasOwnProperty(prop)) {
            return false;
          }
        }
      
        return JSON.stringify(obj) === JSON.stringify({});
      }
      back = e => {
        e.stopPropagation();
        this.props.history.goBack();
    }; 
    render(){
        const {match} = this.props;
      
        const info = JSON.parse( localStorage.getItem('info') );
        if(!info){
            return <Redirect to="/" />
        }

            if(!this.isEmpty(this.state.postDetail)){
                var imgPostDetail = [].concat(this.state.postDetail).map( (post, i)=> <div>
                    <img src={post.imgPostUrl} alt=""/>
                     
                </div>)
                var imgPostDetail = [].concat(this.state.postDetail).map( (post, i)=>
                
                    <div className="overlay">
               
                        <Link className="a_overlay" onClick={this.isShowOverlay} to={`/${post.authorID.email}`}>
                            <Link onClick={this.isShowOverlay} to={`/${post.authorID.email}`}>
                                <img className="close_post" src={closeIcon} alt=""/>
                            </Link>
              
                        </Link>
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

                                    this.state.userCommented.map(cmt=><div className="user_comment">
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
                                                    </div>
                                                </div>
                                                    <span className="delCmt" onClick={() => this.handleDelComment(cmt)} >...</span>
                                       
                                    </div>)
                                }
                                </div>
                                {/* ========================== btn like, cmt, share ==========================  */}
                                <hr/>
                                <div className="btn_emoji">
                                 {/*======== ISLIKED BY ME ========*/}
                                 { <Like liked={this.state.isLiked ? true : false} amountLike={this.state.amountLike} handleUpAmountLike={this.handleUpAmountLike} handleDownAmountLike={this.handleDownAmountLike}  handleLikePost={this.handleLikePost} data={this.props.match} />   }
                                    <button onClick={this.handleFocusCmt} className="btn_comment"> <img src={comment} alt=""/> </button>
                            
                                    <button className="btn_share"> <img src={share} alt=""/> </button>
                                </div>
                              


                           
                             
                               <div className="likes">
                               {/* {
                                {/* ========================== User LIKES ==========================  */}
                                { post.likes.length === 0 ?
                                   ! this.state.isLiked ?  <div className="like_first">
                                            Be the first to
                                            <Like liked={this.state.isLiked ? true : false} handleUpAmountLike={this.handleUpAmountLike} handleDownAmountLike={this.handleDownAmountLike}  handleLikePost={this.handleLikePost} data={this.props.match} />
                                </div>
                                : <span className="user_other_like " onClick={this.handleShowLike}>1 like</span>
                                : ""
                                }
                       
                                  {/* other User LIKES rest */}
                                {
                                    post.likes.length >= 1 &&
                                    <div className="other_like_list">
                                 
                                        {/* <span className="user_other_like" onClick={this.handleShowLike}>  { this.state.isLiked ? (post.likes.length - 1 ) + " others" :  (post.likes.length-2 === 0 ? "" :post.likes.length-2 + " others")  } </span> */}
                                        { <span className="user_other_like" onClick={this.handleShowLike}> { this.state.amountLike !== 0 ? this.state.amountLike + " like" : <span className="like_first">
                                            Be the first to
                                            <Like liked={this.state.isLiked ? true : false} handleUpAmountLike={this.handleUpAmountLike} handleDownAmountLike={this.handleDownAmountLike}  handleLikePost={this.handleLikePost} data={this.props.match} />
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
                            
                            <Comment data={this.props.match} handleComment={this.handleComment} isFocusCmt={this.state.isFocusCmt} />
                            </div>
                        </div>
                        
                    </div> 
 
                )
                   }
                
        // if(this.state.loading)
        //     return (<Loading loadingIcon={loadingIcon} />)

     

       
        return(   
                <div className="DetailPost">
                    <div className="container">
                     { imgPostDetail } 
                    </div>
                </div>
          
        );
        
    }
}
