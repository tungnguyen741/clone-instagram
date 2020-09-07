import React,{Component} from 'react'
import {Redirect} from 'react-router-dom'
import TimeLine from '../features/TimeLine/TimeLine'
import RenderPostImgTimeLine from '../features/Render/Render_Post_img_TimeLine'

export default class DefaultPage extends Component {
    render(){
  
      const info = JSON.parse( localStorage.getItem('info') );
        if(info){
        
        return (
            <div className="DefaultPage">
            
            {/* <p>{moment("Thu Jun 20 2020 16:00:41 GMT+0700 (Indochina Time)").format("MMMM DD, YYYY")}</p> 
            <p>{moment(moment("Thu Jun 20 2020 16:00:41 GMT+0700 (Indochina Time)").format("MMMM DD, YYYY")).fromNow()}</p> */}
            <RenderPostImgTimeLine 
              inputNameAvatar="imgPostUrl"
              urlApi={process.env.REACT_APP_URL_POST}
             />
            <TimeLine />
            
            </div>
        )
    }
    return <Redirect to="/" />  
  }
}
