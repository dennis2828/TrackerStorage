import Link from "next/link"

const Footer = () => {
  return (
    <footer className="flex flex-col gap-4 sm:flex-row items-center justify-between py-3 border-t-2 border-ultraViolet/90">
        <Link href="/" className="font-bold text-2xl text-ultraViolet hover:text-black duration-75">Tracker Storage</Link>
        <div className="flex items-center gap-3">
          <Link href="/" className="font-semibold text-ultraViolet hover:text-black duration-75">home</Link>
          <Link href="/dashboard" className="font-semibold text-ultraViolet hover:text-black duration-75">dashboard</Link>
          <Link href="/account" className="font-semibold text-ultraViolet hover:text-black duration-75">account</Link>
          <Link href="/docs" className="font-semibold text-ultraViolet hover:text-black duration-75">documentation</Link>
        </div>
        <p className="font-semibold text-ultraViolet">© All rights reserved.</p>
      </footer>
  )
}

export default Footer;