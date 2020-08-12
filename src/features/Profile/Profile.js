import React, { Component } from 'react';
import loadingIcon from '../../image/loading.gif'
import './Profile.css'
import { Redirect, Link,  BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import Footer from '../../components/Footer'
import closeIcon from '../../image/close.svg'
import Loading from '../Loading/Loading'
import Comment from '../Comment/Comment'
import ProfileFriend from '../ProfileFriend/ProfileFriend'
import Menu from '../Menu/Menu'
import DetailPost from '../DetailPost/DetailPost' 
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
            posted:[],
            isShowDetail: true,
            postedOfAuthor:[]
        }
        this.url = 'http://demo-express-codersx.herokuapp.com/api/users';
        this.url2 = 'http://localhost:3001/api/users';
        this.url3 = 'http://localhost:3001/api/post';
        const info = JSON.parse( localStorage.getItem('info') );
        
    }
    componentDidMount(){
        const info = JSON.parse( localStorage.getItem('info') );
        //Get All User
        axios.get(this.url2, axios.defaults.headers.common['Authorization'] = info.accessToken)
            .then(res=> this.setState({users: res.data}) )
            .catch(err => console.log(err) );   

        //Get User detail by email in url
        axios.get(this.url2+"/name/"+this.props.match.params.user_id, axios.defaults.headers.common['Authorization'] = info.accessToken)    
            .then(res => {
                this.setState({loading: false, user_signed: res.data});
            })
            .catch(error => {
                this.setState({loading: false});
                console.log('USER SIGNED ERROR',error)
            })

        //Get All Post filter Post of author
        axios.get(this.url3)
            .then(res => {
                const postedOfAuthor = res.data.filter(post=> post.authorID == info.user._id)
                this.setState({loading: false, posted: res.data, postedOfAuthor});
            })
            .catch(error => {
                this.setState({loading: false});
                console.log('USER SIGNED ERROR',error)
            })
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
       
        console.log('postedOfAuthorpostedOfAuthorpostedOfAuthor',this.state.postedOfAuthor);
        if(!this.isEmpty(this.state.user_signed))
        {
            if(this.state.postedOfAuthor.length){
                var postClone = [];
                var position = 0;
                if(this.props.match.params.id)
                    position = this.props.match.params.id - 1
                postClone.push( this.state.user_signed.post[position] );

                var imgPosted = this.state.postedOfAuthor.map((p,i) =>
                    <div  className="article">
                        <Link to={`/p/${p._id}`}>
                                <img src = {p.imgPostUrl} />
                        </Link>
                        
                    </div>
                );
               
                   }
                }
        console.log('PROPS MATCH',this.props.match.params.user_id, 'INFO USER: ', info.user.email)
        if(this.state.loading)
            return (<Loading/>)

        if(this.props.match.params.user_id){
            if(this.props.match.params.user_id !=  info.user.email){
                console.log("MATCH URL !== INFO USER MAIL");
                return  <Route exact path="/:user_id_friend/" component= {ProfileFriend}  />
            }
        }
       console.log('LOCATION', this.props);
      
        return(   
          
            
                <div className="Profile">
             
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
                                <span className="amount_post">{this.state.postedOfAuthor.length}</span> posts
                                <div className="full_name">
                                    {this.state.user_signed.name}
                                </div>    
                            </div>
                       </div>
                   
                    
                        {/* nav post */}
                        <div className="wrapper_img_posted">
                        <hr/>
                            <div className="img_posted">
                                {imgPosted}
                            </div>
                        </div>

                       
                    </div>
               
                </div>
          
          );
        
    }
}
