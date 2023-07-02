import { useEffect } from "react";

const Price_fetcher = () => {
    useEffect(()=>{
        fetch("/api/hm")
    },[])
    return ( 
        <>
        <h1>Prices are fetched in this component</h1>
        </>
     );
}
 
export default Price_fetcher;