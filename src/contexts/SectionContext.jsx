import React, {
  useContext,
  useState,
  useEffect,
  createContext,
  useRef,
} from "react";
import PropTypes from "prop-types";
import useWindowSize from "../hooks/useWindowSize";

const SectionContext = createContext();

export function useSection() {
  return useContext(SectionContext);
}

export function SectionProvider({ sections, children }) {
  const current = Number(sessionStorage.getItem("section"));
  const [section, setSection] = useState(current || 0);
  const [name, setName] = useState(sections[section]);
  const [positions, setPositions] = useState([]);
  const { windowSize } = useWindowSize();

  /* Without ref, the event listener only has access to the initial section state.
   It will always think that section is equal to current || 0, even if we update it.
   It is because the listener belongs to the initial render and is not updated on subsequent rerenders.
   We use ref
  */
  const sectionRef = useRef(section);

  const updateSection = (section) => {
    sectionRef.current = section;
    sessionStorage.setItem("section", section);
    setSection(section);
    setName(sections[section]);
  };

  const move = (section) => {
    document.querySelector(`#${sections[section]}`).scrollIntoView();
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
    }, 300);
  };

  const onKeyDown = (e) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    e.preventDefault();
    if (delaying) return;

    if (e.key === "ArrowDown") {
      move(sectionRef.current + 1);
    } else if (e.key === "ArrowUp") {
      move(sectionRef.current - 1);
    }
  };

  const onScroll = () => {
    const scrollPosition =
      document.documentElement.scrollTop || document.body.scrollTop;
    for (let i = 0; i < positions.length; i += 1) {
      if (
        positions[i].top <= scrollPosition + window.innerHeight - 200 &&
        scrollPosition + window.innerHeight - 200 < positions[i].bottom
      ) {
        updateSection(i);
        return;
      }
    }
  };

  // Sets up events listener
  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    if (windowSize.width < 992 && windowSize.height > 850) {
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
      window.addEventListener("wheel", onMouseWheel, { passive: false });
      window.addEventListener("keydown", onKeyDown, { passive: false });
      move(sectionRef.current);
    }
    return () => {
      window.removeEventListener("wheel", onMouseWheel);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("scroll", onScroll);
    };
  }, [windowSize]);
  // On small screens, go back to the usual scroll system.

  /* Sets up scroll spying:
     Calculate the coordinates of the sections to update the current section
     when a new section comes into view.
  */
  useEffect(() => {
    const scrollPosition =
      document.documentElement.scrollTop || document.body.scrollTop;
    const sectionsElem = [];
    sections.forEach((section) => {
      const sectionElem = document.querySelector(`#${section}`);
      sectionsElem.push(sectionElem);
    });
    const positions = [];
    sectionsElem.forEach((section) => {
      const position = {
        bottom: section.getBoundingClientRect().bottom + scrollPosition,
        top: section.getBoundingClientRect().top + scrollPosition,
      };
      positions.push(position);
    });
    setPositions(positions);
  }, [windowSize]);

  const value = {
    name,
    section,
    sections,
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
