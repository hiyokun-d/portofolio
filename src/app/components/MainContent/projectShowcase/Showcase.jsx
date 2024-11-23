"use client"
import React, { useEffect, useRef, useState } from 'react';
import anime from 'animejs';
import styles from './styles.module.css';
import Image from 'next/image';

const categories = ["All", "Web Development", "Mobile App", "UI/UX Design"];

const ProjectCard = ({ title, description, category, imageSrc }) => {
  return (
    <div className={styles.projectCard}>
      <div className={styles.projectImage}>
        <Image
          src={imageSrc}
          alt={title}
          width={200}
          height={300}
          layout="responsive"
        />
      </div>
      <div className={styles.projectInfo}>
        <h2 className={styles.projectTitle}>{title}</h2>
        <p className={styles.projectDescription}>{description}</p>
        <div className={styles.projectCategory}>{category}</div>
      </div>
    </div>
  );
}
const Showcase = () => {
  return (
    <section className={`full-section ${styles.mainContent}`}>
      <h1 className={styles.showcaseTitle}>Project Showcase</h1>

      <ProjectCard title={"string"} description="lorem" category="game" imageSrc={"https://via.placeholder.com/200x300"} />
    </section>
  );
};

export default Showcase;
