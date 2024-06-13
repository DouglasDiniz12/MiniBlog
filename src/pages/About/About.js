//css
import { Link } from 'react-router-dom'
import styles from'./About.module.css'
import React from 'react'

const About = () => {
  return (
    <div className={styles.about}>
      <h2>Sobre o mini  <span>blog</span></h2>
      <p>Este projeto consiste em um blog feito com react no front-end e firebase no back-end</p>
      <Link to="posts/create" className='btn'>criar post</Link>
    </div>
  )
}

export default About
