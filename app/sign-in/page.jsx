import { SignIn } from "@clerk/nextjs"

export default function Page({ searchParams: { redirectUrl } }) {
  return <SignIn redirectUrl={redirectUrl || "/"} />
}
