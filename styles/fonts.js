import { Montserrat } from "next/font/google"

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  fallback: ["system-ui", "arial"],
  variable: "--font-montserrat",
})

export { montserrat }
