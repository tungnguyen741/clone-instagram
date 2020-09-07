import React from 'react'
import { Component } from 'react';
import classNames from 'classnames';
import {
  Switch,
  Route
} from "react-router-dom";
import './Index.css'

import SignIn from '../features/Sign_In/Sign_in';
import SignUp from '../features/Sign_Up/Sign_up';
import NotFound from './NotFound';
import NotAccount from './Not_account'
import GetApp from './Get_app';
import Footer from './Footer';
import Profile from '../features/Profile/Profile'
import Menu from '../features/Menu/Menu'
import DetailPost from '../features/DetailPost/DetailPost'

import DefaultPage from './DefaultPage'

import "./responsive.css"
import img_phone from '../image/img_slide_index1.png'
import img_1 from '../image/img_slide_index.jpg'
import img_2 from '../image/img_slide_index2.jpg'
import img_3 from '../image/img_slide_index4.jpg'
import img_4 from '../image/img_slide_index5.jpg'
import img_5 from '../image/img_slide_index6.jpg'
import logo_insta from '../image/instagram-new-logo.png'

export default class Index extends Component{
  constructor(){
        super();
        this.state={
          slideImg: 1,
          img: img_1,
          isRedirect: false,
          info: JSON.parse( localStorage.getItem('info') )
        }
        setInterval(()=>{
          this.changeImg(this.state.img);
        }, 3500);
        this.changeImg = this.changeImg.bind(this);
        
      } 
      
      changeImg(img){
        if(img === img_1)
        this.setState({img: img_2, slideImg: 2})
        if(img === img_2)
        this.setState({img: img_3,  slideImg: 3})
        if(img === img_3)
        this.setState({img: img_4,  slideImg: 4})
        if(img === img_4)
        this.setState({img: img_5,  slideImg: 5})
        if(img === img_5)
        this.setState({img: img_1,  slideImg: 1})
      }
      
      changeAvatar = (res) => {
        // const {info}= this.state;
        const info = JSON.parse( localStorage.getItem('info') );
        this.setState({info : {...info, user: {...info.user, avatarUrl: res } }})
      }
      
      
        
        render(){
          // const {info}= this.state;
          const info = JSON.parse( localStorage.getItem('info') );
       
        if(info){  
          return(
            <div className="Home">
              <Menu info={info} />
                  
                      <div className="signined">  
                        <Switch>
                            <Route exact path={['/clone-instagram','/']} render={ (props) => <DefaultPage {...props} info={info} /> } />
                            <Route exact path={['/p/:id/',"/clone-instagram/p/:id/"]}  render={ (props) => <DetailPost  {...props} info={info} /> } /> 
                            <Route path={["/clone-instagram/:user_id/", '/:user_id/']} render={ (props) => <Profile {...props}/> }  info={info} /> 
                        </Switch>
                      </div>
                      <Footer></Footer>
            </div> 
            )
          }
          
          return (
            <Switch>
            
          <Route exact path={['/accounts/emailsignup',"/clone-instagram/accounts/emailsignup"]}>
              <SignUp/>
          </Route>
        
          <Route  exact path={['/clone-instagram','/']}>
            <div className="Index">
              
                  <div className="wrapper_content">

                      <div className="phone_slide">
                          <img src={img_phone} alt=""/>  
                          <div className="beside-phone-slide">
                              <img src={img_1} className={classNames('img-slide','hide',{'show': this.state.slideImg===1})} alt=""/>
                              <img src={img_2} className={classNames('img-slide','hide',{'show': this.state.slideImg===2})} alt=""/>
                              <img src={img_3} className={classNames('img-slide','hide',{'show': this.state.slideImg===3})} alt=""/>
                              <img src={img_4} className={classNames('img-slide','hide',{'show': this.state.slideImg===4})} alt=""/>
                              <img src={img_5} className={classNames('img-slide','hide',{'show': this.state.slideImg===5})} alt=""/>
                          </div>
                      </div>

                      <div className="wrapper_login">
                            <div className="login">
                              <div className="content-login">
                                <h1><img src={logo_insta} alt=""/></h1>
                                  <SignIn/>
                                <div className="line">
                                  <div className="line-through"></div>
                                    <span>OR</span>
                                </div>
                                <div className="login-fb">
                                  <button className="btn-login-fb">
                                    <div className="logo-fb"></div>
                                    <span className="login-fb">Log in with Facebook</span>
                                  </button>
                                </div>
                                <div className="forgot-password">
                                  <button className="forgot-pass">
                                      Forgot password?
                                  </button>
                                </div>
                              </div>
                            </div>
                          <NotAccount link="clone-instagram/accounts/emailsignup" btn_signUp="Sign up">
                            Don't have an account?
                          </NotAccount>
                          <GetApp/>
                      </div>
                  </div>
              </div> 
            <Footer/>
            
            </Route>
              <Route component={NotFound} />
            </Switch>
   
          );
        }
      }
 