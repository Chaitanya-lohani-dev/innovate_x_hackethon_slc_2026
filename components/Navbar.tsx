import Link from 'next/link';

const Navbar = () => {
    return (
        <div>
            <nav className="navbar flex items-center justify-between bg-gray-800 text-white p-4 w-full gap-100">
                <div className="navbar-logo w-1/4 bg-gray-800 text-white p-4 gap-10 flex items-center">
                    <h1>LinkIntern</h1>
                </div>
                <ul className="navbar-links flex space-x-4 w-3/4 space-x-4 mx-auto gap-40 ">
                    <li><Link href="/" className="relative inline-block after:absolute after:left-0 after:-bottom-1 
    after:h-[2px] after:w-0 after:bg-white 
    after:transition-all after:duration-300 
    hover:after:w-full">Home</Link></li>
                    <li><Link href="/about" className="relative inline-block after:absolute after:left-0 after:-bottom-1 
    after:h-[2px] after:w-0 after:bg-white 
    after:transition-all after:duration-300 
    hover:after:w-full">About</Link></li>
                    <li><Link href="/contact"className="relative inline-block after:absolute after:left-0 after:-bottom-1 
    after:h-[2px] after:w-0 after:bg-white 
    after:transition-all after:duration-300 
    hover:after:w-full">Contact</Link></li>

                </ul>
                <div className="div">
                    <Link
                        href="/#"
                        className="w-12 h-12 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-full flex items-center justify-center"
                    >
                        +
                    </Link>

                </div>

            </nav>
        </div>

    )
}

export default Navbar
