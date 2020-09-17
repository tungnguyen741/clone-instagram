import React, { Component } from 'react';
import './DetailPost.css'
import {Redirect} from 'react-router-dom'
import axios from 'axios';
import RenderPostDetail from "../Render/Render_DetailPost_Profile"
import io from 'socket.io-client'

var socket;
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
            userCommented: "",
            newCmt: '',
            
        }
        socket = io(process.env.REACT_APP_URL_SOCKET); 
   
    }
    componentDidMount(){
        
        const info = JSON.parse( localStorage.getItem('info') );
        axios.get(`${process.env.REACT_APP_URL_POST}/${this.props.match.params.id}`, axios.defaults.headers.common['Authorization'] = info.accessToken)    
        .then(res => {
            const u_isLiked = res.data.likes.find(item => item._id === info.user._id);
            this.setState({loading: false, postDetail: res.data, isLiked: u_isLiked, amountLike: res.data.likes.length, userCommented: res.data.comments});
           
        })
        .catch(error => {
            this.setState({loading: false});
            console.log('USER SIGNED ERROR',error)
        })       
        socket.on('sv-comment', data => {
            this.setState( (prevState) => ({ userCommented: prevState.userCommented.concat(data ? data : ''),}))
        })
      
    }
 
    handleLikePost = () => {
        //this.setState({btn_like : !this.state.btn_like})
        this.setState((prevState) => ({ isLiked: !prevState.isLiked  }))
    }

    handleUnlikePost = () => {
        this.setState({isLiked : true})
    }
    handleUpAmountLike = () => {
        this.setState((prevState) => ({ amountLike: prevState.amountLike + 1  }))
    }
    handleDownAmountLike = () => {
        this.setState((prevState) => ({ amountLike: prevState.amountLike - 1  }))
    }
    //when haven't socket io
    // handleComment = (item) => {
    //     this.setState( (prevState) => ({ userCommented: prevState.userCommented.concat(this.state.newCmt  ) }))
    // }  

    handleDelComment = (item) => {
        let i = this.state.userCommented.indexOf(item);
        this.setState((prevState) => ({userCommented: prevState.userCommented.slice(0,i).concat(prevState.userCommented.slice(i+1) ) }));    
    }
   
    handleFocusGetCmt = (data) => {
        
    }
       
    render(){
        const info = JSON.parse( localStorage.getItem('info') );
        if(!info){
            return <Redirect to="/" />
        }
     

        return(   
                <div className="DetailPost">
                    <div className="container">
                        <RenderPostDetail postDetail={this.state.postDetail} 
                                        userCommented={this.state.userCommented} 
                                        isLiked={this.state.isLiked}
                                        amountLike={this.state.amountLike} 
                                        match={this.props.match}
                                        history={this.props.history}

                                        handleLikePost={this.handleLikePost}
                                        handleUnlikePost={this.handleUnlikePost}
                                        handleUpAmountLike={this.handleUpAmountLike}
                                        handleDownAmountLike={this.handleDownAmountLike}
                                        handleComment={this.handleComment}
                                        handleDelComment={this.handleDelComment}
                                        handleFocusGetCmt={this.handleFocusGetCmt}
                        />
                    </div>
                </div>
          
        );
        
    }
}
