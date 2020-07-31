import React, { Component } from 'react';
import loadingIcon from '../../image/loading.gif'
import './Profile.css'
import { Redirect, Link, Router, Route } from 'react-router-dom';
import axios from 'axios';
import Footer from '../../components/Footer'
import closeIcon from '../../image/close.svg'
import Loading from '../Loading/Loading'
import Comment from '../Comment/Comment'
import ProfileFriend from '../ProfileFriend/ProfileFriend'
import Menu from '../Menu/Menu'
export default class Profile extends Component{
    constructor(){
        super();
        this.state={
            users:[],
            usersLike:[],
            isShowUsersLike: false,
            isShowOverlay: false,
            loading: true,
            user_signed: {}
        }
        this.url = 'http://demo-express-codersx.herokuapp.com/api/users';
        this.url2 = 'http://localhost:3001/api/users';
        this.handleUserDetail = this.handleUserDetail.bind(this);
        this.handleUserDetailAuthor = this.handleUserDetailAuthor.bind(this); 
        this.isShowOverlay = this.isShowOverlay.bind(this);
        this.handleShowLike = this.handleShowLike.bind(this);
        this.handleUserLikeAll = this.handleUserLikeAll.bind(this);
        const info = JSON.parse( localStorage.getItem('info') );
 
    }
    componentDidMount(){
        const info = JSON.parse( localStorage.getItem('info') );
        if(info){
        }
        axios.get(this.url2, axios.defaults.headers.common['Authorization'] = info.accessToken)
            .then(res=> this.setState({users: res.data}) )
            .catch(err => console.log(err) );   

            // axios.get(this.url2+"/name/"+this.props.match.params.user_id, axios.defaults.headers.common['Authorization'] = info.accessToken)    
        axios.get(this.url2+"/name/"+this.props.match.params.user_id, axios.defaults.headers.common['Authorization'] = info.accessToken)    
            .then(res => {
                console.log('DA SET LOCAL VA STATE!!!: ',this.props.match.params.user_id )
                this.setState({loading: false, user_signed: res.data});
            })
            .catch(error => {
                this.setState({loading: false});
                console.log('USER SIGNED ERROR',error)
            })
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
    

    async handleUserDetailAuthor(id){
        try { 
            const info = JSON.parse( localStorage.getItem('info') );
            axios.defaults.headers.common['Authorization'] = info.accessToken;
            const res = await axios.get(this.url2+"/"+id);
            this.setState({loading: false});
        } catch (error) {
            this.setState({loading: false});
            console.log('USER SIGNED ERROR',error)
        }
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
  
    render(){
       
        const {match} = this.props;
        const info = JSON.parse( localStorage.getItem('info') );
        if(!info){
            return <Redirect to="/" />
        }
        console.log("RENDER, USER SIGNED:",this.state.user_signed);
        if(!this.isEmpty(this.state.user_signed))
        {
            console.log("USER SIGNED TRUE:",this.state.user_signed);
            if(this.state.user_signed.post.length){
                var postClone = [];
                var position = 0;
                if(this.props.match.params.id)
                    position = this.props.match.params.id - 1
                postClone.push( this.state.user_signed.post[position] );

                var imgPosted = this.state.user_signed.post.map((p,i) =>
                <div  className="article">
                    <Link to={`/p/${i+1}`}>
                            <img src = {p.imgPostUrl} />
                    </Link>
                </div>
                );
                
                var imgPostDetail = postClone.map( (post, i)=>
                    <div className="overlay">
                        <Link className="a_overlay" onClick={this.isShowOverlay} to={`/${this.state.user_signed.email}`}>
                            <Link onClick={this.isShowOverlay} to={`/${this.state.user_signed.email}`}>
                                <img className="close_post" src={closeIcon} alt=""/>
                            </Link>
                        </Link>
                        <div key={i} className="post_detail">
                        <div className="Img_posted">
                                <img src={post.imgPostUrl} alt=""/>
                        </div>
                            <div className="info_detail">
                                <div className="author">
                                    <img src={this.state.user_signed.avatarUrl} alt=""/>
                                    <span className="author_name">{this.state.user_signed.email}</span>
                                </div>
                                <hr/>

                                <div className="author">
                                    <img src={this.state.user_signed.avatarUrl} alt=""/>
                                    <span className="author_name">{this.state.user_signed.email}</span>
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
                    </div>)}
                    }
        console.log('PROPS MATCH',this.props.match.params.user_id, 'INFO USER: ', info.user.email)
        if(this.state.loading)
            return (<Loading/>)

        if(this.props.match.params.user_id){
            if(this.props.match.params.user_id !=  info.user.email){
                console.log("MATCH URL !== INFO USER MAIL");
                return  <Route exact path="/:user_id/" component= {ProfileFriend}  />
            }
        }

       
        return(   
            <div className="Profile">
            <Menu/>
                    <div className="container">
                        <div className="info_user">
                            <div className="avatar">
                                <Link to="/">
                                    <img src={this.state.user_signed.avatarUrl} alt=""/>
                                </Link>
                            </div>
                            <div className="info_user_detail">
                                <div className="user_name">
                                {this.state.user_signed.email}
                                </div>
                                <span className="amount_post">{this.state.user_signed.post.length}</span> posts
                                <div className="full_name">
                                    {this.state.user_signed.name}
                                </div>    
                            </div>
                       </div>
                    <hr/>

                    {/* nav post */}
                    <div className="wrapper_img_posted">
                        <div className="img_posted">
                            {imgPosted}
                        </div>
                    </div>
                   
                   
                    {this.props.match.params.id &&  imgPostDetail} 
                    </div>
                <Footer/>
                </div>
        );
        
    }
}
