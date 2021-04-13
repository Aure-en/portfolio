import { useState, useEffect } from "react";

function useDropdown(ref) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Close dropdown if clicking outside
  const handleClickOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setIsDropdownOpen(false);
    }
  };

  // Add event listener to close the dropdown on outside click when it is open.
  useEffect(() => {
    if (!isDropdownOpen) return;
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isDropdownOpen]);

  return {
    isDropdownOpen,
    setIsDropdownOpen,
  };
}

export default useDropdown;
