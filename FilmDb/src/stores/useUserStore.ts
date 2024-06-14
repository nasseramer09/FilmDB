import { create } from "zustand";
import axios from "axios";


type UseUserStoreProps={
    user: User | null;
    isLogedIn : boolean;
    login : (username:string, password:string) => Promise <void>;
    logout : () => void;
    register : (username:string, password:string) => Promise <void>;
    sessionKontroll : () => void;
}

const useUserStore = create <UseUserStoreProps>((set)=>({
    user:null,
    isLogedIn:false,
    
    login: async (username, password) =>{
        try{
            console.log('försöker logga in med ', username, password)

            const response=await axios.post('http://localhost:8080/api/auth/login', {username, password});
            if(response.status===200 && response.data.success){
                        const user ={username, password};
                        sessionStorage.setItem('user', JSON.stringify(user));
                        set({user, isLogedIn:true});
                        console.log('login succefull ', user)
            }else{
                console.log('Login failed', response.data.message)
            }
            
        }catch(error){
            console.log('Login failed', error);
        
        }
        
    },

    logout:()=>{
        sessionStorage.removeItem('user');
        set({user:null, isLogedIn:false});
    },

    register: async(username, password)=> {
        try{
        
                const response= await axios.post('http://localhost:8080/api/auth/register', {username, password});
                const user : User = response.data.data;
                sessionStorage.setItem('user', JSON.stringify(user));
                set({user, isLogedIn:true});
                console.log('userdata after regstering',user);

        }catch(error){
            console.log('något gick fel med registereringnen ', error)
        }
    },
    sessionKontroll : () => {
        const userData = sessionStorage.getItem('user');
        if(userData){
            try{   
                     const user : User | null =  JSON.parse (userData);

                if(user){
                            set({user, isLogedIn : true});
                        }
            }catch(error){
                console.log('error parsin user data from session', error)
            }
        }
       
    }
    

}))

export default useUserStore