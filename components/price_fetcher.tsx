import { useEffect } from "react";

const Price_fetcher = () => {
    useEffect(()=>{
        fetch("/api/hm")
    },[])
    return ( 
        <>
        </>
     );
}
 
export default Price_fetcher;