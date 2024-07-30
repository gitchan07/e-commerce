import Image from "next/image";
import { Inter } from "next/font/google";
import Index from "./Home/Index";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <Index/>
   
  );
}
