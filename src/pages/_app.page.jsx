import * as React from 'react'
import '@/styles/globals.css'
import '../styles/styles.scss'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Provider } from 'react-redux'
import store from '../redux/store'

export default function App({ Component, pageProps }) {
  const [headerHeight, setHeaderHeight] = React.useState(0);
  return (
    <Provider store={store}>
      <Header setHeaderHeight={setHeaderHeight}/>
      <div className="main" style={{ background: '#19181c!important', marginTop: `${headerHeight + 20}px` }}>
        <Component {...pageProps} />
      </div>
      <Footer />
    </Provider>
  )
}
