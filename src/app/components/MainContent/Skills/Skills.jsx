"use client"
import React, { useEffect, useState, useRef } from 'react';
import anime from 'animejs';
import styles from './Skills.module.css';
import { Github } from 'lucide-react';

const languageColors = {
    JavaScript: '#f1e05a',
    TypeScript: '#2b7489',
    Python: '#3572A5',
    Java: '#b07219',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Ruby: '#701516',
    Go: '#00ADD8',
};

export default function Skills() {
    const [skills, setSkills] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const fetchGitHubData = async () => {
            try {
                const response = await fetch('https://api.github.com/users/hiyokun-d/repos');
                const repos = await response.json();

                const languageCounts = {};
                let totalCount = 0;

                for (const repo of repos) {
                    if (repo.language) {
                        languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
                        totalCount++;
                        console.log(totalCount)
                    }
                }

                const skillsData = Object.entries(languageCounts)
                    .map(([name, count]) => ({
                        name,
                        progress: Math.round((count / totalCount) * 100),
                        color: languageColors[name] || '#000000'
                    }))
                    .sort((a, b) => b.progress - a.progress)
                    .slice(0, 6);

                setSkills(skillsData);
            } catch (error) {
                setSkills([
                    { name: 'JavaScript', color: '#f1e05a', progress: 85 },
                    { name: 'Python', color: '#3572A5', progress: 75 },
                    { name: 'HTML', color: '#e34c26', progress: 70 },
                    { name: 'CSS', color: '#563d7c', progress: 65 },
                    { name: 'TypeScript', color: '#2b7489', progress: 60 },
                    { name: 'Java', color: '#b07219', progress: 55 },
                ])
                console.error('Error fetching GitHub data:', error);
            }
        };

        fetchGitHubData();

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (isVisible) {
            // Animate title
            anime({
                targets: '.section-title',
                opacity: [0, 1],
                translateY: [50, 0],
                easing: 'easeOutExpo',
                duration: 1200,
            });

            // Animate description
            anime({
                targets: '.section-description',
                opacity: [0, 1],
                translateY: [30, 0],
                easing: 'easeOutExpo',
                duration: 1200,
                delay: 300,
            });

            // Animate skill items
            anime({
                targets: '.skill-item',
                opacity: [0, 1],
                translateX: [50, 0],
                easing: 'easeInBounce',
                duration: 1000,
                delay: anime.stagger(100, { start: 600 }),
            });

            // Animate skill progress bars
            anime({
                targets: '.skill-progress',
                width: (el) => el.getAttribute('data-progress') + '%',
                easing: 'spring(1, 80, 10, 0)',
                duration: 500,
                delay: anime.stagger(300, { start: 1800 }),
            });
        }
    }, [isVisible]);

    return (
        <section ref={sectionRef} className={`${styles.fullSection} ${styles.skillsSection}`}>
            <h2 className={`${styles.sectionTitle} section-title`}>My Knowledge in Code</h2>
            <p className={`${styles.sectionDescription} section-description`}>
                “Just keep learning, and you’ll get there! I promise it’ll be a fun journey.” - Me
            </p>
            <div className={styles.skillsContainer}>
                {skills.map((skill) => (
                    <div key={skill.name} className={`${styles.skillItem} skill-item`}>
                        <div className={styles.skillInfo}>
                            <h3 className={styles.skillName}>{skill.name}</h3>
                            <span className={styles.skillPercentage}>{skill.progress}%</span>
                        </div>
                        <div className={styles.skillProgressBar}>
                            <div
                                className={`${styles.skillProgress} skill-progress`}
                                style={{ backgroundColor: skill.color }}
                                data-progress={skill.progress}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>

            <footer>
                Powered by GitHub <Github size={15} />
            </footer>
        </section>
    );
}