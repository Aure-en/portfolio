import React, {
  useContext,
  useState,
  useEffect,
  createContext,
  useRef,
} from "react";
import PropTypes from "prop-types";

const SectionContext = createContext();

export function useSection() {
  return useContext(SectionContext);
}

export function SectionProvider({ sections, children }) {
  const current = Number(localStorage.getItem("section"));
  const [section, setSection] = useState(current || 0);

  /* Without ref, the event listener only has access to the initial section state.
   It will always think that section is equal to current || 0, even if we update it.
   It is because the listener belongs to the initial render and is not updated on subsequent rerenders.
   We use ref
  */
  const sectionRef = useRef(section);
  const move = (section) => {
    document.querySelector(`#${sections[section]}`).scrollIntoView();
    sectionRef.current = section;
    localStorage.setItem("section", section);
    setSection(section);
  };
  let delaying = false; // Prevents the user from scrolling many times at once.

  const onMouseWheel = (e) => {
    e.preventDefault();
    if (delaying) return;

    if (e.deltaY > 0 && sectionRef.current !== sections.length - 1) {
      move(sectionRef.current + 1);
    } else if (e.deltaY < 0 && sectionRef.current !== 0) {
      move(sectionRef.current - 1);
    }

    delaying = true;
    setTimeout(() => {
      delaying = false;
    }, 500);
  };

  useEffect(() => {
    window.addEventListener("wheel", onMouseWheel, { passive: false });
    return () => window.removeEventListener("wheel", onMouseWheel);
  }, []);

  const value = {
    section,
    setSection,
  };

  return (
    <SectionContext.Provider value={value}>{children}</SectionContext.Provider>
  );
}

SectionProvider.propTypes = {
  sections: PropTypes.arrayOf(PropTypes.string).isRequired,
  children: PropTypes.node,
};

SectionProvider.defaultProps = {
  children: <div />,
};
