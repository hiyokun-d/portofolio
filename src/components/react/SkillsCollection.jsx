import { useEffect, useState } from "react";
import SkillsBox from "./SkillsBox";

export let baseSkills = [
    { id: "react", title: "React", progress: 85 },
    { id: "nextjs", title: "Next.js", progress: 80 },
    { id: "tailwindcss", title: "TailwindCSS", progress: 75 },
    { id: "nodejs", title: "Node.js", progress: 80 },
    { id: "python", title: "Python", progress: 15 },
    { id: "astro", title: "Astro", progress: 69 },
    { id: "git", title: "Git", progress: 70 },
    { id: "bash", title: "Bash", progress: 40 },
    { id: "firebase", title: "Firebase", progress: 15 },
    { id: "figma", title: "Figma", progress: 30 },
    { id: "discordjs", title: "Discord.js", progress: 50 },
    { id: "sdl", title: "SDL", progress: 20 },

    // === GitHub language data (manually taken from API) ===
    { id: "javascript", title: "JavaScript", progress: 40 },
    { id: "typescript", title: "TypeScript", progress: 25 },
    { id: "html5", title: "HTML", progress: 15 },
    { id: "css3", title: "CSS", progress: 10 },
    { id: "c", title: "C", progress: 5 },
    { id: "java", title: "Java", progress: 5 },
];

export function SkillsCollection() {
    return baseSkills.map((skill, i) => (
        <SkillsBox
            key={i}
            title={skill.title}
            progress={skill.progress}
            skillsID={skill.id}
            index={i}
            icon={skill.id}
            total={baseSkills.length}
        />
    ));
}