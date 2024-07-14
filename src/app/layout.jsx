import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
import { connectToMongoDB } from "../../config/database";

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
      <Searchbar></Searchbar>
        {children}
        </EmbedProviders>
        </body>
     </ReactQueryProvider>
    </html>
  
   
  );
}
