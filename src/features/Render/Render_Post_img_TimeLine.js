import React, { Component } from 'react';
import './Render_Post_img_TimeLine.css'
import axios from 'axios'
import { Redirect } from 'react-router-dom';
import loadingIcon from '../../image/loading3.gif'
import alert from '../../image/alert.svg'
import photoIcon from "../../image/photo.svg"
import closeIcon from "../../image/close.svg"
export default class Render_Post_img_TimeLine extends Component{
    constructor(){
        super();
        this.file_img = React.createRef();
        this.text_description = React.createRef();
        this.state={
            file:'',
            description: '',
            postSuccess: false,
            loading: false,
            fontScale: false
        }
      
    }
 
    
    postImg = (evt)=>{
        evt.preventDefault();
        const info = JSON.parse( localStorage.getItem('info') );
      
     
        this.setState({loading: true});

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        const formData = new FormData();
 
        formData.append(this.props.inputNameAvatar, this.state.file);
        formData.append("description", this.state.description);
        formData.append("authorID", info.user._id);
        formData.append("datePost", Date.now());

        axios.post(this.props.urlApi, formData, config, axios.defaults.headers.common['Authorization'] = info.accessToken)
        .then( res => {
            this.setState({postSuccess: true, loading: false});
            console.log(res.data)
        })
        .catch(err => {
            
            this.setState({postSuccess: "failed", loading: false});
            console.log(err)
        })
    }

    getFile = (evt) => {
        evt.preventDefault();
 
     
        this.setState({
            file: evt.target.files[0],
        }) 
    }

    getText = (evt) => {
        evt.preventDefault();
    
        if(evt.target.value){
            this.setState({
                description: evt.target.value
            }) 
        }
    }
    handle_focus = () => {
        this.setState({fontScale: true})
    }
    handle_blur = () => {
        this.setState({fontScale: false})
    }
    closeImg = () => {
        this.setState({file: ''})
    }
    render(){
 
        if(this.state.postSuccess === "failed"){
            setTimeout(()=>{
                this.setState({postSuccess: false})
            }, 5000)
        }
 
        const info = JSON.parse( localStorage.getItem('info') );
        return(
           <div className="Post_img">
          
           
           { this.state.postSuccess === true && <Redirect to={`/${info.user.email}`} /> }
           <form  encType="multipart/form-data">
                <div className="description">
                    <img src={info.user.avatarUrl} alt="avatar"/>
                    <input onBlur={this.handle_blur} onFocus={this.handle_focus} className={this.state.fontScale ? "input_text_description fontScale" : "input_text_description"} ref={this.text_description} onChange={this.getText} type="text" name="description" placeholder={`${info.user.name} ơi, bạn đang nghĩ gì?`} />
                </div>
                <label htmlFor="imgPostUrl" className="custom-file-upload">
                    <img src={photoIcon} alt="icon_photo"/>
                    Ảnh
                </label>
                {this.state.file && <div className="fileSelected">
                    {this.state.file.name} 
                    <div className="file_uploaded">
                        <img src={URL.createObjectURL(this.state.file)} alt="fileUploaded"/>
                        <div className="overlay_TL"></div>
                        <img src={closeIcon} onClick={this.closeImg} className="closeImg" alt="close" />
                    </div>
                </div> }
                <input onChange={this.getFile} ref={this.file_img} id="imgPostUrl" type="file" name={this.props.inputNameAvatar} />
                <div className="btn_post">
                    <button disabled={ this.state.file && ! this.state.loading ? false : true} onClick={this.postImg} >
                        { this.state.loading ? <img className="loading" src={loadingIcon} alt=""/> : "Post" }
                    </button>
                </div>
                
            </form>
                { this.state.postSuccess === "failed" && <div className="fail_post">Something Wrong ! <img src={alert} alt="alert"/> </div> }
                 

           </div>
          );
    }
}