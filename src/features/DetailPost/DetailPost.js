import React, { Component } from 'react';
import loadingIcon from '../../image/loading.gif'
import '../Profile/Profile.css'
import { Redirect, Link, Router, Route } from 'react-router-dom';
import axios from 'axios';
import Footer from '../../components/Footer'
import closeIcon from '../../image/close.svg'
import Loading from '../Loading/Loading'
import Comment from '../Comment/Comment'
import ProfileFriend from '../ProfileFriend/ProfileFriend'
import Menu from '../Menu/Menu'
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
            infoAuthor:{}
        }
        this.url = 'http://demo-express-codersx.herokuapp.com/api/users';
        this.url1 = 'http://localhost:3001/api/users';
        this.url2 = 'http://localhost:3001/api/post';
        this.handleUserDetail = this.handleUserDetail.bind(this);
 
        this.isShowOverlay = this.isShowOverlay.bind(this);
        this.handleShowLike = this.handleShowLike.bind(this);
        this.handleUserLikeAll = this.handleUserLikeAll.bind(this);
        const info = JSON.parse( localStorage.getItem('info') );
 
    }
    componentDidMount(){
        const info = JSON.parse( localStorage.getItem('info') );
         
        axios.get(this.url1, axios.defaults.headers.common['Authorization'] = info.accessToken)
            .then(res=> {
                this.setState({loading: false,users: res.data})

                axios.get(this.url2+"/"+this.props.match.params.id, axios.defaults.headers.common['Authorization'] = info.accessToken)    
                .then(res => {
                    console.log('DA SET LOCAL VA STATE!!!: ', res.data )
                    const infoAuthor = this.state.users.find(user=> user._id === res.data.authorID);
                    this.setState({loading: false, postDetail: res.data, infoAuthor});
                })
                .catch(error => {
                    this.setState({loading: false});
                    console.log('USER SIGNED ERROR',error)
                })
            } )
            .catch(err =>{
                this.setState({loading: false});
                 console.log(err) });   

       
    }


    handleUserDetail(id){
        return this.state.users.filter(user => user._id == id).map(user => 
            <div className="user_nameAvatar">
                <Link to={`/${user.email}/`}>                  
                        <img src= {user.avatarUrl} alt=""/>
                        <span className="user_name">{user.name}</span> 
                </Link>
              
            </div>
        );
    }
    handleUserLikeAll(id){
        return this.state.users.filter(user => user._id == id).map(user => 
            <div className="user_nameAvatar">
                <Link to={`/${user.email}/`}>                  
                        <img className="avatar_like" src= {user.avatarUrl} alt=""/>
                        <span className="like_by">Like by </span> 
                        <span className="user_name">{ user.name}</span> 
                </Link>
              
            </div>
        );
    }
    handleShowLike(){
        this.setState({isShowUsersLike: !this.state.isShowUsersLike});
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
        const {infoAuthor} = this.state; 
        const info = JSON.parse( localStorage.getItem('info') );
        if(!info){
            return <Redirect to="/" />
        }
        
            if(!this.isEmpty(this.state.postDetail)){
                
                console.log( 'postClone: ', [].concat(this.state.postDetail), '\n info author:', infoAuthor)
                var imgPostDetail = [].concat(this.state.postDetail).map( (post, i)=> <div>
                    <img src={post.imgPostUrl} alt=""/>
                     
                </div>)
                var imgPostDetail = [].concat(this.state.postDetail).map( (post, i)=>
                    <div className="overlay">
                        <Link className="a_overlay" onClick={this.isShowOverlay} to={`/${infoAuthor.email}`}>
                            <Link onClick={this.isShowOverlay} to={`/${infoAuthor.email}`}>
                                <img className="close_post" src={closeIcon} alt=""/>
                            </Link>
                            
                        </Link>
                        <div key={i} className="post_detail">
                        <div className="Img_posted">
                                <img src={post.imgPostUrl} alt=""/>
                        </div>
                            <div className="info_detail">
                                <div className="author">
                                    <img src={infoAuthor.avatarUrl} alt=""/>
                                    <span className="author_name">{infoAuthor.email}</span>
                                </div>
                                <hr/>

                                <div className="author">
                                    <img src={infoAuthor.avatarUrl} alt=""/>
                                    <span className="author_name">{infoAuthor.email}</span>
                                    {post.description}
                                </div>
                                {/* ========================== COMMENTS ========================== */}
                                {
                                    post.comments.map(cmt=><div className="wrapper_comment">
                                                { this.handleUserDetail(cmt.userCommented) }
                                                {cmt.textCommented}
                                    </div>)
                                }
                                {/* ========================== btn like, cmt, share ==========================  */}
                                <hr/>
                                <div className="btn_emoji">
                                    <button>Like</button>
                                    <button>Comment</button>
                                    <button>Share</button>
                                </div>
                                {/* ========================== LIKES ==========================  */}
                               <div className="likes">
                               {
                                    post.likes.slice(0,1).map(like=><div className="user_like">
                                        { this.handleUserLikeAll(like.userLiked) }
                                        
                                    </div>)
                                }
                                {
                                    post.likes.slice(1).map(likeAll => <div className="other_likes">
                                        <span>and</span> 
                                        <span className="user_other_like" onClick={this.handleShowLike}>{post.likes.length - 1} others</span>
                                        {this.state.isShowUsersLike && this.handleUserDetail(likeAll.userLiked)}
                                    </div>)
                                }
                               </div>
                                <hr/>
                            <Comment/>
                            </div>
                        </div>
                        
                    </div> 
 
                )
                   }
                
        if(this.state.loading)
            return (<Loading/>)

     

       
        return(   
                <div className="DetailPost">
                    <div className="container">
                     { imgPostDetail } 
                    </div>
  
                </div>
          
        );
        
    }
}
