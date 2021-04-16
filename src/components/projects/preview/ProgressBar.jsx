import React, { useContext, useRef, useEffect } from "react";
import styled, { ThemeContext } from "styled-components";
import PropTypes from "prop-types";

function ProgressBar({ isActive, container, content, number }) {
  const theme = useContext(ThemeContext);
  const ref = useRef();

  const calculateProgress = () => {
    const progress =
      (container.current.scrollTop * 100) /
      (content.current.clientHeight - container.current.clientHeight);

    ref.current.style.background = `linear-gradient(
            270deg,
            ${theme.progress_filled} ${
      progress === "100" ? progress - 10 : progress
    }%,
            ${theme.progress} ${progress}%
          )`;
  };

  useEffect(() => {
    ref.current.style.background = `${theme.progress}`;
  }, [number]);

  useEffect(() => {
    if (!isActive) return;
    const updateProgress = setInterval(calculateProgress, 100);
    return () => clearInterval(updateProgress);
  }, [isActive]);

  return <Message ref={ref}>(Drag and scroll)</Message>;
}

export default React.memo(ProgressBar);

ProgressBar.propTypes = {
  isActive: PropTypes.bool,
  container: PropTypes.shape({ current: PropTypes.instanceOf(Element) })
    .isRequired,
  content: PropTypes.shape({ current: PropTypes.instanceOf(Element) })
    .isRequired,
  number: PropTypes.number.isRequired,
};

ProgressBar.defaultProps = {
  isActive: false,
};

const Message = styled.span`
  position: absolute;
  transform: rotate(270deg);
  text-transform: uppercase;
  transform-origin: 0 0;
  top: 9.5rem;
  left: -1.5rem;
  letter-spacing: 1px;
  background: ${(props) => props.theme.progress};
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
  transition: background 0.2s ease;
`;
