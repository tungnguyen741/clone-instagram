import React, {Component} from 'react';
import axios from 'axios';
import './Like.css'
import heart from "../../image/heart.svg"
import heartBlack from "../../image/heart_black.svg"
export default class Like extends Component {
    handleLikePost = async (e) => {
        e.preventDefault();
        const info = JSON.parse (localStorage.getItem('info') );
      
        this.props.handleUpAmountLike();
        this.props.handleLikePost();

        axios.post(`${process.env.REACT_APP_URL_POST}/${this.props.data.params.id}/like`, {
            "id_user_like": info.user._id
        })
        .catch();
    }
    handleUnlikePost = (e) => {
        e.preventDefault();
        const info = JSON.parse (localStorage.getItem('info') );
        this.props.handleDownAmountLike();
        this.props.handleLikePost();
        axios.post(`${process.env.REACT_APP_URL_POST}/${this.props.data.params.id}/unlike`, {
            "id_user_like": info.user._id
        })
        .catch();
    }
    render(){
       
        return(
            <div className="Like">
                <button className={ this.props.liked ?  "like" : "dislike" } onClick={this.props.liked ? this.handleUnlikePost : this.handleLikePost} ><img src={ this.props.liked ? heart : heartBlack} alt=""/></button>
            </div>
        );
    }
}