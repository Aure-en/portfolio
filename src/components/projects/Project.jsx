import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useLanguage } from "../../contexts/LanguageContext";
import { useCursor } from "../../contexts/CursorContext";
import useWindowSize from "../../hooks/useWindowSize";
import Preview from "./preview/Preview";
import Link from "../shared/links/Link";

function Project({ project }) {
  const { setState } = useCursor();
  const { language } = useLanguage();
  const { windowSize } = useWindowSize();

  return (
    <Wrapper id={`project-${project.id}`}>
      <Container>
        {windowSize.width > 768 && (
          <Preview
            visuals={project.visuals}
            hasDarkMode={project.hasDarkMode}
          />
        )}

        <Header>
          <Title
            onMouseEnter={() => setState("hidden")}
            onMouseLeave={() => setState("basic")}
          >
            <a href={project.view}>{project.title}</a>
          </Title>
          <Number>
            {project.id < 10 && "0"}
            {project.id}
          </Number>
        </Header>

        {windowSize.width < 768 && (
          <a href={project.view}>
            <Image src={project.mobile} alt={`${project.title} preview`} />
          </a>
        )}

        <Description>
          <div>
            {project.description[language].map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <StackList>
            {project.technologies.map((technology) => (
              <Stack key={technology}>{technology}</Stack>
            ))}
          </StackList>
          <Links>
            <Link href={project.view}>
              {language === "en" ? "Preview" : "Visiter le site"}
            </Link>
            <Link href={project.repository}>
              {language === "en" ? "View Code" : "Voir le code"}
            </Link>
          </Links>
        </Description>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 3rem;

  @media all and (min-width: 576px) {
    width: 100vw;
    min-height: 100vh;
    max-width: 100%;
    padding-top: 0;
  }
`;

const Container = styled.article`
  display: grid;
  justify-items: center;

  @media all and (min-width: 768px) {
    max-width: 60rem;
    grid-template: repeat(2, auto) / repeat(2, auto);
    padding: 2rem;
  }
`;

const Header = styled.div`
  display: block;
  position: relative;
  margin-bottom: 2rem;
  grid-column: 1 / -1;
  grid-row: 1;

  @media all and (min-width: 992px) {
    margin-bottom: 0;
    grid-column: 2;
    justify-self: start;
    left: 5rem;
  }
`;

const Title = styled.h2`
  position: relative;
  font-family: "Playfair Display", "Source Sans Pro", "Open Sans",
    "Trebuchet MS", "Verdana", sans-serif;
  font-size: 3rem;
  line-height: 4rem;
  margin: 0 0 2rem 0;
  font-weight: 400;

  @media all and (min-width: 576px) {
    font-size: 5rem;
  }
`;

const Number = styled.span`
  display: flex;
  align-items: center;
  font-family: "Playfair Display", "Source Sans Pro", "Open Sans",
    "Trebuchet MS", "Verdana", sans-serif;
  font-size: 1.125rem;
  position: absolute;
  bottom: 0;
  right: -5rem;

  @media all and (min-width: 576px) {
    right: -5rem;
  }

  &:before {
    content: "";
    display: inline-block;
    width: 5rem;
    height: 1px;
    background: ${(props) => props.theme.text_primary};
    margin-right: 1rem;
  }
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 30rem;
  text-align: justify;
  padding: 1rem;

  @media all and (min-width: 768px) {
    margin: 2rem 0 0 3rem;
    padding: 0;
  }

  @media all and (min-width: 992px) {
    position: relative;
    left: 2rem;
  }
`;

const StackList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  color: ${(props) => props.theme.text_accent};
`;

const Stack = styled.li`
  font-size: 0.875rem;
  margin: 0 0.5rem;
`;

const Links = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  grid-gap: 0.5rem;
`;

const Image = styled.img`
  max-width: 100vw;
  border: 1px solid ${(props) => props.theme.border};
  cursor: pointer;
`;

Project.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.shape({
      en: PropTypes.arrayOf(PropTypes.string),
      fr: PropTypes.arrayOf(PropTypes.string),
    }),
    technologies: PropTypes.arrayOf(PropTypes.string),
    repository: PropTypes.string,
    view: PropTypes.string,
    visuals: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.shape({
        light: PropTypes.arrayOf(PropTypes.string),
        dark: PropTypes.arrayOf(PropTypes.string),
      }),
    ]),
    mobile: PropTypes.string.isRequired,
    hasDarkMode: PropTypes.bool.isRequired,
  }).isRequired,
};

export default Project;
