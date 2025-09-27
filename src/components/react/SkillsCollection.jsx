import { useEffect, useState } from "react";
import SkillsBox from "./SkillsBox";
import SkillTooltip from "./SkillTooltip";
import { isMobileDevice } from "../../function/isMobileDevice";
import LineSkills from "./LineSkills";
import { animate, onScroll } from "animejs";
import { baseSkills } from "../../data/skillsData";
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
    const [showContent, setShowContent] = useState(false);
    useEffect(() => {
        animate("#circle-of-skills", {
            width: "600px",
            height: "600px",
            opacity: [0, 1],
            duration: 300,
            easing: "easeOutQuad",
            delay: 1200,
            autoplay: onScroll({

            }),
            onComplete: () => setShowContent(true),
        });
    }, [])

    return isMobileDevice ? (
        <>
            <SkillTooltip />
            <div id="circle-of-skills" className={`absolute w-[0px] h-[0px] p-10 bg-amber-50 z-[-50] rounded-full`}
                style={{
                    top: `50%`,
                    left: `50%`,
                    transform: "translate(-50%, -50%)",
                }}
                onMouseEnter={() => setShrinking(false)}   // ✅ set true when mouse enters
                onMouseLeave={() => setShrinking(true)}
            >

                {showContent &&
                    baseSkills.map((skill, i) => (
                        <SkillsBox
                            key={i}
                            title={skill.title}
                            progress={skill.progress}
                            skillsID={skill.id}
                            index={i}
                            icon={skill.id}
                            total={baseSkills.length}
                        />
                    ))
                }
                < LineSkills shrink={isShrink} />

            </div>
            {/* Cursor-following tooltip that appears in front of all elements */}

        </>
    )
        : <h1>Hello</h1>
}