import React, { useEffect, useState } from "react";
import h from "../styles/Homie.module.css";


const Homie = () => {
    const [shade, setShade] = useState<string>("centercenter");
    useEffect(() => {
        const moving = (event:MouseEvent) => {
        const {innerWidth, innerHeight} = window;
          if(event.clientX < innerWidth/3){
             if(event.clientY < innerHeight/3){
                console.log("left top");
                setShade("lefttop");
             }
             else if(event.clientY > innerHeight*2/3){
                console.log("left bottom");
                setShade("leftbottom");
             }
             else{
                console.log("left");
                setShade("leftleft");
             }
          }
          else if(event.clientX > innerWidth*2/3){
            if(event.clientY < innerHeight/3){
                console.log("right top");
                setShade("righttop");
             }
             else if(event.clientY > innerHeight*2/3){
                console.log("right bottom");
                setShade("rightbottom");
             }
             else{
                console.log("right");
                setShade("rightright");
             }
         }
         else{
            if(event.clientY < innerHeight/3){
                console.log("center top");
                setShade("centertop");
             }
             else if(event.clientY > innerHeight*2/3){
                console.log("center bottom");
                setShade("centerbottom");
             }
             else{
                console.log("center center");
                setShade("centercenter");
             }
         }
        };
      
        window.addEventListener("mousemove", moving);
      
        return () => {
          window.removeEventListener("mousemove", moving);
        };
      }, []);

    return ( <>
        <div className={h.homie} id={h[`${shade}`]}>
            Magic starts
        </div>
                
    </> );
}
 
export default Homie;