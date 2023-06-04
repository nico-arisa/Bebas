import React from 'react'
import Footer from '../components/Footer';
import CardBody from '../components/Body';
import Content from '../components/Content';
import NavbarCom from '../components/Navbar';
import Login from '../components/auth/Login';
import Compbod from '../components/Compbod';
import Hero from '../components/Hero';



function Home() {
  return (
    <div>
        <Content />
        <Hero />
        <CardBody />
        <Login />
        <Compbod />
    </div>
  )
}

export default Home