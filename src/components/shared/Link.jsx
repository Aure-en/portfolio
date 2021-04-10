import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useCursor } from "../../contexts/CursorContext";

function Link({ href, children }) {
  const { setState } = useCursor();
  return (
    <StyledLink
      href={href}
      onMouseEnter={() => setState("hidden")}
      onMouseLeave={() => setState("basic")}
    >
      <span>{children}</span>
    </StyledLink>
  );
}

export default Link;

Link.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

const StyledLink = styled.a`
  position: relative;
  display: inline-block;
  text-transform: uppercase;
  align-self: flex-end;
  padding: 0.5rem 0.75rem;
  text-align: center;
  grid-column: 2;
  overflow: hidden;

  & > * {
    cursor: pointer;
  }

  &:before,
  &:after,
  & > span:before,
  & > span:after {
    position: absolute;
    content: "";
    transition: transform 0.3s ease-out, background 0.5s ease-out;
    background: ${(props) => props.theme.border_hover_primary};
  }

  &:before,
  &:after {
    right: 0;
    bottom: 0;
  }

  & > span:before,
  & > span:after {
    left: 0;
    top: 0;
  }

  &:before,
  & > span:before {
    width: 100%;
    height: 1px;
  }

  &:after,
  & > span:after {
    width: 1px;
    height: 100%;
  }

  // Bottom line
  &:before {
    transform: translateX(-100%);
  }

  // Right line
  &:after {
    transform: translateY(-100%);
  }

  // Top line
  & > span:before {
    transform: translateX(100%);
  }

  // Left line
  & > span:after {
    transform: translateY(100%);
  }

  &:hover:before,
  &:hover:after,
  &:hover > span:before,
  &:hover > span:after {
    transform: translate(0, 0);
    background: ${(props) => props.theme.border_hover_secondary};
  }
`;
