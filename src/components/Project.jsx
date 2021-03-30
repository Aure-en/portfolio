import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useLanguage } from "../contexts/LanguageContext";

function Project({ project }) {
  const { language } = useLanguage();

  return (
    <Wrapper>
      <Container>
        <Image src="" alt="" />
        <Title>{project.title}</Title>
        <Number>{project.id}</Number>
        <Description>{project.description[language]}</Description>
        <StackList>
          {project.technologies.map((technology) => (
            <Stack>{technology}</Stack>
          ))}
        </StackList>
        <Link href={project.view}>
          {language === "en" ? "Preview" : "Visiter le site"}
        </Link>
        <Link href={project.repository}>
          {language === "en" ? "View Code" : "Voir le code"}
        </Link>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div``;

const Container = styled.div``;

const Title = styled.h2``;

const Number = styled.span``;

const Description = styled.div``;

const Image = styled.img``;

const StackList = styled.ul``;

const Stack = styled.li``;

const Link = styled.a``;

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
    visuals: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default Project;
