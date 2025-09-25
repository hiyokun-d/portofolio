import { animate } from 'animejs';
import { useEffect, useRef, useState } from 'react'

/**
 * LineSkills Component
 * 
 * This component creates a dynamic line that follows the cursor or snaps to skills
 * when the user hovers over the SkillsCollection container.
 * 
 * @param {boolean} shrink - When true, line will animate to width 0. When false, line follows cursor.
 */
export default function LineSkills({ shrink = false }) {
    const lineRef = useRef(null);
    const snapTargetRef = useRef(null);
    const [isHoveringSkill, setIsHoveringSkill] = useState(false);
    const animationFrameRef = useRef(null); // For debouncing animation
    const lastWidthRef = useRef(0); // Track the last calculated width

    // Handle shrink/expand effect separately from mouse tracking
    useEffect(() => {
        const line = lineRef.current;
        if (!line) return;

        // Cancel any running animations
        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
            animationFrameRef.current = null;
        }

        if (shrink) {
            // Shrink animation when leaving the container
            animate(line, {
                width: 0,
                duration: 700,
                easing: "easeInOutQuad"
            });
        } else {
            // Expand to last known width or a default value
            animate(line, {
                width: lastWidthRef.current || 100,
                duration: 700,
                easing: "easeInOutQuad"
            });
        }
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

            // Store last calculated width for when container is re-entered
            lastWidthRef.current = distance;

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

            // if (snapTargetRef.current && !isHoveringSkill) {
            //     setIsHoveringSkill(true);
            //     animate(line, {
            //         width: distance,
            //         duration: 300,
            //         easing: "easeOutSine"
            //     });
            // } else if (!snapTargetRef.current && isHoveringSkill) {
            //     setIsHoveringSkill(false);
            // }

            // Debounce frequent updates with requestAnimationFrame
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }

            animationFrameRef.current = requestAnimationFrame(() => {
                // Only animate if not shrinking
                if (!shrink) {
                    // For normal cursor tracking, animate with shorter duration
                    if (!snapTargetRef.current) {
                        animate(line, {
                            width: distance,
                            duration: 100, // Faster for cursor tracking
                            easing: "linear"
                        });
                    }

                    // Always update rotation angle immediately
                    line.style.transform = `translateY(-50%) rotate(${angle}deg)`;
                }
                animationFrameRef.current = null;
            });
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
            // Clean up animations and event listeners
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
                animationFrameRef.current = null;
            }
            window.removeEventListener("mousemove", updateLine);
            window.removeEventListener("skill-hover", handleSkillHover);
            window.removeEventListener("skill-unhover", handleSkillUnhover);
        };
    }, [shrink, isHoveringSkill]);
    return (
        <div
            ref={lineRef}
            className="absolute bg-black h-1 z-[-20] pointer-events-auto line-something"
            style={{
                top: `50%`,
                left: `50%`,
                transformOrigin: "0 50%", // Rotate from left center (the center point)
                transform: "translateY(-50%)", // Only center vertically, horizontal positioning handled by left: 50%
                width: "0px" // Start with 0 width by default
            }}
        >
        </div>
    )
}
