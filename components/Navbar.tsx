import Link from "next/link"
import AccountModal from "./account/AccountModal"
import AccountErrorHandler from "./account/AccountErrorHandler"
import UserSession from "./account/UserSession"
import { auth } from "@/auth"

const Navbar = async ({errorCode}: {errorCode: string}) => {
  const session = await auth();
  
  return (
    <div className="flex items-center gap-3 justify-center md:justify-end mb-14 md:mb-6">
        <Link href="/" className="font-semibold text-white hover:text-gray-300 duration-75">Home</Link>
        <Link href="/docs" className="font-semibold text-white hover:text-gray-300 duration-75">Docs</Link>
        {session && session.user ? (
            <Link href="/dashboard" className="font-semibold text-white hover:text-gray-300 duration-75">Dashboard</Link>
        ):(
          <AccountModal />
        )}
     
        <UserSession />
        <AccountErrorHandler errorCode={errorCode} />
    </div>
  )
}

export default Navbar