import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { csrfToken } from '../lib/csrf';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} csrfToken={csrfToken} />;
}
export default MyApp;
