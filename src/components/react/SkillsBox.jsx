import { Icon } from "@iconify/react";
import { animate } from "animejs";
import { useEffect, useMemo } from "react";

// Sanitize string to make valid ID
function safeId(str) {
    return str.toLowerCase().replace(/[^a-z0-9_-]/g, "-");
}

export default function SkillsBox({ title, progress, skillsID, index, icon, total }) {
    const safeSkillsID = safeId(skillsID || "home");

    // Generate random radius once (stable with useMemo)
    const radius = useMemo(() => 190 + Math.random() * 90, []); // 160–240
    const angle = (2 * Math.PI * index) / total;

    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;

    useEffect(() => {
        animate(`#${safeSkillsID}`, {
            opacity: [0, 1],
            scale: [0.2, 1],
            top: ["50%", `calc(50% + ${y}px)`],
            left: ["50%", `calc(50% + ${x}px)`],
        });
    }, [x, y, index, safeSkillsID]);

    return (
        <div
            id={safeSkillsID}
            className="absolute group p-2 backdrop-blur-md rounded-2xl"
            style={{
                top: `50%`,
                left: `50%`,
                transform: "translate(-50%, -50%)",
                backgroundColor: "rgba(25, 25, 25, 0.5)"
            }}
        >
            <Icon
                icon={`devicon:${icon}`}
                width={40}
                className="cursor-pointer transition-transform duration-300 group-hover:scale-125"
            />

            {/* Tooltip */}
            <div className="absolute left-1/2 top-full mt-2 hidden -translate-x-1/2 rounded-lg bg-gray-800 px-3 py-1 text-sm text-white shadow-lg group-hover:block">
                <p className="font-semibold">{title}</p>
            </div>
        </div>
    );
}