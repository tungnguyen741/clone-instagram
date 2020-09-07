import React, { Component } from 'react';
import loadingIcon from '../../image/loading2.svg'
import './Profile.css'
import { Redirect, Link,  BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import Footer from '../../components/Footer'
import closeIcon from '../../image/close.svg'
import cameraIcon from '../../image/photography.png'
import Loading from '../Loading/Loading'
import Comment from '../Comment/Comment'
import Render_Post_img_Avatar from '../Render/Render_Post_img_Avatar'
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
            user_signed: {},
            allPosted:[],
            isShowDetail: true,
            postedOfAuthor:[],
            isShowPostAvatar: false
        }
 
    }
   componentDidMount(){
        const info = JSON.parse( localStorage.getItem('info') );
        //Get User detail by email in url
        axios.get(process.env.REACT_APP_URL_USER+"/name/"+this.props.match.params.user_id, axios.defaults.headers.common['Authorization'] = info.accessToken)    
            .then(res => {
                this.setState({loading: false, user_signed: res.data});
            })
            .catch(error => {
                this.setState({loading: false});
                // console.log('USER SIGNED ERROR',error)
            })

        //Get All Post filter Post of author
        axios.get(`${process.env.REACT_APP_URL_POST}/${this.props.match.params.user_id}/author`, axios.defaults.headers.common['Authorization'] = info.accessToken)    
            .then(res => {
                // console.log('allPosted of users PR', res.data)
                this.setState({loading: false, allPosted: res.data});
            })
            .catch(error => {
                this.setState({loading: false});
            })
    }
    
      componentDidUpdate( ) {
 
        const info = JSON.parse( localStorage.getItem('info') );
        if (this.props.location.pathname !== `/${this.state.user_signed.email}`) {
            axios.get(process.env.REACT_APP_URL_USER+"/name/"+this.props.match.params.user_id, axios.defaults.headers.common['Authorization'] = info.accessToken)    
            .then(res => {
                this.setState({loading: false,user_signed: res.data});
            })
            .catch();

        //Get All Post filter Post of author
        axios.get(`${process.env.REACT_APP_URL_POST}/${this.props.match.params.user_id}/author`, axios.defaults.headers.common['Authorization'] = info.accessToken)    
            .then(res => {
                // console.log('allPosted of users PR', res.data)
                this.setState({loading: false, allPosted: res.data});
            })
            .catch( );
        }
    }
    isEmpty(obj) {
        for(var prop in obj) {
          if(obj.hasOwnProperty(prop)) {
            return false;
          }
        }
        return JSON.stringify(obj) === JSON.stringify({});
      }
   
    handleShowPostAvatar = () => {
        this.setState({isShowPostAvatar: !this.state.isShowPostAvatar})
    }

    handleChangeAvatar = () => {
        const info = JSON.parse(localStorage.getItem('info'));
        this.setState({user_signed: {...this.state.user_signed, avatarUrl: info.user.avatarUrl} });
    }
    render(){
         
        // const {match, info} = this.props;
        const {match} = this.props;
        const info = JSON.parse(localStorage.getItem('info'));
    
        if(!info){
            return <Redirect to="/" />
        }
       
        //console.log('postedOfAuthorpostedOfAuthorpostedOfAuthor',this.state.postedOfAuthor);
        if(!this.isEmpty(this.state.user_signed))
        {
            if(this.state.allPosted.length){
                var postClone = [];
                var position = 0;
                if(this.props.match.params.id)
                    position = this.props.match.params.id - 1
                postClone.push( this.state.allPosted[position] );

                var imgPosted = this.state.allPosted.map((p,i) =>
                    <div  className="article">
                        <Link to={{
                            pathname: `/p/${p._id}`,
                            state: { from: this.props.pathname  }
                        }}>
                                <img src = {p.imgPostUrl} />
                        </Link>
                        
                    </div>
                );
               
                   }
                }
 
        if(this.state.loading)
            return (<Loading loadingIcon={loadingIcon} />)
 
  
        return(   
                <div className="Profile">
                    <div className="container">
                        <div className="info_user">
                            <div className="avatar">
                                <span className="avatar_img">
                                    <img src={this.state.user_signed.avatarUrl} alt=""/>
                                    {this.props.match.params.user_id === info.user.email && <div onClick={this.handleShowPostAvatar} className="showPostImg">
                                        <img src={cameraIcon} alt=""/>
                                        <div className="update"> Cập nhật</div>
                                    </div>}   
                                </span>
                            </div>
                          
                            <div className="info_user_detail">
                                <div className="user_name">
                                {this.state.user_signed.email}
                                </div>
                                <div className="wrapper_amount_post">
                                    <span className="amount_post">{this.state.allPosted.length}</span> posts
                                </div>
                                <div className="full_name">
                                    {this.state.user_signed.name}
                                </div>    
                            </div>
                       </div>
                   
                    
                        {/* nav post */}
                        <div className="wrapper_img_posted">
      
                            <div className="img_posted">
                                {imgPosted} 
                            </div>
                        </div>
                    </div>
                    {this.state.isShowPostAvatar && 
                                    <Render_Post_img_Avatar
                                        info={info}
                                        inputNameAvatar="avatar"
                                        urlApi={`${process.env.REACT_APP_URL_USER}/${info.user._id}/avatar`}
                                        handleChangeAvatar={this.handleChangeAvatar}
                                        handleShowPostAvatar={this.handleShowPostAvatar}
                                    />}
                </div>
          );
        
    }
}
