import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import DragAndScroll from "../utils/DragAndScroll";
import { useCursor } from "../../contexts/CursorContext";

// Icons
import { ReactComponent as IconLight } from "../../assets/icons/light.svg";
import { ReactComponent as IconDark } from "../../assets/icons/dark.svg";

function Preview({ visuals, hasDarkMode }) {
  const [currentImage, setCurrentImage] = useState(0);
  const [theme, setTheme] = useState("light");
  const { setState } = useCursor();

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
        <Message>(Drag and scroll)</Message>
        <DragAndScroll image={currentImage}>
          <Image
            src={
              hasDarkMode ? visuals[theme][currentImage] : visuals[currentImage]
            }
            alt="Project Preview"
            onDragStart={(e) => {
              e.preventDefault();
              setState("scroll");
            }}
            onMouseEnter={() => setState("preview")}
            onMouseLeave={() => setState("basic")}
          />
        </DragAndScroll>
      </div>

      {hasDarkMode ? (
        <Controls>
          <Switch onClick={switchTheme}>
            {theme === "light" ? <IconLight /> : <IconDark />}
          </Switch>
          <Buttons>
            {visuals[theme].map((image, index) => (
              <Button
                type="button"
                onClick={() => setCurrentImage(index)}
                isSelected={currentImage === index}
                onMouseEnter={() => setState("hidden")}
                onMouseLeave={() => setState("basic")}
              />
            ))}
          </Buttons>
        </Controls>
      ) : (
        <Buttons>
          {visuals.map((image, index) => (
            <Button
              type="button"
              onClick={() => setCurrentImage(index)}
              isSelected={currentImage === index}
              onMouseEnter={() => setState("hidden")}
              onMouseLeave={() => setState("basic")}
            />
          ))}
        </Buttons>
      )}
    </Container>
  );
}

export default Preview;

const Container = styled.div`
  display: flex;
  position: relative;
`;

const Message = styled.span`
  position: absolute;
  transform: rotate(270deg);
  text-transform: uppercase;
  transform-origin: 0 0;
  top: 9.5rem;
  left: -1.5rem;
  letter-spacing: 1px;
  font-size: 0.9375rem;
`;

const Image = styled.img`
  max-width: 100%;
  vertical-align: bottom; // Prevents bottom white-space.
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

const Buttons = styled.div`
  align-self: flex-end;

  & > button {
    margin: 0.65rem 0.75rem;
  }

  & > button:last-child {
    margin-bottom: 0.75rem;
  }
`;

const Button = styled.button`
  border: none;
  width: 0.65rem;
  height: 0.65rem;
  padding: 0;
  transform: rotate(45deg);
  cursor: pointer;
`;

const Switch = styled.button`
  border: none;
  background: none;
  padding: 0;
`;
