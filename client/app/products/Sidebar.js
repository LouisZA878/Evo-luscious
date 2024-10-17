"use client"

import { FaArrowRight } from "react-icons/fa";

import useToggle from "@/Store/useToggle"

const Sidebar = ({ children }) => {
  const { status, toggleStatus } = useToggle()


  return (
    <aside
      className={`${ !status && 'close' }`}
    >
        <span onClick={toggleStatus}>
          <FaArrowRight />
        </span>
        {children}

    </aside>
  )
}

export default Sidebar