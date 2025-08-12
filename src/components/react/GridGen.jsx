import React, { useEffect, useMemo, useCallback } from 'react';
import { animate, onScroll, stagger } from 'animejs';

const GRID_WIDTH = 10;
const GRID_HEIGHT = 6;

export default function GridGen({ }) {
    let animating = false
    const handleClick = useCallback((e) => {
        const fromIndex = parseInt(e.currentTarget.dataset.index, 10);
        if (animating) return;
        animating = true;

        animate(".bg-cell", {
            backgroundColor: [
                "rgba(255, 255, 255, 0.1)",
                "rgba(255, 255, 255, 0)"
            ],
            border: ["1px solid rgba(40, 40, 40, 0.333)", "1px solid rgba(96, 96, 96, 0.1)"],
            translateY: [-10, 0],
            boxShadow: [
                "0px 2px 5px rgba(198, 198, 198, 0.5)",
                "0px 0px 0px rgba(0, 0, 0, 0)"
            ],
            delay: stagger(45, { grid: [GRID_WIDTH, GRID_HEIGHT], from: fromIndex }),
            duration: 350,
            easing: 'easeInOutQuad',
            onComplete: () => {
                animating = false;
            }
        });
    }, []);

    useEffect(() => {
        animate(".bg-cell", {
            border: ["50px solid red", "1px solid rgba(96, 96, 96, 0.1)"],
            backgroundColor: ["rgba(255, 255, 255, 0.1)", "rgba(255, 0, 0, 0.5)", "rgba(255, 255, 255, 0)"],
            delay: stagger(65, { grid: [GRID_WIDTH, GRID_HEIGHT], from: "center" }),
            duration: 450,
            easing: 'inBounce',
            autoplay: onScroll({

                enter: "enter+=80 bottom-=80",
                onLeaveForward: () => {
                    animate(".bg-cell", {
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        border: "1px solid rgba(40, 40, 40, 0.333)",
                        translateY: -10,
                        boxShadow: "0px 2px 5px rgba(198, 198, 198, 0.5)"
                    });
                }
            })
        })

    }, []);

    const rect = useMemo(() => {
        const cells = [];
        for (let i = 0; i < GRID_WIDTH * GRID_HEIGHT; i++) {
            cells.push(
                <div
                    key={i}
                    className="bg-cell w-full h-full bg-transparent border-0"
                    data-index={i}
                    onClick={handleClick}
                />
            );
        }
        return cells;
    }, [handleClick]);

    return <>{rect}</>;
}