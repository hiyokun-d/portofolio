export const isMobileDevice = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    console.log(`User Agent: ${userAgent}`);

    if (/android/i.test(userAgent)) return true;
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) return true;

    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isSmallScreen = window.innerWidth <= 768;

    if (hasTouch && isSmallScreen) return true;
    if (window.matchMedia && window.matchMedia("(pointer: coarse)").matches) return true;
    return false;
};