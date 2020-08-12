import React, { Component } from 'react';
import './Post_img.css'
 
import axios from 'axios'
import Loading from '../Loading/Loading'
import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';
import {Cloudinary, cloudinary} from 'cloudinary-core';

export default class Post_img extends Component{
    constructor(){
        super();
        this.url = "http://localhost:3001/api/post"
        this.file_img = React.createRef();
        //const cloudinaryCore = new cloudinary.Cloudinary({cloud_name: 'tungnguyen'});
        this.state={
            file:'',
            description: ''
        }
    }

    // SampleImg = () => (
    //     //<img src={this.cloudinaryCore.url('sample')} />
    // );
    
    postImg = (evt)=>{
        evt.preventDefault();
        const info = JSON.parse( localStorage.getItem('info') );
        console.log('file in submit',this.state.file);
        const formData = new FormData();
        const data = {description: '12345',
        authorID: info.user._id};
        formData.append("imgPostUrl", this.state.file);
        formData.append("description", this.state.description);
        formData.append("authorID", info.user._id);
 

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        
        axios.post(this.url, formData, config)
        .then( res =>{
             console.log(res);
             console.log('RES', res.data)
        })
        .catch(err => console.log(err))
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
        return(
           <h1 className="Post_img">
           <form  encType="multipart/form-data">
                <input onChange={this.getFile} ref={this.file_img} id="imgPostUrl" type="file" name="imgPostUrl" />
                <input onChange={this.getText} type="text" name="description" />
                <button onClick={this.postImg} >
                    POST DI
                </button>
            </form>
                 

           </h1>
          );
    }
}