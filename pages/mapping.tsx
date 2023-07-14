import { useEffect, useRef, useState } from "react";
import m from "../styles/Mapping.module.css";


type document = {
    _id:string,
    time:string,
    ip:string,
    route:{
        wander:{x:number, y:number}[],
        clicks:[],
        dims:object
    },

}

const Mapping = () => {
    
    const [docs, setDocs] = useState<document[]>();
    const cnv = useRef<HTMLCanvasElement>(null);


    useEffect(()=>{
       fetch("/api/map").then(r=>r.json()).then(rs => {
        setDocs(rs);
       })
    },[]);

    useEffect(()=>{
        if(docs){
            const test1 = docs[0].route.wander[5];
            const test2 = docs[0].route.wander[6];
            
            const {innerWidth, innerHeight} = window;

            if(cnv.current){
                const ctx = cnv.current.getContext('2d')!;
                cnv.current.width = innerWidth;
                cnv.current.height = innerHeight;
                
                ctx.strokeStyle = "black";
                ctx.lineWidth = 1;
                
                ctx.beginPath();
                ctx.moveTo(test1.x, test1.y);
                ctx.lineTo(test2.x, test2.y);
                ctx.stroke();
            }
        }
    },[docs]);
    
    return ( 
        <>
            <canvas ref={cnv} style={{background:"wheat"}}></canvas>             
        </>
     );
}
 
export default Mapping;