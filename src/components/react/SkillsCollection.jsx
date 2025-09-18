import { useEffect, useState } from "react";
import SkillsBox from "./SkillsBox";
import { isMobileDevice } from "../../function/isMobileDevice";
import LineSkills from "./LineSkills";

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
/* 
            < SkillsBox
                key={i}
                title={skill.title}
                progress={skill.progress}
                skillsID={skill.id}
                index={i}
                icon={skill.id}
                total={baseSkills.length}
            />
*/
export function SkillsCollection() {
    const [isShrink, setShrinking] = useState(false);

    return isMobileDevice ? (
        <>
            <div className={` absolute w-[600px] h-[600px] p-10 bg-amber-50 z-[-50] rounded-full`}
                style={{
                    top: `50%`,
                    left: `50%`,
                    transform: "translate(-50%, -50%)",
                }}
                onMouseEnter={() => setShrinking(false)}   // ✅ set true when mouse enters
                onMouseLeave={() => setShrinking(true)}
            >

                {baseSkills.map((skill, i) => (
                    <SkillsBox
                        key={i}
                        title={skill.title}
                        progress={skill.progress}
                        skillsID={skill.id}
                        index={i}
                        icon={skill.id}
                        total={baseSkills.length}
                    />
                ))}
                <LineSkills shrink={isShrink} />
            </div>
        </>
    )
        : <h1>Hello</h1>
}