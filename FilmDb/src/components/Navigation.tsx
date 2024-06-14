import { Link, useNavigate } from 'react-router-dom'
import './styles/Navigation.css'
import useUserStore from '../stores/useUserStore'
import { useEffect, useState } from 'react';

type NavigationProps={
  link:string;
  name:string;
}


function Navigation() {
  const [menuItems, setMenuItems]=useState<NavigationProps[]>([]);
  const logout=useUserStore((state)=>state.logout);
  const navigate =useNavigate(); 

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
  return (
   <nav>

<div className="wraper">

  <Link className="logo" to={`/HomePage`}>
  <img className="logoImg" src="src/assets/logo.png" alt="" /> </Link>

    <div className="user">
      {menuItems.map( (item, index) => (
        <a key = {index} href = {item.link} > {item.name} </a>
      ))}
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
