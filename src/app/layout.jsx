import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
import { connectToMongoDB } from "../../config/database";
import { Suspense } from "react";
import Loading from "./loading";
import { ReactQueryProvider } from "./components/ReactQueryClientProvider";
import { getKey } from "../../_action/KeyAction";
import Searchbar from "./components/Searchbar";
import EmbedProviders from './GlobalRedux/provider'
export default function RootLayout({ children }) {
  connectToMongoDB()

  return (

    <html lang="en">
      <ReactQueryProvider>
   
      <body>
      <EmbedProviders>
      <Suspense fallback={<Loading></Loading>}>

         <Searchbar></Searchbar>
      
        {children}
        </Suspense>
        </EmbedProviders>
        </body>
     </ReactQueryProvider>
    </html>
  
   
  );
}
