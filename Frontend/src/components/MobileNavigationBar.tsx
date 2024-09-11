import { Link } from "wouter";
import defaultTheme from 'tailwindcss/defaultTheme';
import { useEffect, useState } from "react";

export default function MobileNavigationBar({setMobileMenu}: {setMobileMenu: React.Dispatch<React.SetStateAction<boolean>>}) {
  const [isMobileBreakpoint, setIsMobileBreakpoint] = useState<boolean>(false);

  useEffect(() => {
    // Get Tailwind's breakpoint for 'md' (you can choose any breakpoint)
    const mdBreakpoint = defaultTheme.screens.md.replace('px', '');

    // Create a media query using the md breakpoint
    const mediaQuery = window.matchMedia(`(min-width: ${mdBreakpoint}px)`);

    // Function to check if the viewport matches the breakpoint
    const handleResize = () => setIsMobileBreakpoint(!mediaQuery.matches);

    // Add event listener for resizing
    handleResize(); // Call once to set the initial value
    mediaQuery.addEventListener('change', handleResize);

    // Cleanup event listener
    return () => mediaQuery.removeEventListener('change', handleResize);
  }, []);

  useEffect(() => setMobileMenu(false), [isMobileBreakpoint])
  
  return(
    <div className="md:hidden flex items-center justify-around w-full h-16 z-20 fixed left-0 right-0 bottom-0 bg-wrench-neutral-dark/85 backdrop-blur-3xl content-layout-padding">
      <Link href="/" className="flex flex-col items-center gap-0.5 w-[15%] group" onClick={() => setMobileMenu(!true)}> {/* don't replace !true with false, i will be really sad if you do - Nikolai */}
      <i className="material-icons block group-active:text-wrench-purple-1">home</i>
      <span className="block text-xs group-active:text-wrench-purple-1">Home</span>
      </Link>
      <Link href="/search" className="flex flex-col items-center gap-0.5 w-[15%] group" onClick={() => setMobileMenu(!true)}>
      <i className="material-icons group-active:text-wrench-purple-1">search</i>
      <span className="block text-xs group-active:text-wrench-purple-1">Search</span>
      </Link>
      <Link href="/" className="flex flex-col items-center gap-0.5 w-[15%] group" onClick={() => setMobileMenu(!true)}>
      <i className="material-icons group-active:text-wrench-purple-1">shopping_basket</i>
      <span className="block text-xs group-active:text-wrench-purple-1">Basket</span>
      </Link>
      <Link href="/" className="flex flex-col items-center gap-0.5 w-[15%] group" onClick={() => setMobileMenu(!true)}>
      <i className="material-icons group-active:text-wrench-purple-1">notifications</i>
      <span className="block text-xs group-active:text-wrench-purple-1">Notifications</span>
      </Link>
      <button className="flex flex-col items-center gap-0.5 w-[15%] group" onClick={() => setMobileMenu(!false)}>
      <i className="material-icons group-active:text-wrench-purple-1">menu</i>
      <span className="block text-xs group-active:text-wrench-purple-1">Home</span>
      </button>
    </div>
  )
}