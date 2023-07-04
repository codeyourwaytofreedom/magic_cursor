import h from "../styles/Slider.module.css";
import { useEffect, useRef, useState } from "react";
import { countries } from "./product_bank";

const Slider_menu = () => {
  const forward = useRef<HTMLDivElement>(null);
  const anchor = useRef<HTMLDivElement>(null);
  const [traX, setX] = useState<number>(0);
  const [distance, setDistance] = useState<number>(0);
  const [forVis, setForVis] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const currentWidth = window.innerWidth;

      const widthChange = currentWidth - previousWidth;

      if(currentWidth > previousWidth){
        if(traX !== 0 && traX < 0){
          setX(traX + widthChange)
        }
        else{
          setX(0)
        }
      }
      previousWidth = currentWidth;
    }

    let previousWidth = window.innerWidth;

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [traX]);


  useEffect(() => {
    const calculateDistance = () => {
      if (forward.current && anchor.current) {
        const forwardRect = forward.current.getBoundingClientRect();
        const anchorRect = anchor.current.getBoundingClientRect();
        const distanceX = forwardRect.left - anchorRect.left;
        setDistance(distanceX);
      }
    };

    calculateDistance();

    const resizeHandler = () => {
      calculateDistance();
    };

    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);
  
  const step_size = 100;
  const handle_forward = () =>{
      setX(traX-step_size);
      setTimeout(() => {
        setDistance(distance+step_size)
      }, 100);
  }

  const handle_backward = () =>{
    if(traX + step_size > 0){
      setX(0)
    }
    else{
      setX(traX+step_size)
    }
  }

  useEffect(()=>{
    if(anchor.current && forward.current){
      if(anchor.current?.getBoundingClientRect().left > forward.current?.getBoundingClientRect().left){
        setForVis(true)
      }
      else{
        setForVis(false)
      }
    }
  },[anchor.current?.getBoundingClientRect().left, forward.current?.getBoundingClientRect().left]);

  useEffect(()=>{
    if(anchor.current && forward.current){
      const margin = forward.current.getBoundingClientRect().left -  anchor.current!.getBoundingClientRect().left;
        if(margin > 0){
          setX(traX + (margin+10))
        }
    }
  },[forVis])

  return ( 
  <div className={h.slider}>
        <button id={h.back} onClick={handle_backward} style={{visibility: traX < 0 ? "visible" : "hidden"}}> 
        &#x276E;
        </button>
      <div className={h.slider_topBanner}>
        <div className={h.slider_topBanner_menu} style={{ transform: `translateX(${traX}px)` }}>
            {
              countries.map((c,i )=>
            <div className={h.slider_topBanner_menu_double} key={i}>
                <div className={h.slider_topBanner_menu_double_country}>{c.name}</div>
                <div className={h.slider_topBanner_menu_double_info}>Minimum wage: € {c.min_wage}</div>
            </div>
            )
            }
            <div ref={anchor}></div>
        </div>
        <div id={h.name} ref={forward} style={{visibility:forVis ? "visible" : "hidden"}}>
          <button onClick={handle_forward} id={h.forward}>
            &#10095;
          </button>
        </div>
      </div>
  </div>
  )
  
}

export default Slider_menu;