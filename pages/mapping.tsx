import { useEffect, useState } from "react";

const Mapping = () => {
    
    const [docs, setDocs] = useState<[]>();


    useEffect(()=>{
       fetch("/api/map").then(r=>r.json()).then(rs => setDocs(rs))
    },[])


    
    return ( 
        <>
            Analytics to be done here....
            {
                docs && docs.length
            }
        </>
     );
}
 
export default Mapping;