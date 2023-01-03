import { useState } from 'react';
import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Router } from 'next/router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/Index.module.css';
import { BeatLoader } from 'react-spinners';

export default function App({ Component, pageProps }) {

  const [loading, setLoading] = useState(false);

  Router.events.on("routeChangeStart", () => {
    setLoading(true);
  });

  Router.events.on("routeChangeComplete", () => {
    setLoading(false);
  });

  return (
    <>
      <main className={styles.main}>
        <Header />
        {loading ? (
          <div className={styles.loading}>
            <BeatLoader color='#112466' />
          </div>
        ) : (
          <div style={{ height: '100%' }}>
            <Component {...pageProps} />
          </div>
        )}
        <Footer />
      </main>
    </>
  );
};
