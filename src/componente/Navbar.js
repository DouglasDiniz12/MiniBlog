import { NavLink } from "react-router-dom"
import styles from './Navbar.module.css'

import { useAuthentication } from "../hooks/useAuthentication"
import { useAsyncValue } from "react-router-dom"
import { useAuthValue } from "../context/AuthContext"

const Navbar = () => {

  const {user} = useAuthValue();

  const{logout} = useAuthentication()
  return (
    <nav className={styles.navbar}>
      <NavLink to="/" className={styles.brand}>
         Mini <span>blog</span>
      </NavLink>
      <ul  className={styles.links_list}>
        <li>
          <NavLink to="/" className={({isActive})=>(isActive?styles.active :'')}>
             home
          </NavLink>
        </li>
       
         {!user && (
          <>
          <li>
        <NavLink to="/login" className={({isActive})=>(isActive?styles.active :'')}>
             entrar
          </NavLink>
        </li>
        <li>
        <NavLink to="/register" className={({isActive})=>(isActive?styles.active :'')}>
             Cadastro
          </NavLink>
        </li>
          
          </>
         )}

         {user &&(
          <>
            <li>
        <NavLink to="/posts/create" className={({isActive})=>(isActive?styles.active :'')}>
             Novo post
          </NavLink>
        </li>
        <li>
        <NavLink to="/dashboard" className={({isActive})=>(isActive?styles.active :'')}>
             Dashboard
          </NavLink>
        </li>
          
          
          
          
          </>
         )}
        <li>
        <NavLink to="/about" className={({isActive})=>(isActive?styles.active :'')}>
             sobre
          </NavLink>
        </li>
        {user &&(
          <li>
            <button onClick={logout}>sair</button>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default Navbar
