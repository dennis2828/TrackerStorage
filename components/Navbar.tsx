import Link from "next/link"
import AccountModal from "./account/AccountModal"
import AccountErrorHandler from "./account/AccountErrorHandler"
import UserSession from "./account/UserSession"
import { auth } from "@/auth"

const Navbar = async ({errorCode}: {errorCode: string}) => {
  const session = await auth();

  if(!session || !session.user) return null;

  const {user} = session;

  return (
    <div className="flex items-center gap-3 justify-end mb-3">
        <Link href="/" className="font-semibold text-white hover:text-gray-300 duration-75">Home</Link>
        <Link href="/" className="font-semibold text-white hover:text-gray-300 duration-75">Docs</Link>
        {session && user && (
            <Link href="/" className="font-semibold text-white hover:text-gray-300 duration-75">Dashboard</Link>
        ) }
        <AccountModal />
        <UserSession />
        <AccountErrorHandler errorCode={errorCode} />
    </div>
  )
}

export default Navbar