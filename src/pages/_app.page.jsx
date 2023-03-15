import * as React from 'react'
import '@/styles/globals.css'
import '../styles/styles.scss'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Provider } from 'react-redux'
import store from '../redux/store'
// import SignUpModal from '@/components/auth/register'
// import LoginModal from '@/components/auth/login'
// import ForgotPasswordModal from '@/components/auth/forgetPassword'

export default function App({ Component, pageProps }) {
  const [headerHeight, setHeaderHeight] = React.useState(0);
  return (
    <Provider store={store}>
      <Header setHeaderHeight={setHeaderHeight}/>
      <div className="main" style={{ background: '#19181c!important', marginTop: `${headerHeight + 20}px` }}>
        {/* <SignUpModal></SignUpModal>
        <LoginModal></LoginModal>
        <ForgotPasswordModal></ForgotPasswordModal> */}
        <Component {...pageProps} />
      </div>
      <Footer />
    </Provider>
  )
}
