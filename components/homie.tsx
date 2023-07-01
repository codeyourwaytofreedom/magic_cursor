import Image from "next/image";
import React, { useEffect, useState } from "react";
import h from "../styles/Homie.module.css";


const Homie = () => {
    const [shade, setShade] = useState<string>("centercenter");
    const [slope,setSlope] = useState<number>(0);

    useEffect(() => {
        const moving = (event:MouseEvent) => {
        const {innerWidth, innerHeight} = window;
        const height_percentage = event.clientX < innerWidth/2 ? event.clientX/innerWidth/2 * -80 
                                  : -(20 + 2*(20 - event.clientX/innerWidth/2 * 80));
         setTimeout(() => {
            setSlope(height_percentage);
         }, 350);
        

        console.log(height_percentage);

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
            <div className={h.homie_scales}>
               <div className={h.homie_scales_double} style={{ transform: `rotate(${slope}deg)` }}>
                  <Image id={h.holders}  src={"/holders.png"} alt={"scale"} width={600} height={400}/>
                  <Image id={h.moneyleft} style={{left:slope/2+10}}  src={"/money.png"} alt={"scale"} width={50} height={50}/>
                  <Image id={h.moneyright} style={{right:-slope/2+10}}  src={"/money.png"} alt={"scale"} width={50} height={50}/>
               </div>
                <Image id={h.center}  src={"/center.png"} alt={"scale"} width={600} height={400}/>
            </div>
            <div className={h.homie_navbar}>
                
            </div>
        </div>
                
    </> );
}
 
export default Homie;