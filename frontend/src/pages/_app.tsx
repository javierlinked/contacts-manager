import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Create from "./Create";
import Edit from "./Edit";
import List from "./List";
import Login from "./Login";
import { useRouter } from 'next/router';


export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  switch (router.pathname) {
    case "/":
    case "/login":
      return <Login />;
    case "/create":
      return <Create />;
    case "/list":
      return <List />;
    case "/edit":
      return <Edit />;
    default:
      return <h1>404</h1>;
  }
}
