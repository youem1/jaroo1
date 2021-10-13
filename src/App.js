import logo from './logo.svg';
import './App.css';
import React,{useState} from 'react';

 function App() {
  const [row,setRow]=useState(0);
  const [column,setColumn]=useState(0);
  let rowContent =[] ;
  let columnContent=[];
  let stateHomes=[];
  let onRobot=false;
  const [enteredRowRobot,setEnteredRowRobot]=useState(0);
  const [enteredColumnRobot,setEnteredColumnRobot]=useState(0);
  let location=((enteredRowRobot-1)*column)+(enteredColumnRobot*1);
  let firstLocation=location;
  let moveRight=true;
  let moveBack=false;
  let leftHomes=false;





  const set_dimension=()=>{
    const enteredRow=document.getElementById('row-App').value;
    const enteredColumn=document.getElementById('column-App').value;
    setRow(enteredRow);
    setColumn(enteredColumn);
    setEnteredColumnRobot(document.getElementById('columnRobot-App').value);
    setEnteredRowRobot(document.getElementById('rowRobot-App').value);
    
    
  }

  const change_state_home=(event)=>{
    if(stateHomes[event.target.id]==true){
      
      console.log(event.target.id)
      document.getElementById(event.target.id).className='polluter';
      console.log(document.getElementById(event.target.id).className)
      console.log('clear change polluter')
      stateHomes[event.target.id]=false;
    }else{
      stateHomes[event.target.id]=true;
      document.getElementById(event.target.id).className='home-App';
      console.log('polluter change clear')
    }
    
  }

  let [repeet,setRepeet]=useState(false);
  const set_howWork=()=>{
    setRepeet(!repeet);
  }
  



  let counter=0;

  for(let i=0;i<row;i++){
    columnContent[i]=[];
    
      for(let j=0;j<column;j++){
        stateHomes[counter]=true;
        columnContent[i][j]=(<div style={{width:(100/column)+'%'}} className='homes-App' id={counter++}  onClick={change_state_home}   >({i+1},{j+1})<br/> id:{counter-1}</div>)
      }
    
    rowContent.push(<div style={{height:(83/row)+'vh',minWidth:'25px'}} className='rows-App'>{columnContent[i]}</div>); 
}

let text='';
 


const cleaning =()=>{
  
  
  stateHomes[location]=true;
  document.getElementById(location.toString()).className='home-App';
  
  move_robot();





}
const scaning=()=>{
  document.getElementById(location.toString()).innerHTML='<div id="robot"><div/>'
  
  
  if(stateHomes[location]==false){
    console.log('clean here:'+location)
    setTimeout(cleaning,1000)
    

  }else{

    console.log('no polluter')
    move_robot()
   

  }
  
}

const move_right_noscaning=()=>{
  location+=1;
  console.log('locati0on is R:'+location);
  text=document.getElementById(location.toString()).innerHTML;
  document.getElementById((location).toString()).innerHTML='<div id="robot"></div>';
  setTimeout(move_robot,500);

  


}
const move_up_noscaning=(i)=>{
  location-=column;
  console.log('locati0on is Un:'+location)
  text=document.getElementById(location.toString()).innerHTML;
  document.getElementById((location).toString()).innerHTML='<div id="robot"></div>';
  move_robot();

}
const move_left_noscaning=(i)=>{
  location-=1;
  console.log('locati0on is L:'+location)
  text=document.getElementById(location.toString()).innerHTML;
  document.getElementById((location).toString()).innerHTML='<div id="robot"></div>';
  setTimeout(move_robot,500);
}

const move_left=(i)=>{
  location-=1;
  console.log('locati0on is L:'+location)
  document.getElementById((location+1).toString()).innerHTML=text;
  text=document.getElementById(location.toString()).innerHTML;
  document.getElementById(location.toString()).innerHTML='<div id="robot"><div/><div id="scan"><div/>'
  setTimeout(scaning,500);
  
  
}
const move_up=()=>{
  location-=column;
  console.log('locati0on is U:'+location)
  document.getElementById((location+(column*1)).toString()).innerHTML=text;
  text=document.getElementById(location.toString()).innerHTML;
  document.getElementById(location.toString()).innerHTML='<div id="robot"><div/><div id="scan"><div/>'
  setTimeout(scaning,500);



}
const move_right=()=>{
  location+=1;
  console.log('locati0on is R:'+location);
  document.getElementById((location-1).toString()).innerHTML=text;
  text=document.getElementById(location.toString()).innerHTML;
  document.getElementById(location.toString()).innerHTML='<div id="robot"><div/><div id="scan"><div/>'
  setTimeout(scaning,500);
}
const move_down=()=>{
  console.log('column is'+column)
  console.log('location is'+location)
  location=(location*1)+(column*1);
  console.log('locati0on is D:'+location)
  document.getElementById((location-(column*1)).toString()).innerHTML=text;
  text=document.getElementById(location.toString()).innerHTML;
  document.getElementById(location.toString()).innerHTML='<div id="robot"><div/><div id="scan"><div/>'
  setTimeout(scaning,500);
  

}

const move_right_homes=()=>{



  if(moveRight){                          

    if( (((location+1)%column)==0)){
      if(location==(column*row)-1){
        moveBack=true;
        leftHomes=true;

        move_robot()

      }else{

      moveRight=false;
      console.log('moveRight:'+moveRight)
      document.getElementById('robot').style.animation='moveDown 0.5s';
      setTimeout(move_down,480);
      }
  }else{

    document.getElementById('robot').style.animation='moveRight 0.5s';
      setTimeout(move_right,480)
    }
  }else{


    if(((location%column)==0)){
      if((((location*1)+(column*1)-1))==(column*row)-1){
        moveBack=true;
        leftHomes=true;
        move_robot()
      }else{

      moveRight=true;
      document.getElementById('robot').style.animation='moveDown 0.5s';
      setTimeout(move_down,480);
      }
    }else{

      document.getElementById('robot').style.animation='moveLeft 0.5s';
      setTimeout(move_left,480);
   }
  
}

}
const move_left_homes=()=>{
  if(!moveRight){  
    if(((location%column)==0)){
      if(location==0){
        leftHomes=false;

        moveRight=true
        move_robot();
      }else{
      moveRight=true;
      document.getElementById('robot').style.animation='moveUp 0.5s';
      setTimeout(move_up,480);
      }
    }else{

      document.getElementById('robot').style.animation='moveLeft 0.5s';
      setTimeout(move_left,480);
   }                        

  }else{

    if( (((location+1)%column)==0)){
      if(location==((column*1)-1)){
        
        leftHomes=false;
        moveRight=false;
        move_robot()

      }else{

      moveRight=false;
      console.log('moveRight:'+moveRight);
      document.getElementById('robot').style.animation='moveUp 0.5s';
      setTimeout(move_up,480);
      }
  }else{
    document.getElementById('robot').style.animation='moveRight 0.5s';
      setTimeout(move_right,480)
      
    }
  }
}
const move_back=()=>{
  let rowLocation=Math.floor((location/column)+1);
  let columnLocation=column-(((rowLocation*column)-1)-location);
  let rowFirstRobot=0;
  let columnFirstRobot=0;
  if(enteredColumnRobot==1){
    columnFirstRobot=column;
    rowFirstRobot=enteredRowRobot-1;

  }else{
    columnFirstRobot=enteredColumnRobot-1;
    rowFirstRobot=enteredRowRobot;
  }
    setTimeout(()=>{
      if(columnLocation>(columnFirstRobot)){
        document.getElementById((location).toString()).innerHTML=text;
      move_left_noscaning();
      }else{
        if(columnLocation<(columnFirstRobot)){
          document.getElementById((location).toString()).innerHTML=text;
          move_right_noscaning();
        }else{
          if(rowLocation>rowFirstRobot){
            document.getElementById((location).toString()).innerHTML=text;
            move_up_noscaning();
          }else{
            moveRight=false;
            moveBack=false;
            document.getElementById(location.toString()).innerHTML='<div id="robot"><div/><div id="scan"><div/>'
            setTimeout(scaning,498);

          }
      }
    }
    
  },500);

}
const  move_robot=()=>{
  console.log('location is move:'+location)
if(!(firstLocation==1)  ){
  if(!leftHomes){
       move_right_homes();
    }else{
      if(!moveBack ){
        move_left_homes();   
      }else{
          move_back();
        }
  }
}else{
  if(!leftHomes){
    move_right_homes();
  }else{
    moveRight=false;
    move_left_homes();
  }
}
  /*console.log(repeet);
  if(onRobot){
  if(repeet){
    if(moveRight){
      i+=1;
      if(i<stateHomes.length){
        console.log('scaning here:'+i)
        text=document.getElementById(i.toString()).innerHTML;
        document.getElementById((i).toString()).innerHTML='<div></div>';
        setTimeout(scaning.bind(this,i),2000)
        }else{
          moveRight=false;
          document.getElementById((i-1).toString()).innerHTML=text;
          i-=2;
          text=document.getElementById(i.toString()).innerHTML;
          document.getElementById((i).toString()).innerHTML='<div></div>';
          
          setTimeout(scaning.bind(this,i),2000)
        }

    }else{
      i-=1;
      if(i>=0){
        console.log('scaning here:'+i)
        text=document.getElementById(i.toString()).innerHTML;
        document.getElementById((i).toString()).innerHTML='<div></div>';
        
        setTimeout(scaning.bind(this,i),2000)
        }else{
          moveRight=true;
          setTimeout(scaning.bind(this,++i),2000)
          text=document.getElementById(i.toString()).innerHTML;

        }


    }

  }else{
    i+=1;
   
    if(i<stateHomes.length){
      console.log('scaning here:'+i)
      setTimeout(scaning.bind(this,i),2000)
      text=document.getElementById(i.toString()).innerHTML;

      document.getElementById((i).toString()).innerHTML='<div></div>';
      }else{
        setTimeout(()=>{console.log('evry there clean:)')},1000)
    
      }
    }

  }*/
}
async function on_robot(){
  location-=1;
  console.log('locati0on is:'+location)
  text=document.getElementById(location.toString()).innerHTML;
  document.getElementById(location.toString()).innerHTML='<div id="robot"><div/><div id="scan"><div/>';
  onRobot=true;
  setTimeout(scaning,500)
}
const off_robot=()=>{
  onRobot=false;
}


  return (
    <div className="App">
      <div className="part2-App">
        <div className="carpet"></div>
        <div className='content-App'>
          {rowContent}
        </div>
      </div>

      <div className="part1-App">
          <div className="enteredInfo-App">
            <div className='input'>
          <div className="locationRobot">تعیین ابعاد صفحه</div>
            <div className="Rows-app"><label htmlFor="">سطر</label><input className='enterData' id='row-App' type="text" /></div>
            <div className="coulom-App" ><label htmlFor="">ستون</label><input className='enterData' id='column-App' type="text" /></div>
            </div>
            <div className='input'>
            <div className="locationRobot">تعیین موقعیت ربات</div>
            <div className="RowsRobot-app"><label htmlFor="">سطر</label><input className='enterData' id='rowRobot-App' type="text" /></div>
            <div className="coulomRobot-App" ><label htmlFor="">ستون</label><input className='enterData' id='columnRobot-App' type="text" /></div>
            </div><br/>
            
            <div className="setDimension-App" ><button onClick={set_dimension}>اعمال</button></div>
        </div>
        <div className="controlPanel-App">
          <div className='part1'>
            <button onClick={on_robot}>شروع عملیات</button>
          </div>
          <div className="part2">
            <div className="processoer">

            </div>
            <div className="sensor">

            </div>
            <div className="performer">

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
