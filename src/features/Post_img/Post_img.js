import React, { Component } from 'react';
import './Post_img.css'
import loadingCat from '../../image/loadingCat.gif' 
import axios from 'axios'
import Loading from '../Loading/Loading'
import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';
import {Cloudinary, cloudinary} from 'cloudinary-core';
import { Redirect } from 'react-router-dom';

export default class Post_img extends Component{
    constructor(){
        super();
        this.url = "http://localhost:3001/api/post"
        this.file_img = React.createRef();
        //const cloudinaryCore = new cloudinary.Cloudinary({cloud_name: 'tungnguyen'});
        this.state={
            file:'',
            description: '',
            postSuccess: false,
            loading: false
        }
    }
 
    
    postImg = (evt)=>{
        evt.preventDefault();
        const info = JSON.parse( localStorage.getItem('info') );
        console.log('file in submit',this.state.file);
        const formData = new FormData();
        const data = {description: '12345',authorID: info.user._id};
        formData.append("imgPostUrl", this.state.file);
        formData.append("description", this.state.description);
        formData.append("authorID", info.user._id);
 
        this.setState({loading: true});

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        
        axios.post(this.url, formData, config)
        .then( res => {
            this.setState({postSuccess: true, loading: false});
            console.log(res.data);
            })
        .catch(err => {
            console.log(err)
            this.setState({postSuccess: "failed", loading: false});
        })
    }

    getFile = (evt) => {
        evt.preventDefault();
        console.log(evt.target.files[0])
        this.setState({
            file: evt.target.files[0],
        }) 
    }

    getText = (evt) => {
        evt.preventDefault();
        console.log(evt.target.value)
        this.setState({
            description: evt.target.value,
        }) 
    }

    render(){
        const info = JSON.parse( localStorage.getItem('info') );
        return(
           <h1 className="Post_img">
          
           { this.state.postSuccess === "failed" && <div>Post ko thanh cong</div> }
           { this.state.postSuccess === true && <Redirect to={`/${info.user.email}`} /> }
           <form  encType="multipart/form-data">
                <input onChange={this.getFile} ref={this.file_img} id="imgPostUrl" type="file" name="imgPostUrl" />
                <input onChange={this.getText} type="text" name="description" />
                <button disabled={this.state.loading ? true : false} onClick={this.postImg} >
                    POST DI
                </button>
                { this.state.loading &&  <img className="loading" src={loadingCat} alt=""/> }
            </form>
                 

           </h1>
          );
    }
}