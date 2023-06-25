import React, { useEffect } from "react";
import h from "../styles/Homie.module.css";


const Homie = () => {
    useEffect(() => {
        const moving = (event:MouseEvent) => {
        const {innerWidth, innerHeight} = window;
          if(event.clientX < innerWidth/3){
             if(event.clientY < innerHeight/3){
                console.log("left top")
             }
             else if(event.clientY > innerHeight*2/3){
                console.log("left bottom")
             }
             else{
                console.log("left")
             }
          }
          else if(event.clientX > innerWidth*2/3){
            if(event.clientY < innerHeight/3){
                console.log("right top")
             }
             else if(event.clientY > innerHeight*2/3){
                console.log("right bottom")
             }
             else{
                console.log("right")
             }
         }
         else{
            if(event.clientY < innerHeight/3){
                console.log("center top")
             }
             else if(event.clientY > innerHeight*2/3){
                console.log("center bottom")
             }
             else{
                console.log("center center")
             }
         }
        };
      
        window.addEventListener("mousemove", moving);
      
        return () => {
          window.removeEventListener("mousemove", moving);
        };
      }, []);

    return ( <>
        <div className={h.homie} id={h.centercenter}>
            Magic starts
        </div>
                
    </> );
}
 
export default Homie;