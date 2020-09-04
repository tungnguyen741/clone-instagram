import React from 'react'
import { Component } from 'react'
import axios from 'axios'
import moment from 'moment'
import DetailPost from '../DetailPost/DetailPost'
import Render_DetailPost from '../Render/Render_DetailPost_Profile'
import './TimeLine.css'
import Render_DetailPost_TimeLine from '../Render/Render_DetailPost_TimeLine'
export default class TimeLine extends Component{
    constructor(){
        super();
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
            .catch(err => console.log(err));
        }
        
    handleUnLikePost = () => {
        //let index = this.state.Liked.indexOf(item);
        let index = 1;
        //this.setState((prevState) => ({ Liked: [...prevState.Liked.slice(0, index), undefined, ...prevState.Liked.slice(index + 1)  ]  }))
        this.setState({ Liked: [...this.state.Liked.slice(0, index), !this.state.isLiked, ...this.state.Liked.slice(index + 1) ]  })
    }   
    
    handlelikePost = (item) => {
        //console.log("ITEM",item);
        let index = this.state.Liked.indexOf(item);
        console.log("like cai,", item)
        // const info = JSON.parse(localStorage.getItem("info"));
        //this.setState((prevState) => ({ Liked: [...prevState.Liked.slice(0, index), { _id: info.user._id}, ...prevState.Liked.slice(index + 1)  ]  }))
        // this.setState({ Liked: [...this.state.Liked.slice(0, index), !this.state.isLiked, ...this.state.Liked.slice(index + 1)  ]  })
        this.setState({isLiked: !this.state.isLiked})
    }
    handleUpAmountLike = (item) => {
        console.log("like caiamoutup,", item)
        let index = this.state.Liked.indexOf(item);
        this.setState((prevState) => ({ amountLike: [...prevState.amountLike.slice(0, index), item + 1,  ...prevState.amountLike.slice(index + 1)] }))
    }
    handleDownAmountLike = (item) => {
        console.log("like caiamoutDown,", item)
        let index = this.state.Liked.indexOf(item);
        this.setState((prevState) => ({ amountLike: [...prevState.amountLike.slice(0, index), item - 1,  ...prevState.amountLike.slice(index + 1)] }))
    }

    handleComment = (item) => {
        this.setState((prevState)=> ({ userCommented: prevState.userCommented.concat(item) }))
    }

    handleDelComment = (item) => {
        let i = this.state.userCommented.indexOf(item);
        this.setState((prevState) => ({userCommented: prevState.userCommented.slice(0,i).concat(prevState.userCommented.slice(i+1) ) }));
        
    }

    componentDidUpdate(props, a , b, c){
        console.log('did update time line: ', '\n\naaaa', a);
        // const info = JSON.parse(localStorage.getItem("info"));
        // axios.get(`${process.env.REACT_APP_URL_POST}/timeLine/date`)
        // .then(res => {
        //     this.setState((prevState) => ({
        //         dataTimeLine: res.data ,
        //         Liked: res.data.map(item => item.likes.find(like => like._id===info.user._id) ).map(item => item ? true : false ),
        //         amountLike: res.data.map(item => item.likes.length )
        //     }))
        //     })
        //     .catch(err => console.log(err));
    }


    render(){
        const {info}= this.props;
        // console.log(this.state.Liked[1], '\n',this.state.amountLike, '\n', this.state.dataTimeLine)
        return(
            <div className="TimeLine">
                 {this.state.dataTimeLine.map((item, index )=> <div>
                    <Render_DetailPost_TimeLine
                                        info={info} 
                                        postDetail={item} 
                                        userCommented={item.comments} 
                                        isLiked={ this.state.Liked[index] }
                                        amountLike={item.likes.length} 
                                        match={{params: {id: item._id}}}
                                        history={null}
                                        handleLikePost={this.handleLikePost}
                                        handleUpAmountLike={this.handleUpAmountLike}
                                        handleDownAmountLike={this.handleDownAmountLike}
                                        handleComment={this.handleComment}
                                        handleDelComment={this.handleDelComment}
                     />
       
                 </div>
                 )}
            </div>
        );
    }
}

