// 🎯 CENTRALIZED SKILLS DATA - UPDATE HERE ONLY
// This is the single source of truth for all skill information

export const skillsData = {
    "react": {
        title: "React",
        progress: 85,
        description: "Component-based UI library",
        proficiency: "Advanced"
    },
    "nextjs": {
        title: "Next.js",
        progress: 80,
        description: "Full-stack React framework",
        proficiency: "Advanced"
    },
    "tailwindcss": {
        title: "TailwindCSS",
        progress: 75,
        description: "Utility-first CSS framework",
        proficiency: "Advanced"
    },
    "nodejs": {
        title: "Node.js",
        progress: 80,
        description: "JavaScript runtime environment",
        proficiency: "Advanced"
    },
    "python": {
        title: "Python",
        progress: 15,
        description: "General-purpose programming language",
        proficiency: "Beginner"
    },
    "astro": {
        title: "Astro",
        progress: 69,
        description: "Modern static site generator",
        proficiency: "Intermediate"
    },
    "git": {
        title: "Git",
        progress: 70,
        description: "Version control system",
        proficiency: "Intermediate"
    },
    "bash": {
        title: "Bash",
        progress: 40,
        description: "Unix shell scripting",
        proficiency: "Intermediate"
    },
    "firebase": {
        title: "Firebase",
        progress: 15,
        description: "Google's app development platform",
        proficiency: "Beginner"
    },
    "figma": {
        title: "Figma",
        progress: 30,
        description: "Design & prototyping tool",
        proficiency: "Beginner"
    },
    "discordjs": {
        title: "Discord.js",
        progress: 50,
        description: "Discord bot development library",
        proficiency: "Intermediate"
    },
    "sdl": {
        title: "SDL",
        progress: 20,
        description: "Cross-platform development library",
        proficiency: "Beginner"
    },
    "javascript": {
        title: "JavaScript",
        progress: 40,
        description: "Dynamic programming language",
        proficiency: "Intermediate"
    },
    "typescript": {
        title: "TypeScript",
        progress: 25,
        description: "Typed superset of JavaScript",
        proficiency: "Beginner+"
    },
    "html5": {
        title: "HTML",
        progress: 15,
        description: "Web markup language",
        proficiency: "Beginner+"
    },
    "css3": {
        title: "CSS",
        progress: 10,
        description: "Stylesheet language",
        proficiency: "Beginner"
    },
    "c": {
        title: "C",
        progress: 5,
        description: "Systems programming language",
        proficiency: "Beginner"
    },
    "java": {
        title: "Java",
        progress: 5,
        description: "Object-oriented programming language",
        proficiency: "Beginner"
    }
};

// Generate baseSkills array from skillsData
export const baseSkills = Object.keys(skillsData).map(id => ({
    id,
    title: skillsData[id].title,
    progress: skillsData[id].progress
}));