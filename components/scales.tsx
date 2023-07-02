import Image from "next/image";
import { useEffect, useState } from "react";
import h from "../styles/Homie.module.css";


const Scales = () => {
    const [slope,setSlope] = useState<number>(-20);

    useEffect(() => {
        const moving = (event:MouseEvent) => {
        const {innerWidth, innerHeight} = window;
        const height_percentage = event.clientX < innerWidth/2 ? -20- event.clientX/innerWidth/2 * -80 
                                  : 20 - (20 + (20 - event.clientX/innerWidth/2 * 80));
         setTimeout(() => {
            setSlope(height_percentage);
         }, 350);
        };
      
        window.addEventListener("mousemove", moving);
      
        return () => {
          window.removeEventListener("mousemove", moving);
        };
      }, []);
    return ( 
        <div className={h.homie_scales}>
                <div className={h.homie_scales_double} style={{ transform: `rotate(${slope}deg)` }}>
                <Image id={h.holders}  src={"/holders.png"} alt={"scale"} width={600} height={400}/>
                <Image id={h.moneyleft} style={{left:slope/2+10}}  src={"/money.png"} alt={"scale"} width={50} height={50}/>
                <Image id={h.moneyright} style={{right:-slope/2+10}}  src={"/money.png"} alt={"scale"} width={50} height={50}/>
                </div>
                <Image id={h.center}  src={"/center.png"} alt={"scale"} width={600} height={400}/>
        </div>
     );
}
 
export default Scales;