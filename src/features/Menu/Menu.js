import React, { Component } from 'react';
import axios from 'axios'
import './Menu.css'
import classNames from 'classnames'
import logo_insta from '../../image/instagram-new-logo.png'
import {
    Link, Redirect, Route
  } from "react-router-dom";
import Profile from '../Profile/Profile'
import Loading from '../Loading/Loading'

export default class Menu extends Component{
    constructor(){
        super();
        this.url2 = 'http://localhost:3001/api/users';
        this.state={
            isShowToolBar: false,
            loading: false,
            isShowSearch: '',
            users_searched: [],
            users: [],
            input_value: ''
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
        axios.get(this.url2, 
        axios.defaults.headers.common['Authorization'] = info.accessToken)
        .then(res =>{    
            this.setState({users: res.data});
        })
        .catch(err => console.log(err.message));
    }
    showToolBar(){
        this.setState({isShowToolBar: !this.state.isShowToolBar})
    }
    handleLogout(){
        localStorage.removeItem("info");
    }
    
    handleFocusSearch(e){
        this.setState({isShowSearch: 'left'});
        if(e.target.value){
            this.setState({isShowSearch: 'hidden'})
        }   
    }
    handleBlurSearch(e){
        this.setState({isShowSearch: '', loading: false});
        if(e.target.value){
            this.setState({isShowSearch: 'hidden'})
        }
    }

    handleSearch_user(e){
         console.log('this.search_user.current.value ',this.search_user.current.value);
        
        if(e.target.value !== ''){
            this.setState({isShowSearch: 'hidden'})
            // this.setState({loading: true, input_value: e.target.value});
            const users_searched = this.state.users.filter(user =>  user.email.includes(this.search_user.current.value.trim()));
            console.log('users_searched.lengthhhhhhhhh: ',users_searched.length, 'e.target.value: ', e.target.value.trim());
            if(users_searched.length !== 0){
                this.setState({users_searched})
            } 

        }
        // const info = JSON.parse( localStorage.getItem('info') );
        // axios.get(this.url2+"/name/"+e.target.value, 
        // axios.defaults.headers.common['Authorization'] = info.accessToken)
        // .then(res =>{    
        //     this.setState({loading: false, users_searched: res.data});
        // })
        // .catch(err => console.log(err.message));
    }
    render(){
        // console.log('users_searched: ',this.state.users_searched);
        const info = JSON.parse( localStorage.getItem('info') );
        if(this.state.users_searched){
            const users_searched = [].concat(this.state.users_searched).map(user => <div className="users_searched">
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
                            <img src={logo_insta} alt=""/>
                        </Link>
                        </div>
                        <div className="search_user">
                            <input onFocus={this.handleFocusSearch} onBlur={this.handleBlurSearch} onChange={this.handleSearch_user} ref={this.search_user} type="text" name="user_name" />
                            <span className={classNames("placeSearch",{"changePlace": this.state.isShowSearch==='left'},  {'hiddenSearch': this.state.isShowSearch ==='hidden'})} >Search</span>
                        </div>
                        <div onClick={this.showToolBar} className="tool_bar">
                            <div className={classNames('ToolBar', {'showToolBar':this.state.isShowToolBar})}>
                                <Link className="menu_tool_profile" to={`/${info.user.email}`}>
                                    Profile
                                </Link>
                                <button className="menu_tool_logout" onClick={this.handleLogout}>Logout</button>
                        </div>
                            <img onClick={this.showToolBar} src={info.user.avatarUrl} alt=""/>
                        </div>
                        {this.state.loading && <Loading />}
                        
                        <div className="users_finded">
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