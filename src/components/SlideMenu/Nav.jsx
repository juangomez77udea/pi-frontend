import React from 'react';
import Header from '../Header/Header';
import SlideMenu from './SlideMenu';

const Nav = () => {
  return (
    <div className="bg-[url('../../assets/img/bg.jpg')]">
      <Header />
      <div className="flex">
        <SlideMenu />
        <div className="flex-1 ml-64 md:ml-72 lg:ml-80 pt-20">
          {/* Aquí irá el contenido principal de la página */}
        </div>
      </div>
    </div>
  );
};

export default Nav;
