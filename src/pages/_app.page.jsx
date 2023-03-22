import * as React from 'react'
import '@/styles/globals.css'
import '../styles/styles.scss'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Provider } from 'react-redux'
import store from '../redux/store'
import Router from 'next/router'
import { useState, useEffect } from 'react';
import Loader from '@/components/loading'

export default function App({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(false);
  // handle loading when router changes state
  useEffect(() => {
    Router.events.on("routeChangeStart", (url)=>{
      setIsLoading(true)
    });

    Router.events.on("routeChangeComplete", (url)=>{
      setIsLoading(false)
    });

    Router.events.on("routeChangeError", (url) =>{
      setIsLoading(false)
    });

  }, [Router])

  if (typeof localStorage !== 'undefined') {
    const user = localStorage.getItem("user");
    const userCheck = localStorage.getItem("user_check");
    if (!user) {
      localStorage.setItem("user", JSON.stringify(''));
    }
    if (!userCheck) {
      localStorage.setItem("user_check", JSON.stringify(''));
    }
  }
  const [headerHeight, setHeaderHeight] = React.useState(0);

  return (
    <Provider store={store}>
      <Header setHeaderHeight={setHeaderHeight}/>
      <div className="main" style={{ background: '#19181c!important', marginTop: `${headerHeight + 20}px` }}>
        {
          isLoading ? <Loader/> : <Component {...pageProps} />
        }
      </div>
      <Footer />
    </Provider>
  )
}
