import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import ImageScroll from "./ImageScroll";
import Buttons from "./controls/Buttons";
import ThemeSwitch from "./controls/ThemeSwitch";

function Preview({ visuals, hasDarkMode }) {
  const [imageNumber, setImageNumber] = useState(0);
  const [theme, setTheme] = useState("light");

  const switchTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <Container>
      <div>
        <ImageScroll
          number={imageNumber}
          src={hasDarkMode ? visuals[theme][imageNumber] : visuals[imageNumber]}
        />
      </div>

      {hasDarkMode ? (
        <Controls>
          <ThemeSwitch theme={theme} switchTheme={switchTheme} />
          <Buttons
            images={visuals[theme]}
            imageNumber={imageNumber}
            setImageNumber={setImageNumber}
          />
        </Controls>
      ) : (
        <Buttons
          images={visuals}
          imageNumber={imageNumber}
          setImageNumber={setImageNumber}
        />
      )}
    </Container>
  );
}

export default React.memo(Preview);

const Container = styled.div`
  display: flex;
  position: relative;

  @media all and (min-width: 992px) {
    grid-row: 1 / -1;
  }
`;

Preview.propTypes = {
  visuals: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.shape({
      light: PropTypes.arrayOf(PropTypes.string),
      dark: PropTypes.arrayOf(PropTypes.string),
    }),
  ]).isRequired,
  hasDarkMode: PropTypes.bool,
};

Preview.defaultProps = {
  hasDarkMode: false,
};

const Controls = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;
