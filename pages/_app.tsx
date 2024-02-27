import "@/styles/globals.css";
import type { AppProps } from "next/app";
import {Inter} from "next/font/google"
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "react-hot-toast";

const inter=Inter({subsets:["latin"]})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GoogleOAuthProvider clientId="786323574832-fejrk2j692jhi4t8mr8gtkc5oe5pjmrd.apps.googleusercontent.com">
      <div className={inter.className}>
        <Component {...pageProps} />
        <Toaster/>
      </div>
    </GoogleOAuthProvider>
  );
}
