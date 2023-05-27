import Link from 'next/link'
import { useState, useEffect } from 'react'
import { BellIcon, MagnifyingGlassIcon, ChevronDownIcon } from '@heroicons/react/24/outline'

// components:
import NavbarItem from "./NavbarItem"
import AccountMenu from "./AccountMenu"
import MobileMenu from './MobileMenu'

export default function Navbar() {
  const [showAccountMenu, setShowAccountMenu] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [showBackground, setShowBackground] = useState(false)

  useEffect(() => {
    function handleScroll() {
      console.log(window.scrollY)
      if (window.scrollY >= TOP_OFFSET) {
        setShowBackground(true)
      } else {
        setShowBackground(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  function toggleMobileMenu() {
    setShowMobileMenu(currentState => !currentState)
  }

  function toggleAccountMenu() {
    setShowAccountMenu(currentState => !currentState)
  }

  return (
    <nav className="w-full fixed z-40">
      <div className={`px-4 md:px-16 py-6 flex flex-row items-center transition duration-500 ${showBackground && 'bg-zinc-900 bg-opacity-90'}`}>
        <Link href='/'>
          <img
            src="/images/logo.png"
            alt="Logo"
            className="h-4 lg:h-7"
          />
        </Link>
        <div className="flex-row ml-8 gap-7 hidden lg:flex">
          <NavbarItem label="Home" active />
          <NavbarItem label="Series" />
          <NavbarItem label="Films" />
          <NavbarItem label="New & Popular" />
          <NavbarItem label="My List" />
          <NavbarItem label="Browse by Languages" />
        </div>
        <div
          className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative"
          onClick={toggleMobileMenu}
        >
          <p className="text-white text-sm">
            Browse
          </p>
          <ChevronDownIcon className={`w-4 text-white fill-white transition ${showMobileMenu ? 'rotate-180' : 'rotate-0'}`} />
          {showMobileMenu && <MobileMenu />}
        </div>
        <div className='flex flex-row ml-auto gap-7 items-center'>
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <MagnifyingGlassIcon className="w-6" />
          </div>
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <BellIcon className="w-6" />
          </div>
          <div onClick={toggleAccountMenu} className="flex flex-row items-center gap-2 cursor-pointer relative">
            <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
              <img src="/images/default-blue.png" alt="" />
            </div>
            <ChevronDownIcon className={`w-4 text-white fill-white transition ${showAccountMenu ? 'rotate-180' : 'rotate-0'}`} />
            {showAccountMenu && <AccountMenu />}
          </div>
        </div>
      </div>
    </nav>
  )
}
