
import "./globals.css";


import { Suspense } from "react";
import Loading from "./loading";
import { ReactQueryProvider } from "./components/ReactQueryClientProvider";

import Searchbar from "./components/Searchbar";
import EmbedProviders from './GlobalRedux/provider'

export default function RootLayout({ children }) {


  return (

    <html lang="en">
      <ReactQueryProvider>
   
      <body>
      <EmbedProviders>
      <Searchbar></Searchbar>
      <Suspense fallback={<Loading></Loading>}>
        {children}
        </Suspense>
        </EmbedProviders>
        </body>
     </ReactQueryProvider>
    </html>
  
   
  );
}
