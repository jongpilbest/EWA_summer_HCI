import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
import { connectToMongoDB } from "../../config/database";

import { ReactQueryProvider } from "./components/ReactQueryClientProvider";
import { getKey } from "../../_action/KeyAction";
export default function RootLayout({ children }) {
  connectToMongoDB()

  return (

    <html lang="en">
      <ReactQueryProvider>
      <body>{children}</body>
     </ReactQueryProvider>
    </html>
  
   
  );
}
