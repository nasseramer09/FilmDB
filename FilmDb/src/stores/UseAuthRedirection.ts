import { useNavigate } from "react-router-dom";
import useUserStore from "./useUserStore"
import { Children, useEffect } from "react";

const UseAuthRedirection=()=> {
 const isLogedIn=useUserStore((state)=>state.isLogedIn);
 const navigate=useNavigate();

 useEffect(()=>{
    if(!isLogedIn){
        navigate('/');
    }
 },[isLogedIn, navigate]);
 return isLogedIn?Children:null;
}

export default UseAuthRedirection
