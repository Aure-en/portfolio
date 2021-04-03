import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useLanguage } from "../../contexts/LanguageContext";
import Preview from "./Preview";

function Project({ project }) {
  const { language } = useLanguage();

  return (
    <Wrapper id={`project-${project.id}`}>
      <Container>
        <Preview visuals={project.visuals} hasDarkMode={project.hasDarkMode} />

        <Content>
          <Header>
            <Title>{project.title}</Title>
            <Number>
              {project.id < 10 && "0"}
              {project.id}
            </Number>
          </Header>

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
        </Content>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  max-width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media all and (min-width: 768px) {
    max-width: 60rem;
    flex-direction: row;
  }
`;

const Content = styled.div`
  margin: 3rem 0 3rem 3rem;
`;

const Header = styled.div`
  display: inline-block;
  position: relative;
`;

const Title = styled.h2`
  font-family: "Playfair Display", "Source Sans Pro", "Open Sans",
    "Trebuchet MS", "Verdana", sans-serif;
  font-size: 5rem;
  line-height: 5rem;
  margin: 0 0 2rem 0;
  font-weight: 400;
`;

const Number = styled.span`
  display: flex;
  align-items: center;
  font-family: "Playfair Display", "Source Sans Pro", "Open Sans",
    "Trebuchet MS", "Verdana", sans-serif;
  font-size: 1.125rem;
  position: absolute;
  bottom: -1.125rem;
  right: -5rem;

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
  margin: 2rem 0 0 3rem;
`;

const StackList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
`;

const Stack = styled.li`
  font-size: 0.875rem;
  margin: 0 0.5rem;
`;

const Links = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
`;

const Link = styled.a`
  text-transform: uppercase;
  align-self: flex-end;
  margin-top: 0.5rem;
  grid-column: 2;
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
    hasDarkMode: PropTypes.bool.isRequired,
  }).isRequired,
};

export default Project;
