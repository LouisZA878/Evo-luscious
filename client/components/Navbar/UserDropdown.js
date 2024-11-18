import { useRef, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { m } from "framer-motion"

const UserDropdown = ({ options, setOptions, children }) => {
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setOptions(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

    const menu = {
        closed: {
          scale: 0,
          transition: {
            delay: 0.15,
          },
        },
        open: {
          scale: 1,
          transition: {
            type: "spring",
            duration: 0.4,
            delayChildren: 0.2,
            staggerChildren: 0.05
          },
        },
    };

  return (
    <AnimatePresence>
    {options && (
    <m.div
        ref={dropdownRef}
        initial="closed"
        exit="closed"
        animate="open"
        variants={menu}
    >
        {children}
    </m.div>
    )}
    </AnimatePresence>
  )
}

export default UserDropdown