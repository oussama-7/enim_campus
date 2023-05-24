import React, { useContext } from 'react';
import "./home.css"
import Header from '../../components/Header/Header';
import Features from '../../components/Features/Features';
import Testimonials from '../../components/Testimonials/Testimonials';
import Clubs from '../../components/Clubs/Clubs';
import Products from '../../components/Products/Products';
import Cta from '../../components/Cta/Cta';
import Footer from '../../components/Footer/Footer';
import { AuthContext } from '../../context/AuthContext';

export default function Home() {

  const { user ,loading, error, dispatch} = useContext(AuthContext);
  return (
    <div className='homeContainer'>
   <Header /> 
   <Features />
   <Testimonials />
   <Clubs/>
   <Products/>
   {!user && (<Cta/>)}
   <Footer/>
   </div>
  );
}


