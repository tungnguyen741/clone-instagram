import React, { Component } from 'react';
import './Sign_in.css'
import classNames from 'classnames'
import axios from 'axios'
import Index from '../../components/Index'
import { Router, Redirect, Route, Link } from 'react-router-dom';
import Loading from '../Loading/Loading'

export default class Sign_in extends Component{
    constructor(){
        super();
        this.state={
            disable: "disabled",
            user:'',
            pwd:'',
            type:'password',
            user_holder:"Phone number, username, or email",
            pass_holder:"Password",
            isPass: '',
            infoUser: {},
            token: '',
            loading: false
        }
        this.login_pwd = React.createRef();
        this.login_user = React.createRef();
        this.checkBtnLogin = this.checkBtnLogin.bind(this);
        this.check_user_pwd = this.check_user_pwd.bind(this);
        this.handle_show_pass = this.handle_show_pass.bind(this);
    }
    checkBtnLogin(){
        this.setState({
            user: this.login_user.current.value, pwd:this.login_pwd.current.value
        })
        if(this.login_pwd.current.value.length >= 5 && this.login_user.current.value !=="")
            this.setState({disable: ""})
        else
            this.setState({disable: "disabled"})
    }
    check_user_pwd(e){
        this.setState({loading: true});
        const url1 = 'http://localhost:3001/api/login'; 
        const url2 = 'http://demo-express-codersx.herokuapp.com/api/login';
        e.preventDefault();
        console.log(this.login_user.current.value, this.login_pwd.current.value)
        console.log(this.state.user, this.state.pwd)
        axios.post(url1,{
            "email": this.state.user,
            "password": this.state.pwd
        })
        .then(res=>{
            console.log('Dang nhap thanh cong', res);
            localStorage.setItem('info', JSON.stringify(res.data) )
            this.setState({isPass: true,loading: false, infoUser: res.data, token: res.token});
        })
        .catch(res=>{
            console.log('Dang nhap that bai', res);
            this.setState({isPass: false, loading: false})
        })
    }
    handle_show_pass(e){
        e.preventDefault();
            if(this.state.type === 'password'){
                this.setState({
                    type:'text'
                })
            }else{
                this.setState({
                    type:'password'
                })
            }
    }

    render(){
 
        return(
             <div className="Sign_in">
              
            {this.state.isPass && <Redirect to="/" />  }
            <form onSubmit={this.check_user_pwd}>
                
                <input className="input_login" ref={this.login_user} onChange={this.checkBtnLogin} name="email" type="text" />
                <span className= {classNames('input_holder','input_user_holder',{'user_holder_change': this.state.user})}>Phone number, username, or email</span>
                <input className="input_login input_login_pass" ref={this.login_pwd} onChange={this.checkBtnLogin}  name="password" type={this.state.type}  />
                <span className= {classNames('input_holder','input_pass_holder',{'pass_holder_change': this.state.pwd})}>Password</span>
                {
                    this.state.pwd !== ''  ? (this.state.type==='password' ? <a href="" onClick={this.handle_show_pass} className="show_pass">Show</a> : <a href="" onClick={this.handle_show_pass} className="show_pass">Hide</a>): ''
                }
                {
                    this.state.isPass===false && <p>The username you entered doesn't belong to an account. Please check your username and try again.</p>
                }
                {
                    this.state.loading && <Loading />
                }
                <button className={classNames("btn-login",{correct: this.state.disable===""})} disabled={this.state.disable} type="submit">Log In</button>
               
            </form>
             </div>
            
 
        );
    }
}