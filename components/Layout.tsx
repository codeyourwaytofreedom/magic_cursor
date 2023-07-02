import Image from "next/image";
import React, { ReactNode, useEffect, useState } from "react";
import h from "../styles/Homie.module.css";
import Price_fetcher from "./price_fetcher";
import Scales from "./scales";

interface HomieProps {
   children: ReactNode;
 }

const Layout = ({ children }: HomieProps) => {
    const [shade, setShade] = useState<string>("centercenter");
    
   //shader
    useEffect(() => {
        const moving = (event:MouseEvent) => {
          if(event.clientX < innerWidth/3){
             if(event.clientY < innerHeight/3){
                setShade("lefttop");
             }
             else if(event.clientY > innerHeight*2/3){
                setShade("leftbottom");
             }
             else{
                setShade("leftleft");
             }
          }
          else if(event.clientX > innerWidth*2/3){
            if(event.clientY < innerHeight/3){
                setShade("righttop");
             }
             else if(event.clientY > innerHeight*2/3){
                setShade("rightbottom");
             }
             else{
                setShade("rightright");
             }
         }
         else{
            if(event.clientY < innerHeight/3){
                setShade("centertop");
             }
             else if(event.clientY > innerHeight*2/3){
                setShade("centerbottom");
             }
             else{
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
            <Scales/>
            <div className={h.homie_navbar}></div>
            {children}
        </div>
                
    </> );
}
 
export default Layout;