import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';
import css from '../CSS/CSS.module.css';


export const Layout = () => {
  return (
    <div className={css.layout}>
      <Header />
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
    </div>
  );
};
