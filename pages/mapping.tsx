import { useEffect, useRef, useState } from "react";
import m from "../styles/Mapping.module.css";

const Mapping = () => {
    
    const [docs, setDocs] = useState<[]>();
    const canvas = useRef<HTMLCanvasElement>(null);


    useEffect(()=>{
       fetch("/api/map").then(r=>r.json()).then(rs => {
        setDocs(rs);
        rs.map((r:any)=> console.log(r.route.wander))
       } )
    },[]);

    useEffect(()=>{
       const ctx = canvas.current?.getContext('2d')!;
       const startX = 50; // X-coordinate of the start point
       const startY = 50; // Y-coordinate of the start point
       const endX = 350; // X-coordinate of the end point
       const endY = 350; // Y-coordinate of the end point
   
       // Draw the line
       ctx.beginPath();
       ctx.moveTo(startX, startY);
       ctx.lineTo(endX, endY);
       ctx.stroke();
    },[docs])


    
    return ( 
        <>
            Analytics to be done here....
            {
                docs && docs.length
            }
            <div className={m.shell}>
                <canvas ref={canvas}>

                </canvas>
            </div>
             
        </>
     );
}
 
export default Mapping;