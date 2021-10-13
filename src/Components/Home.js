import React from 'react';
import ReactDOM from 'react-dom';

const Home=(props)=>{
    const clearColor='white';
    const polluterColor='aqua';
    const change_state_home=(event)=>{
        console.log(event.target.id)
       
        if(event.target.clear){
          event.target.clear=false;
          event.target.style.backgroundColor=polluterColor;
          console.log('clear change polluter')
        }else{
          event.target.clear=true;
          event.target.style.backgroundColor=clearColor;
          console.log('polluter change clear')
        }
      }
      console.log(props.keyed)
    return(
        <div className='Home' style={{width:(100/props.column)+'%',backgroundColor:clearColor}} id={props.key}  onClick={change_state_home}>

        </div>
    )

}
export default Home;