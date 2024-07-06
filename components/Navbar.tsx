import Link from "next/link"
import AccountModal from "./account/AccountModal"
import AccountErrorHandler from "./account/AccountErrorHandler"
import UserSession from "./UserSession"

const Navbar = ({errorCode}: {errorCode: string}) => {
  return (
    <div className="flex items-center gap-3 justify-end mb-3">
        <Link href="/" className="font-semibold text-white hover:text-gray-300 duration-75">Home</Link>
        <Link href="/" className="font-semibold text-white hover:text-gray-300 duration-75">Docs</Link>
        <AccountModal />
        <UserSession />
        <AccountErrorHandler errorCode={errorCode} />
    </div>
  )
}

export default Navbar