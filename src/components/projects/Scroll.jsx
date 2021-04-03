import React from 'react'
import styled from "styled-components";
import PropTypes from "prop-types";

function Scroll({ current, max }) {
  return (
    <Container>
      {current} <Line /> {max}
    </Container>
  );
}

export default Scroll;

Scroll.propTypes = {
  current: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
};

const Container = styled.div``;

const Line = styled.span``;
