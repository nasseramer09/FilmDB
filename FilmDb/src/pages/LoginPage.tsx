import { useEffect, useState } from "react"
import useUserStore from "../stores/useUserStore";
import { useNavigate } from "react-router-dom";
import './styles/loginPage.css'

type User={
    username:string;
    password:string;
}
function LoginPage() {
const [user, setUser]=useState<User>({username:'', password:''});
const login=useUserStore((state)=>state.login);
const navigate=useNavigate();
const isLogedIn = useUserStore((state)=>state.isLogedIn);


const userNameInputChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const {name, value} = e.target;
    setUser((prevUser)=>({...prevUser, [name]:value}));
}

const formSubmitHandler = async (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    await login(user.username, user.password);
    if(isLogedIn){
            navigate('/HomePage')
    }
}

useEffect(()=>{
    if(isLogedIn){
        navigate('/HomePage')
        console.log('User has ben navigated to HomePage')
    }
},[isLogedIn, navigate])

const navigateToRegisterPage=()=>{
    navigate('/RegistrationPage');
}

  return (
    <section className="loginWrapper">

                            <h1> MY MOVIE DATABASE</h1>

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
                  
                        <button type="submit"> Logain </button>

                </form>
            <div className="registerationButton">
                <p> Har du inte konto? skapa ett nu! </p>
                <button className="registerButton" onClick={navigateToRegisterPage}>Skapa konto </button>
            </div>
        </div>

    </section>
  )
}

export default LoginPage
