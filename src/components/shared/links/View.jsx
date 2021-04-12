import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useCursor } from "../../../contexts/CursorContext";
import { useSection } from "../../../contexts/SectionContext";

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

View.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

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
    transition: transform 0.5s linear;
  }

  &:before {
    background: ${(props) => `
    linear-gradient(to right,
    ${props.theme.border_hover_secondary} 0%,
    ${props.theme.border_hover_secondary} 50%,
    ${props.theme.border_hover_primary} 50%,
    ${props.theme.border_hover_primary} 100%)
    `};
  }

  & > span:before {
    background: ${(props) => `
    linear-gradient(to left,
    ${props.theme.border_hover_secondary} 0%,
    ${props.theme.border_hover_secondary} 50%,
    ${props.theme.border_hover_primary} 50%,
    ${props.theme.border_hover_primary} 100%)
    `};
  }

  &:after {
    background: ${(props) => `
    linear-gradient(to top,
    ${props.theme.border_hover_secondary} 0%,
    ${props.theme.border_hover_secondary} 50%,
    ${props.theme.border_hover_primary} 50%,
    ${props.theme.border_hover_primary} 100%)
    `};
  }

  & > span:after {
    background: ${(props) => `
    linear-gradient(to bottom,
    ${props.theme.border_hover_secondary} 0%,
    ${props.theme.border_hover_secondary} 50%,
    ${props.theme.border_hover_primary} 50%,
    ${props.theme.border_hover_primary} 100%)
    `};
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
    width: 200%;
    height: 1px;
  }

  &:after,
  & > span:after {
    width: 1px;
    height: 200%;
  }

  // Bottom line
  &:before {
    bottom: 0;
    transform: translateX(50%);
  }

  // Top line
  & > span:before {
    transform: translateX(-50%);
    top: 0;
  }

  // Right line
  &:after {
    top: 0;
    transform: translateY(-50%);
  }

  // Left line
  & > span:after {
    bottom: 0;
    transform: translateY(50%);
  }

  &:hover:before,
  &:hover:after,
  &:hover > span:before,
  &:hover > span:after {
    transform: translate(0, 0);
  }
`;
