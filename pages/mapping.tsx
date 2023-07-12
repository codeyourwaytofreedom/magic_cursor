import { useEffect } from "react";

const Mapping = () => {
    
    useEffect(()=>{
       fetch("/api/map") 
    },[])
    
    return ( 
        <>
            Analytics to be done here....
        </>
     );
}
 
export default Mapping;