import React, { Component } from 'react';
import loadingIcon from '../../image/loading.svg'
import '../ProfileFriend/ProfileFriend.css'
import { Redirect, Link, Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import Footer from '../../components/Footer'
import closeIcon from '../../image/close.svg'
import Loading from '../Loading/Loading'
import Comment from '../Comment/Comment'
import Menu from '../Menu/Menu'
import Profile from '../Profile/Profile';
import DetailPost from '../DetailPost/DetailPost'
export default class ProfileFriend extends Component{
    constructor(){
        super();
        this.state={
            users:[],
            usersLike:[],
            isShowUsersLike: false,
            isShowOverlay: false,
            loading: true,
            user_signed: {},
            postedOfAuthor: [],
            allPosted: []
        }
        this.url = 'http://demo-express-codersx.herokuapp.com/api/users';
        this.url2 = 'http://localhost:3001/api/users';
        this.url3 = 'http://localhost:3001/api/post';
    }
    async componentDidMount(){
        const info = JSON.parse( localStorage.getItem('info') );
         try {
             var user_signed = await axios.get(this.url2+"/name/"+this.props.match.params.user_id_friend, axios.defaults.headers.common['Authorization'] = info.accessToken);
             await this.setState({loading: false, user_signed: user_signed.data});
         } catch (error) {
            this.setState({loading: false});
            console.log('USER SIGNED ERROR',error)
         }
             
         try {
            var res = await axios.get(`${this.url3}/${this.state.user_signed._id}/author`);
            this.setState({loading: false, allPosted: res.data});
         } catch (error) {
            this.setState({loading: false});
            console.log('USER SIGNED ERROR',error)
         }
   
            
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

    async componentDidUpdate(prevProps) {
        const info = JSON.parse( localStorage.getItem('info') );
        if (this.props.location.pathname !== prevProps.location.pathname) {
            try {
                var res = await axios.get(this.url2+"/name/"+this.props.match.params.user_id_friend, axios.defaults.headers.common['Authorization'] = info.accessToken);
               await this.setState({loading: false, user_signed: res.data});
            } catch (error) {
               this.setState({loading: false});
               console.log('USER SIGNED ERROR',error)
            }
                
            try {
               var res = await axios.get(`${this.url3}/${this.state.user_signed._id}/author`);
               this.setState({loading: false, allPosted: res.data});
            } catch (error) {
               this.setState({loading: false});
               console.log('USER SIGNED ERROR',error)
            }
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
    render(){
        const {match} = this.props;
        const info = JSON.parse( localStorage.getItem('info') );
        console.log('111',this.state.user_signed._id);
        if(!info){
            return <Redirect to="/" />
        }
       
        console.log('222',this.state.allPosted);
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
                        <Link to={`/p/${p._id}`}>
                                <img src = {p.imgPostUrl} />
                        </Link>
                        
                    </div>
                );
               
                   }
                }
        if(this.state.loading)
            return (<Loading loadingIcon={loadingIcon}/>)
        
                    
          
        return(
            <div className="ProfileFriend">
               
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
                                <span className="amount_post">{this.state.allPosted.length}</span> posts
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
                    {this.props.match.params.id &&  DetailPost}
                    </div>
               
                </div> 
        );
    }
}
