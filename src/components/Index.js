import React from 'react'
import { Component } from 'react';
import classNames from 'classnames';
import Sign_in from '../features/Sign_In/Sign_in';
import Sign_up from '../features/Sign_Up/Sign_up';
import NotFound from './NotFound';
import Not_account from './Not_account'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useLocation
} from "react-router-dom";
import './Index.css'
import img_phone from '../image/img_slide_index1.png'
import img_1 from '../image/img_slide_index.jpg'
import img_2 from '../image/img_slide_index2.jpg'
import img_3 from '../image/img_slide_index4.jpg'
import img_4 from '../image/img_slide_index5.jpg'
import img_5 from '../image/img_slide_index6.jpg'
import logo_insta from '../image/instagram-new-logo.png'
import Get_app from './Get_app';
import Footer from './Footer';
import ProfileFriend from '../features/ProfileFriend/ProfileFriend'
import Profile from '../features/Profile/Profile'
import Menu from '../features/Menu/Menu'
import DetailPost from '../features/DetailPost/DetailPost'
import Post_img from '../features/Post_img/Post_img'

export default class Index extends Component{
    constructor(){
        super();
        this.state={
          slideImg: 1,
          img: img_1,
          isRedirect: false
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

      
  
      DefaultPage = ()=>{
        const info = JSON.parse( localStorage.getItem('info') );
        
        if(info){
          return (
            <div className="DefaultPage">
              <Post_img/>
            </div>
          )
        }
        return <Redirect to="/" />
        
      }
      
      render(){
       
        const info = JSON.parse( localStorage.getItem('info') );
        console.log(this.props.location);
        if(info){  
          return(
            <div className="Home">
              <Menu/>
                      <div className="signined">  
                        <Switch  >
                            <Route exact path="/" component={this.DefaultPage} />
                            <Route exact path="/:user_id/" component={Profile}/>     
                            {/* <Route location={"" || this.props.location} exact path="/:user_id/" 
                             render={(props) => <Profile {...props}/>}/> 
                             />      */}
                            <Route  exact path="/p/:id/"  render={(props) => <DetailPost {...props}/>} /> 
                        </Switch>
                        {/* {"" &&  <Route path="p/:id/"  render={(props) => <DetailPost {...props}/>} /> } */}
                      </div>
                      {/* {1 && <Route path="/p/:id/"  component={DetailPost}/>} */}
                      <Footer></Footer>
            </div> 
            )
          }
    
          return (
 
         <Switch>
          <Route exact path="/accounts/emailsignup" >
              <Sign_up/>
          </Route>
        
          <Route exact path="/" >
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
                                  <Sign_in/>
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
                          <Not_account btn_signUp="Sign up">
                            Don't have an account?
                          </Not_account>
                          <Get_app/>
                      </div>
                  </div>
              </div> 
            <Footer/>
            </div>
            </Route>
              <Route component={NotFound} />
            </Switch>
   
          );
        }
      }