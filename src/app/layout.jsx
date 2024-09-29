
import "./globals.css";


import { connectToMongoDB } from "../../config/database";
import { Suspense } from "react";
import Loading from "./loading";
import { ReactQueryProvider } from "./components/ReactQueryClientProvider";

import Searchbar from "./components/Searchbar";
import EmbedProviders from './GlobalRedux/provider'

export default function RootLayout({ children }) {
  connectToMongoDB()
  // 지금 serachbar 는 고정해놓고 . 밑에 나오는 이미지만 달라져서 붙이고 있는데 ....
  
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
