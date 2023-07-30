import "@/styles/globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/NavBar";

export const metadata = {
  title: "Fuzze",
  description: "owo",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="w-full max-w-2xl m-auto bg-orange-600">
        <Toaster position="top-center" />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
