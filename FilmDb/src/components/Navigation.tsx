import { Link, useNavigate } from 'react-router-dom'
import './styles/Navigation.css'
import useUserStore from '../stores/useUserStore'
import { useEffect, useState } from 'react';

type NavigationProps={
  link:string;
  name:string;
}


function Navigation() {
  const [menuItems, setMenuItems] = useState <NavigationProps[] > ([]);
  const logout = useUserStore((state)=>state.logout);
  const navigate = useNavigate(); 
  const user = useUserStore((state) => state.user);
  const isLogedIn=useUserStore((state) => state.isLogedIn);

  useEffect(()=>{
    const fetchMenuItems = async () => {
      try{

        const respons = await fetch('/path/to/menu/items ');
        if(!respons.ok){
          throw new Error ('Network respons was not ok');
        }
        const data : NavigationProps[] = await respons.json();
        setMenuItems(data);
      }catch(error){
        console.log('failed to fetch menuItems ',error);
      }
    };
    fetchMenuItems();
  },[])


  const handelLogout = () => {
    logout();
    navigate('/');
  }

  const getInitial = (username:string) => {
    return username.charAt(0).toUpperCase();
  }
  return (
   <nav>

<div className="wraper">

  <Link className="logo" to={`/HomePage`}>
  <img className="logoImg" src="src/assets/logo.png" alt="" /> </Link>

    <div className="user">
      {
        
        <span>
        { isLogedIn && user ?(
        
        getInitial(user?.username)):null}
        </span>}
    </div>
  <ul className='navLinks'>

    <li>
      <button onClick={handelLogout}> Logaut </button>
      </li>
  </ul>


</div>

   </nav>
  )
}

export default Navigation
