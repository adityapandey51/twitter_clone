import "@/styles/globals.css";
import type { AppProps } from "next/app";
import {Inter} from "next/font/google"
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "react-hot-toast";
import {QueryClientProvider,QueryClient} from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const inter=Inter({subsets:["latin"]})

const queryClient=new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId="786323574832-fejrk2j692jhi4t8mr8gtkc5oe5pjmrd.apps.googleusercontent.com">
      <div className={inter.className}>
        <Component {...pageProps} />
        <Toaster/>
      </div>
      <ReactQueryDevtools></ReactQueryDevtools>
    </GoogleOAuthProvider>
    </QueryClientProvider>
    
  );
}
