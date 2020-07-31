import React, { Component } from 'react';
import loadingIcon from '../../image/loading.gif'
import '../ProfileFriend/ProfileFriend.css'
import { Redirect, Link, Router, Route } from 'react-router-dom';
import axios from 'axios';
import Footer from '../../components/Footer'
import closeIcon from '../../image/close.svg'
import Loading from '../Loading/Loading'
import Comment from '../Comment/Comment'
import Menu from '../Menu/Menu'
import Profile from '../Profile/Profile';
export default class ProfileFriend extends Component{
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
        this.handleLogout = this.handleLogout.bind(this);
        this.handleShowLike = this.handleShowLike.bind(this);
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
                <Link to={`/${user.email}`}>
                    <img src= {user.avatarUrl} alt=""/>
                <span className="user_name">{user.name}</span> 
                </Link>
            </div>
        );
    }
    handleShowLike(){
        this.setState({isShowUsersLike: !this.state.isShowUsersLike});
    }
    handleLogout(){
        localStorage.removeItem("info");
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


    render(){
       
        const {match} = this.props;
        const info = JSON.parse( localStorage.getItem('info') );
        if(!info){
            return <Redirect to="/" />
        }
        console.log("RENDER, USER SIGNED:",this.state.user_signed);
        if( !(Object.keys(this.state.user_signed).length === 0 && this.state.user_signed.constructor === Object) )
        {
            console.log("USER SIGNED TRUE:",this.state.user_signed);
            if(this.state.user_signed.post.length){
                var postClone = [];
                var position = 0;
                if(this.props.match.params.id)
                    position = this.props.match.params.id - 1
                postClone.push( this.state.user_signed.post[position] );

                var imgPosted = this.state.user_signed.post.map((p,i) =>
                <div onClick={this.isShowOverlay}  className="article">
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
                                <button>Like</button>
                                <button>Comment</button>
                                <button>Share</button>
                                {/* ========================== LIKES ==========================  */}
                            
                                {
                                    post.likes.slice(0,1).map(like=><div className="user_like">
                                        { this.handleUserDetail(like.userLiked) }
                                        <span>Like by</span> 
                                        <span>and</span> 
                                    </div>)
                                }
                                {
                                    post.likes.slice(1).map(likeAll => <div>
                                        <span className="user_other_like" onClick={this.handleShowLike}>{post.likes.length - 1} others</span>
                                        {this.state.isShowUsersLike && this.handleUserDetail(likeAll.userLiked)}
                                    </div>)
                                }
                                <hr/>
                            <Comment/>
                            </div>
                        </div>
                    </div>)}
                    }
        if(this.state.loading)
            return (<Loading/>)
        
                    
        
        return(
            <div className="ProfileFriend">
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
                   
                    <button onClick={this.handleLogout}>Logout</button>
                    {this.props.match.params.id && imgPostDetail}
                    </div>
                <Footer/>
                </div>
        );
    }
}
