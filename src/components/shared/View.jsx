import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useCursor } from "../../contexts/CursorContext";
import { useSection } from "../../contexts/SectionContext";

function View({ children }) {
  const { setState } = useCursor();
  const { link } = useSection();

  return (
    <Link
      href="#project-1"
      onClick={() => link("project-1")}
      onMouseEnter={() => setState("hidden")}
      onMouseLeave={() => setState("basic")}
    >
      <span>{children}</span>
    </Link>
  );
}

export default View;

const Link = styled.a`
  position: relative;
  padding: 0.5rem 1rem;
  text-transform: uppercase;
  align-self: flex-end;
  overflow: hidden;

  & > span {
    display: flex;
    align-items: center;
    align-self: flex-end;
  }

  & * {
    cursor: pointer;
  }

  &:before,
  &:after,
  & > span:before,
  & > span:after {
    position: absolute;
    content: "";
    transition: transform 0.5s linear infi;
  }

  &:before,
  & > span:before {
    background: ${(props) => `
    linear-gradient(90deg,
    ${props.theme.border_hover_secondary} 0%,
    ${props.theme.border_hover_secondary} calc(100% / 3),
    ${props.theme.border_hover_primary} calc(100% / 3),
    ${props.theme.border_hover_primary} calc(100% / 3 * 2),
    ${props.theme.border_hover_secondary} calc(100% / 3 * 2),
    ${props.theme.border_hover_secondary} 100%);`};
  }

  &:after,
  & > span:after {
    background: ${(props) => `
    linear-gradient(180deg,
    ${props.theme.border_hover_secondary} 0%,
    ${props.theme.border_hover_secondary} calc(100% / 3),
    ${props.theme.border_hover_primary} calc(100% / 3),
    ${props.theme.border_hover_primary} calc(100% / 3 * 2),
    ${props.theme.border_hover_secondary} calc(100% / 3 * 2),
    ${props.theme.border_hover_secondary} 100%);`};
  }

  &:before,
  &:after {
    right: 0;
  }

  & > span:before,
  & > span:after {
    left: 0;
  }

  &:before,
  & > span:before {
    width: 300%;
    height: 1px;
  }

  &:after,
  & > span:after {
    width: 1px;
    height: 300%;
  }

  // Bottom line
  &:before {
    bottom: 0;
    transform: translateX(calc(100% / 3 * 2));
    transition-delay: 1s;
  }

  // Top line
  & > span:before {
    transform: translateX(calc(-100% / 3 * 2));
    top: 0;
  }

  // Right line
  &:after {
    top: 0;
    transform: translateY(calc(-100% / 3 * 2));
    transition-delay: 0.5s;
  }

  // Left line
  & > span:after {
    bottom: 0;
    transform: translateY(calc(100% / 3 * 2));
    transition-delay: 1.5s;
  }

  &:hover:before,
  &:hover:after,
  &:hover > span:before,
  &:hover > span:after {
    transform: translate(0, 0);
  }
`;
