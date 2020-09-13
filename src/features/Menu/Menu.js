import React, { Component } from 'react';
import axios from 'axios'
import './Menu.css'
import classNames from 'classnames'
import {Link, Redirect} from "react-router-dom";
import Loading from '../Loading/Loading'
import logo_insta from '../../image/instagram-new-logo.svg'
import profileIcon from '../../image/profile.svg'
import homeIcon from '../../image/home.svg'
import homeActiveIcon from '../../image/homeActive.svg'
import messIcon from '../../image/share.svg'
import messActiveIcon from '../../image/share_active.svg'
export default class Menu extends Component{
    constructor(){
        super();
    
        this.state={
            isShowToolBar: false,
            loading: false,
            isShowSearch: '',
            users_searched: [],
            users: [],
            input_value: '',
            isOnFocus: false,
            activeBtn: 'home',
            currentBtn: 'home'
        }
        this.search_user = React.createRef();
        this.showToolBar = this.showToolBar.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleSearch_user = this.handleSearch_user.bind(this);
        this.handleFocusSearch = this.handleFocusSearch.bind(this);
        this.handleBlurSearch = this.handleBlurSearch.bind(this);
    }

    componentDidMount(){
        const info = JSON.parse( localStorage.getItem('info') );
        
        
        axios.get(process.env.REACT_APP_URL_USER, 
        axios.defaults.headers.common['Authorization'] = info.accessToken)
        .then(res =>{    
            this.setState({users: res.data});
        })
        .catch(err => console.log(err.message));
    }
    showToolBar(){
        this.setState((prevState) => {
 
            return {
                prevBtn: prevState.activeBtn,
                isShowToolBar: !this.state.isShowToolBar, 
                activeBtn: !this.state.isShowToolBar ?  'profile' : this.state.prevBtn
        }})
    }

    handleChangeProfile = () => {
        this.setState({
            isShowToolBar: false, 
            activeBtn:'profile' 
        })
    }

    handleLogout(){
        this.showToolBar();
        localStorage.removeItem("info");
    }
    // this.setState({isOnFocus: true})
    handleFocusSearch(e){
        this.setState({isShowSearch: 'left', isOnFocus: false});
        if(e.target.value){
            this.setState({isShowSearch: 'hidden'})
        }
    }
    handleBlurSearch(e){

        this.setState({isShowSearch: '', loading: false});
        if(e.target.value){
            this.setState({isShowSearch: 'hidden'   })
        }
    }

    handleSearch_user(e){
        if(e.target.value !== ''){
            this.setState({isShowSearch: 'hidden'})
            // this.setState({loading: true, input_value: e.target.value});
            const users_searched = this.state.users.filter(user =>  user.email.includes(this.search_user.current.value.trim()));
        
            if(users_searched.length !== 0){
                this.setState({users_searched, input_value: e.target.value})
            } 

        }
    }
    handleChangeActiveBtn_mess = () => {
        this.setState({activeBtn: 'messenger'})
    } 
    handleChangeActiveBtn_home = () => {
        this.setState({activeBtn: 'home'})
    } 
 
    render(){
        // console.log('users_searched: ',this.state.users_searched);
 
        const {info} = this.props;
        if(this.state.users_searched){
             [].concat(this.state.users_searched).map(user => <div className="users_searched">
                {user.name}
                {user.email}
            </div> )
        }
        
        if(info){
            return(
      
                <div className="Menu">
                
                <div className="wrapper_menu">
                    <div className="Home_Page">

                        <Link to="/">
                            <img onClick={this.handleChangeActiveBtn_home} src={logo_insta} alt=""/>
                        </Link>
                        </div>
                        <div className="search_user">
                            <input autoComplete="off" onFocus={this.handleFocusSearch} onBlur={this.handleBlurSearch} onChange={this.handleSearch_user} ref={this.search_user} type="text" name="user_name" />
                            <span className={classNames("placeSearch",{"changePlace": this.state.isShowSearch==='left'},  {'hiddenSearch': this.state.isShowSearch ==='hidden'})} >Search</span>
                        </div>
                        <div className="tool_bar">
                            <div className={classNames('ToolBar', {'showToolBar':this.state.isShowToolBar})}>
                                <Link  onClick={this.handleChangeProfile} className="menu_tool_profile" to={`/${info.user.email}`}>
                                    <img src={profileIcon} alt="icon profile"/>
                                    Profile 
                                </Link>
                                <button className="menu_tool_logout" onClick={this.handleLogout}>Log Out</button>
                        </div>
 
                            <Link  onClick={this.handleChangeActiveBtn_home}  to='/'>
                                <img src={this.state.activeBtn==='home' ? homeActiveIcon : homeIcon} alt="messenger icon"/>
                            </Link>
                            <Link onClick={this.handleChangeActiveBtn_mess} to='/messages/t/'>
                                <img  src={this.state.activeBtn==='messenger' ? messActiveIcon : messIcon} alt="home button"/>
                            </Link>

                   
                            <img style={this.state.activeBtn==='profile' ? {border:"1px solid"} : {border:"0"}} onClick={this.showToolBar} src={info.user.avatarUrl} alt=""/>
                        </div>
                        {this.state.loading && <Loading />}
                        
                        
                        
                        <div className={classNames('users_finded', {"hidden":  this.state.isOnFocus})} >
                        { 
                          (this.state.users_searched).map(user => <div className="users_searched">
                                <Link to={`/${user.email}`} >
                                    <div className="user_avatar">
                                        <img src={user.avatarUrl} alt=""/>
                                    </div>
                                   <div className="user_info">
                                        <div className="user_name">
                                            {user.name}
                                        </div>
                                        <div className="user_email">
                                            {user.email}
                                        </div>
                                   </div>
                                </Link>
                            </div> )
                        }
                        </div> 
                
                </div>
                
            </div>
         
            );
        }else{
            return <Redirect to="/" />
        }
    }
}