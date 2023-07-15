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
        if(docs && cnv.current){
            const ctx = cnv.current.getContext('2d')!;
            const {innerWidth, innerHeight} = window;
            cnv.current.width = innerWidth;
            cnv.current.height = innerHeight;
            ctx.strokeStyle = "blue";
            ctx.lineWidth = 1;

            for (let index = 0; index < docs.length; index++) {
                for (let ii = 0; ii < docs[index].route.wander.length; ii++) {
                    if(docs[index].route.wander[ii+1]){
                        const doc_wanders_1 = docs[index].route.wander[ii];
                        const doc_wanders_2 = docs[index].route.wander[ii+1];
    
                        ctx.beginPath();
                        ctx.moveTo(doc_wanders_1.x, doc_wanders_1.y);
                        ctx.lineTo(doc_wanders_2.x, doc_wanders_2.y);
                        ctx.stroke();
                    }
                }
            }
        }
    },[docs]);
    
    return ( 
        <>
            <div className={m.shell}>
                <canvas ref={cnv}></canvas>   
            </div>       
        </>
     );
}
 
export default Mapping;