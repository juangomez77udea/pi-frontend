import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Header/Header'
import SlideMenu from './SlideMenu'

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex h-screen bg-[url('../../assets/img/bg.jpg')] bg-cover bg-center">
      <SlideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      
      <div className="flex flex-col flex-grow">
        <Header toggleMenu={toggleMenu} />
        
        <main className={`flex-grow p-4 overflow-auto transition-all duration-300 ease-in-out ${isMenuOpen ? 'lg:ml-64' : ''}`}>
          <div className="container mx-auto mt-16 lg:mt-20">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default Nav