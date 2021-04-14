import React, { useRef } from "react";
import styled from "styled-components";
import useDropdown from "../../../hooks/useDropdown";
import Theme from "./Theme";
import Language from "./Language";

// Icon
import { ReactComponent as CaretDown } from "../../../assets/icons/caret-down.svg";

function Dropdown() {
  const dropdownRef = useRef();
  const { isDropdownOpen, setIsDropdownOpen } = useDropdown(dropdownRef);
  return (
    <Container ref={dropdownRef}>
      <Header
        type="button"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        $isDropdownOpen={isDropdownOpen}
        aria-label="settings"
      >
        <CaretDown />
      </Header>

      {isDropdownOpen && (
        <Body>
          <Option onClick={() => setIsDropdownOpen(false)}>
            <Theme />
          </Option>
          <Option onClick={() => setIsDropdownOpen(false)}>
            <Language />
          </Option>
        </Body>
      )}
    </Container>
  );
}

export default Dropdown;

const Container = styled.div`
  position: relative;
  cursor: pointer;

  & * {
    cursor: pointer;
  }
`;

const Header = styled.button`
  background: none;
  border: 1px solid
    ${(props) =>
      props.$isDropdownOpen
        ? props.theme.border_hover_secondary
        : "transparent"};
  border-bottom: ${(props) => props.$isDropdownOpen && "1px solid transparent"};
  color: ${(props) => props.theme.text_primary};

  &:hover {
    border: 1px solid ${(props) => props.theme.border_hover_secondary};
    border-bottom: ${(props) =>
      props.$isDropdownOpen && "1px solid transparent"};
  }

  &:focus {
    outline: 1px solid transparent;
  }
`;

const Body = styled.ul`
  position: absolute;
  z-index: 50;
  right: 0;
  background: ${(props) => props.theme.background};
  list-style-type: none;
  margin: 0;
  padding: 0;
  border: 1px solid ${(props) => props.theme.border_hover_secondary};
`;

const Option = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 2rem;
`;
