import React from 'react'
import { Component } from 'react'
import axios from 'axios'
import './TimeLine.css'
import RenderDetailPostTimeLine from '../Render/Render_DetailPost_TimeLine'
export default class TimeLine extends Component{
    constructor(props){
        super(props);
        this.state= {
            dataTimeLine: [],
            isLiked: false,
            Liked: [],
            amountLike:[]
        }
        
    }
    componentDidMount(){
        const info = JSON.parse(localStorage.getItem("info"));
        axios.get(`${process.env.REACT_APP_URL_POST}/timeLine/date`)
        .then(res => {
            this.setState({
                dataTimeLine: res.data ,
                Liked: res.data.map(item => item.likes.find(like => like._id===info.user._id) ).map(item => item ? true : false ),
                amountLike: res.data.map(item => item.likes.length )
            })
            })
            .catch();
        }
        
    handleUnLikePost = (item) => {
        //let index = this.state.Liked.indexOf(item);
        let index = this.state.dataTimeLine.indexOf(item);
        //this.setState((prevState) => ({ Liked: [...prevState.Liked.slice(0, index), undefined, ...prevState.Liked.slice(index + 1)  ]  }))
        this.setState({ Liked: [...this.state.Liked.slice(0, index), !this.state.Liked[index], ...this.state.Liked.slice(index + 1) ]  })
    }   
    
    handlelikePost = (item) => {
        let index = this.state.dataTimeLine.indexOf(item);
        this.setState({ Liked: [...this.state.Liked.slice(0, index), !this.state.Liked[index], ...this.state.Liked.slice(index + 1)  ]  })
    }
    handleUpAmountLike = (item) => {
        let index = this.state.dataTimeLine.indexOf(item);
        this.setState((prevState) => ({ amountLike: [...prevState.amountLike.slice(0, index), prevState.amountLike[index] + 1,  ...prevState.amountLike.slice(index + 1)] }))
    }
    handleDownAmountLike = (item) => {
        let index = this.state.dataTimeLine.indexOf(item);
        this.setState((prevState) => ({ amountLike: [...prevState.amountLike.slice(0, index), prevState.amountLike[index] - 1,  ...prevState.amountLike.slice(index + 1)] }))
    }
    
    handleComment = (item, index) => {
        this.setState({ dataTimeLine: [...this.state.dataTimeLine.slice(0, index), {...this.state.dataTimeLine[index], comments: this.state.dataTimeLine[index].comments.concat(item)} ,...this.state.dataTimeLine.slice(index + 1) ] })
    }
    
    handleDelComment = (index) => {
        this.setState({ dataTimeLine: [...this.state.dataTimeLine.slice(0, index), ...this.state.dataTimeLine.slice(index + 1) ] })
    }

    render(){
        return(
            <div className="TimeLine">
                 {this.state.dataTimeLine.map((item, index )=> 
                 <RenderDetailPostTimeLine
                        key={index}
                        postDetail={item} 
                        userCommented={item.comments.slice(0,5)} 
                        userCommentRest={item.comments}
                        amountLike={this.state.amountLike[index]} 
                        isLiked={ this.state.Liked[index] }
                        indexItem={index}
                        match={{params: {id: item._id}}}
                        history={null}
                        handleLikePost={() => this.handlelikePost(item)}
                        handleUpAmountLike={() => this.handleUpAmountLike(item)}
                        handleDownAmountLike={() => this.handleDownAmountLike(item)}
                        handleComment={this.handleComment}
                        handleDelComment={this.handleDelComment}
                     />
                 )}
            </div>
        );
    }
}

