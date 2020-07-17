import React from 'react'
import { Component } from 'react';
import classNames from 'classnames';

import './Index.css'
import img_phone from '../image/img_slide_index1.png'
import img_1 from '../image/img_slide_index.jpg'
import img_2 from '../image/img_slide_index2.jpg'
import img_3 from '../image/img_slide_index4.jpg'
import img_4 from '../image/img_slide_index5.jpg'
import img_5 from '../image/img_slide_index6.jpg'
import logo_insta from '../image/instagram-new-logo.png'
import logo_fb from '../image/facebook.svg'
import logo_appstore from '../image/appstore.png'
import logo_chplay from '../image/chplay.png'

export default class Index extends Component{
    constructor(){
        super();
        this.state={
          slideImg: 1,
           img: img_1
        }
        this.changeImg = this.changeImg.bind(this);
        setInterval(()=>{
          this.changeImg(this.state.img);
        }, 3500);
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
    
      render(){
         
        return (
          <div className="Index">
            <div className="container">
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
                              <form action="" method="">
                                <input className="input_login" name="user_login" type="text" placeholder="Phone number, username, or email"/>
                                <input className="input_login" name="password" type="password" placeholder="Password"/>
                                <button className="btn-login" disabled="disabled">Log In</button>
                              </form>
                              <div className="line">
                                <div className="line-through"></div>
                                  <span>OR</span>
                              </div>
                              <div className="login-fb">
                                <button className="btn-login-fb">
                                  <img src={logo_fb} className="logo-fb" alt=""/>
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
                        <div className="have-account">
                            <span>Don't have an account?</span>
                            <button className="btn-sign-up">Sign up</button>
                        </div>
                        <div className="app-download">
                            Get the app.
                        </div>
                            <div className="img_app">
                              <div className="img-app-store">
                                <img src={logo_appstore} alt=""/>
                              </div>
                              <div className="img-ch-play">
                                <img src={logo_chplay} alt=""/>
                              </div>
                            </div>
                    </div>
                   
                </div>
            </div> 
          </div>
          );
        }
}