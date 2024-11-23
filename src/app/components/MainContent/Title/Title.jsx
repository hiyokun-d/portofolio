"use client"
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import styles from "./title.module.css";
import bg from "@/app/background/background-title.gif";
import crownIcon from "@/app/background/hiyo-icon.png"
import anime from 'animejs';
import { Coffee, Code, Star, Zap, Music } from 'lucide-react';

export default function Title() {
  const [isIconHovered, setIsIconHovered] = useState(false);
  const iconRef = useRef(null);
  const mainRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentNameIndex, setCurrentNameIndex] = useState(0);
  const names = ["Daffa", "Hiyo"];
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (mainRef.current) {
        const scrollPosition = window.scrollY;
        const mainHeight = mainRef.current.offsetHeight;
        const windowHeight = window.innerHeight;
        const maxScroll = mainHeight - windowHeight;
        const progress = Math.min(scrollPosition / maxScroll, 1);
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Name animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNameIndex((prevIndex) => (prevIndex + 1) % names.length);
    }, 3000); // Change name every 3 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    anime({
      targets: '.animated-name',
      opacity: [0, 1],
      easing: 'easeOutQuad',
      duration: 800
    });
  }, [currentNameIndex]);

  useEffect(() => {
    // Initial animations
    anime({
      targets: ".slide-in",
      translateX: ['-100%', '0%'],
      duration: 800,
      easing: "easeOutElastic(1, .8)"
    });

    anime({
      delay: 600,
      targets: ".animatedMain",
      opacity: [0, 1],
      scale: [0.8, 1],
      duration: 1000,
      easing: "easeOutExpo"
    });

    anime({
      delay: 1000,
      targets: ".grow-in",
      opacity: [0, 1],
      scale: [0.3, 1],
      duration: 800,
      easing: 'easeOutBounce'
    });

    // Floating icons animation
    anime({
      targets: '.floating-icon',
      translateY: ['-.75rem', '.75rem'],
      duration: 1500,
      loop: true,
      direction: 'alternate',
      easing: 'easeInOutSine',
      delay: (el, i) => i * 100
    });

  }, [])

  // Mouse move effect for icon
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (iconRef.current) {
        const { left, top, width, height } = iconRef.current.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        const deltaX = (e.clientX - centerX) / 15; // Reduced movement
        const deltaY = (e.clientY - centerY) / 15; // Reduced movement

        setMousePosition({ x: deltaX, y: deltaY });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Icon animation
  const animateIcons = useCallback(() => {
    if (isIconHovered) {
      anime({
        targets: '.icon-item',
        translateX: (el, i) => [0, Math.cos(i * Math.PI / 2.5) * 150],
        translateY: (el, i) => [0, Math.sin(i * Math.PI / 2.5) * 150],
        scale: [0.5, 1.2], // Start from a larger scale and scale up
        opacity: [0, 1],
        duration: 200, // Increase duration for a more dramatic effect
        delay: anime.stagger(100), // Increase stagger delay for timing
        easing: 'easeOutElastic(1, .6)' // More elastic easing
      });
    } else {
      anime({
        targets: '.icon-item',
        translateX: 0,
        translateY: 0,
        scale: 0,
        opacity: 0,
        duration: 600,
        easing: 'easeInSine'
      });
    }
  }, [isIconHovered]);

  useEffect(() => {
    animateIcons();
  }, [isIconHovered, animateIcons]);

  const blurIntensity = Math.min(scrollProgress * 20, 10); // Max blur of 10px
  const fadeOpacity = Math.min(scrollProgress * 2, 1); // Max opacity of 1

  return (
    <main
      ref={mainRef}
      className={`${styles.main} ${scrollProgress > 0 ? styles.scrolled : ''} full-section`}
      style={{
        backgroundImage: `url(${bg.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        '--blur-intensity': `${blurIntensity}px`,
        '--fade-opacity': fadeOpacity,
      }}
    >

    <div className={styles.contentContainer}>
    <section id="text" className={`${styles.content} slide-in`}>
      <div className={`${styles.bgMainContent} animatedMain`}>
        <h1>
          Hi, I'm{' '}
          <span className={`${styles.name} grow-in animated-name`}>
            {names[currentNameIndex]}
          </span>
        </h1>
        <p className={styles.typewriter}>Making something fun with simple code</p>
      </div>
    </section>
    </div>
  
    <section id="images" className={styles.imagesSection}>
      <div
        className={styles.iconContainer}
        onMouseEnter={() => setIsIconHovered(true)}
        onMouseLeave={() => setIsIconHovered(false)}
        ref={iconRef}
        style={{
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
        }}
      >
        <div className={styles.iconCircle}>
          <Image
            src={`${crownIcon.src}`}
            alt="Interactive Icon"
            width={200}
            height={200}
            className={styles.mainIcon}
          />
        </div>
        <Coffee className={`${styles.iconItem} icon-item`} size={48} color="#e0e0e0" />
        <Code className={`${styles.iconItem} icon-item`} size={48} color="#00bcd4" />
        <Star className={`${styles.iconItem} icon-item`} size={48} color="#ffd54f" />
        <Zap className={`${styles.iconItem} icon-item`} size={48} color="#ff4081" />
        <Music className={`${styles.iconItem} icon-item`} size={48} color="#4caf50" />
      </div>
    </section>
  </main>
  );
}