import { useEffect, useRef, useState } from 'react'

export default function LineSkills({ shrink = false }) {
    const lineRef = useRef(null);
    const snapTargetRef = useRef(null);
    const [isHoveringSkill, setIsHoveringSkill] = useState(false);

    // Handle shrink animation
    useEffect(() => {
        const line = lineRef.current;
        if (!line) return;



        /* if (shrink) {
            // Animate shrinking to center with smooth transition
            line.style.transition = 'width 0.5s ease-out, opacity 0.5s ease-out';
            line.style.width = '0px';
        } else {
            // Reset transition and opacity
            line.style.transition = 'none';
            line.style.opacity = '1';
        } */
    }, [shrink]);

    useEffect(() => {
        function updateLine(e) {
            const line = lineRef.current;
            if (!line || shrink) return; // Don't update if shrinking

            // Center of screen (viewport center, not including scroll)
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;

            // Target position (either snap target or cursor)
            let targetX, targetY;
            if (snapTargetRef.current) {
                // For skill snapping, we need to convert absolute coordinates to viewport coordinates
                targetX = snapTargetRef.current.x - window.scrollX;
                targetY = snapTargetRef.current.y - window.scrollY;
            } else {
                // Mouse position relative to viewport
                targetX = e.clientX;
                targetY = e.clientY;
            }

            // Distance & angle from center to target
            const dx = targetX - centerX;
            const dy = targetY - centerY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const angle = Math.atan2(dy, dx) * (180 / Math.PI);

            // Update line with smooth transition when snapping
            if (snapTargetRef.current && !isHoveringSkill) {
                line.style.transition = 'width 0.3s ease-out, transform 0.3s ease-out';
                setIsHoveringSkill(true);
            } else if (!snapTargetRef.current && isHoveringSkill) {
                line.style.transition = 'width 0.3s ease-out, transform 0.3s ease-out';
                setIsHoveringSkill(false);
                setTimeout(() => {
                    if (lineRef.current && !snapTargetRef.current) {
                        lineRef.current.style.transition = 'none';
                    }
                }, 300);
            } else if (!snapTargetRef.current) {
                line.style.transition = 'none';
            }

            // Set width to exact distance and rotate around the center point
            line.style.width = `${distance}px`;
            line.style.transform = `translateY(-50%) rotate(${angle}deg)`;
        }

        function handleSkillHover(event) {
            snapTargetRef.current = {
                x: event.detail.x,
                y: event.detail.y
            };
            // Trigger update to snap to the skill
            updateLine({ clientX: 0, clientY: 0 }); // Dummy event, will use snap target
        }

        function handleSkillUnhover() {
            snapTargetRef.current = null;
        }

        // Add all event listeners
        window.addEventListener("mousemove", updateLine);
        window.addEventListener("skill-hover", handleSkillHover);
        window.addEventListener("skill-unhover", handleSkillUnhover);

        return () => {
            window.removeEventListener("mousemove", updateLine);
            window.removeEventListener("skill-hover", handleSkillHover);
            window.removeEventListener("skill-unhover", handleSkillUnhover);
        };
    }, [shrink, isHoveringSkill]);
    return (
        <div
            ref={lineRef}
            className="absolute bg-black h-1 z-[-20] pointer-events-auto"
            style={{
                top: `50%`,
                left: `50%`,
                width: '0px', // Start with 0 width
                transformOrigin: "0 50%", // Rotate from left center (the center point)
                transform: "translateY(-50%)", // Only center vertically, horizontal positioning handled by left: 50%

            }}
        >
        </div>
    )
}
