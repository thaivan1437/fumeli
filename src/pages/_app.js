import '@/styles/globals.css';
import "../styles/styles.scss";
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Provider } from 'react-redux';
import store from '../redux/store';

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Header />
      <div className='main'>
        <Component {...pageProps} />
      </div>
      <Footer />
    </Provider>
  );
}
