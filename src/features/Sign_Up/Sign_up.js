import React, { Component } from 'react';
import './Sign_up.css'
import Not_account from '../../components/Not_account';
import Get_app from '../../components/Get_app';
import Footer from '../../components/Footer';
import logo_fb_blue from '../../image/facebook-blue.svg'
import logo_insta from '../../image/instagram-new-logo.png'
import axios from 'axios'
import Loading from '../Loading/Loading'
import loadingIcon from '../../image/loading2.svg'
export default class Sign_up extends Component{
    constructor(){
        super();
        this.state={
            name:'',
            email:'',
            password: '',
            loading: false,
            successful: 'normal',
            err:''
        }
        this.sigup_account = this.sigup_account.bind(this);
        this.handleCheckValue = this.handleCheckValue.bind(this);
        this.url = 'http://demo-express-codersx.herokuapp.com/api/users';
        this.url2 = 'http://localhost:3001/api/users';
    }
    handleCheckValue(e){
        console.log([e.target.name])
        this.setState({[e.target.name]: e.target.value});
        
    }
    sigup_account(e){
        const {name, email, password, loading} = this.state;
 
        e.preventDefault();
        this.setState({loading: true});
        axios.post(process.env.REACT_APP_URL_USER,{ name, email, password})
            .then(res=>{
                this.setState({loading: false, successful: true});
            })
            .catch(err=>{
                this.setState({loading: false, successful: false, err: err.response.data});
               // this.setState({loading: false, successful: false });
            })
    }

    render(){
        return(
            <div className="Sign_up">
                <div className="wrapper_sign_up">
                    <div className="container">
                        <div className="content_sign_up ">
                            <div className="login">
                                <div className="sign-up-form">
                                <h1>
                                    <img src={logo_insta} alt=""/>
                                </h1>
                                    <p>Sign up to see photos and videos from your friends.</p>
                                    <div className="login-fb">
                                    <button className="btn-login-fb">
                                        <div className="logo-fb-blue"></div>
                                        <span className="login-fb">Log in with Facebook</span>
                                    </button>
                                    </div>
                                    <div className="line">
                                    <div className="line-through"></div>
                                        <span>OR</span>
                                    </div>
                                    <form onSubmit={this.sigup_account}>
                                        <input onChange={this.handleCheckValue} className="input_sign_up input_login" name="email" type="text" placeholder="Mobile number or Email"/>
                                        <input onChange={this.handleCheckValue} className="input_sign_up input_login" name="name" type="text" placeholder="Full Name"/>
                                        <input onChange={this.handleCheckValue} className="input_sign_up input_login" disabled="disabled" name="email" type="text" placeholder="Username"/>
                                        <input onChange={this.handleCheckValue} className="input_sign_up input_login" name="password" type="password" placeholder="Password"/>
                                        {this.state.loading && <Loading loadingIcon={loadingIcon} />}
                                        {this.state.successful===true && <div>Bạn đã đăng ký thành công</div>}
                                        {!this.state.successful && this.state.err}
                                        <button className="btn-login btn-signup"  >Sign up</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                            <div className="sign_up_not_account">
                                <Not_account btn_signUp="Log in">
                                    Have an account?
                                </Not_account>
                            </div>
                            <div className="sign_up_get_app">
                                <Get_app/>
                            </div>
                    </div>
                </div>
                <Footer/>
            </div>);
    }
}