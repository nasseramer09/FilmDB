import { useState } from "react"
import useUserStore from "../stores/useUserStore";
import { useNavigate } from "react-router-dom";



function RegistrationPage() {

  const [user, setUser]=useState<User>({username:'',password:''});
  const register = useUserStore((state)=>state.register);
  const navigate=useNavigate();

const userNameInputChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
  const {name, value}=e.target;
  setUser((prevUser)=>({...prevUser, [name]:value}));
};

const formSubmitHandler= async (e:React.FormEvent<HTMLFormElement>)=>{
  e.preventDefault();
  if(user.username && user.password){
      console.log(user)
    try{  
       await register(user.username, user.password);
      console.log('registration successfully')
      navigate('/HomePage')

    }catch(error){

    console.log('register faild',error)
  }
  
  }
  else{
    console.log('userName or password is empty');
  }
}

  return (
    <section className="registerationWrapper">
      <h1>Registration </h1>
      <div className="formWrapper">
                <form onSubmit={formSubmitHandler}>

                    
                
                <label > Användarnamn
                   
                        <input type="text" 
                               name="username"
                               placeholder="skriv användarnamnet här "
                               value={user.username}
                               onChange={userNameInputChange}
                               required />
                               
                               </label>
                <label > Lösenord
                        <input type="password" 
                               name="password"
                               placeholder="Skriv lösenord här"
                               value={user.password}
                               onChange={userNameInputChange}
                               required />
                </label>
                  
                        <button type="submit"> Create </button>

                </form>
                </div>
    </section>
  )
}

export default RegistrationPage
