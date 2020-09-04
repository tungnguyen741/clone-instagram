import React, { Component } from 'react';
import './Render_Post_img_Avatar.css'
import axios from 'axios'
import { Redirect } from 'react-router-dom';
import Loading from '../Loading/Loading'
import loadingIcon from '../../image/loading3.gif'
import alert from '../../image/alert.svg'
import photoIcon from "../../image/photo.svg"
import closeIcon from "../../image/close.svg"
import addIcon from "../../image/add.svg"
import close_gray from "../../image/close_gray.png"
export default class Render_Post_img_Avatar extends Component{
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
        // const {info} = this.props;
        const info = JSON.parse(localStorage.getItem('info'));
     
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
            this.setState({postSuccess: true, loading: false} );
            localStorage.setItem('info', JSON.stringify({...info, user: {...info.user, avatarUrl: res.data } }));
            this.props.handleChangeAvatar();
            this.props.handleShowPostAvatar();
            console.log(res.data, info)
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
        


        // const {info} = this.state;
        const info = JSON.parse(localStorage.getItem('info'));
        return(
           <div className="Post_img_avatar">
                <div className="overlay_avatar"></div>
           <div className="wrapper_Post_img_avatar">
           <h1>Cập nhật ảnh đại diện</h1>
           <hr/>
           <div onClick={this.props.handleShowPostAvatar} className="close_post">
            <img src={close_gray} alt=""/>
           </div>
          
           <form  encType="multipart/form-data">
               
                <label for="imgPostUrl" class="custom-file-upload_avatar">
                    <span className="plus">
                        <img src={addIcon} alt=""/>
                    </span>
                    <span>Tải ảnh lên</span>
                </label>
                {this.state.file && <div className="fileSelected">
                    {this.state.file.name} 
                    <div className="file_uploaded">
                        <img src={URL.createObjectURL(this.state.file)} alt="fileUploaded"/>
                        <div className="overlay_TL"></div>
                        <img src={closeIcon} onClick={this.closeImg} className="closeImg" />
                    </div>
                </div> }
                <input onChange={this.getFile} ref={this.file_img} id="imgPostUrl" type="file" name={this.props.inputNameAvatar} />
                <div className="btn_post">
                    <button disabled={ this.state.file && ! this.state.loading ? false : true} onClick={this.postImg} >
                        { this.state.loading ? <img className="loading" src={loadingIcon} alt=""/> : <div>Cập nhật</div> }
                    </button>
                </div>
                
            </form>
                { this.state.postSuccess === "failed" && <div className="fail_post">Something Wrong ! <img src={alert} alt="alert"/> </div> }
                 
                { this.state.postSuccess === true ? <div className="notification">Cập Nhật thành công</div> : "" }
           </div>
           </div>
          );
    }
}