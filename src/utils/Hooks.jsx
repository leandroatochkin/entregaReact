import { useState, useEffect } from 'react';

export function useMobile() {
    const [isMobile, setIsMobile] = useState(false)
  
    useEffect(() => {
      const checkIfMobile = () => {
        setIsMobile(window.innerWidth < 768)
      }
  
      // Check on initial load
      checkIfMobile()
  
      // Add event listener for window resize
      window.addEventListener("resize", checkIfMobile)
  
      // Clean up event listener
      return () => window.removeEventListener("resize", checkIfMobile)
    }, [])
  
    return isMobile
  }

export const useDisableScroll = (isOpen) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    return () => {
      document.body.style.overflow = 'auto' // Clean up on unmount
    }
  }, [isOpen])
}