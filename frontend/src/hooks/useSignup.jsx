
import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

const useSignup = () => {
    const{dispatch}=useAuthContext();
    const [error,setError]=useState(false);
    const [isloading,setIsloading]=useState(false);
    const signup= async (email,password)=>{
        setIsloading(true);
        const res=await fetch('https://mern-stack-backend-1wcw.onrender.com/',{
            method:'POST',
            headers:{'content-type':'application/json'},
            body:JSON.stringify({email,password})
        })
        const json=await res.json();
        if(!res.ok){
            setError(json.error);
            setIsloading(false);
        }
        else{
            //save the JWT in localstorage
            localStorage.setItem('user',JSON.stringify(json));
            setIsloading(false);
            setError(false);
            
            //changing the global state using dispach
            dispatch({type:'LOGIN',payload:json})
        }

    }
    return ({signup,isloading,error});
}
 
export default useSignup;
