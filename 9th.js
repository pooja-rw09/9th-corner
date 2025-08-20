 // Get the splash screen and main content elements
        const splashScreen = document.getElementById('splash-screen');
        const mainContent = document.getElementById('main-content');

        // Wait for the entire page to load
        window.onload = () => {
            // After a short delay (e.g., 2.5 seconds), start the fade-out
            setTimeout(() => {
                splashScreen.classList.add('fade-out');
            }, 2500);

            // Listen for the end of the transition
            splashScreen.addEventListener('transitionend', () => {
                // Completely hide the splash screen and show the main content
                splashScreen.style.display = 'none';
                mainContent.classList.add('show');
            });
        };


// banner//
    function toggleMenu() {
      document.getElementById("menu").classList.toggle("active");
    }

    const carousel = document.getElementById("carousel");
    const slides = document.querySelectorAll(".slide");
    let index = 0;

    function showSlide(i) {
      index = (i + slides.length) % slides.length;
      carousel.style.transform = `translateX(-${index * 100}%)`;

      // restart text animation
      document.querySelectorAll('.slide-text').forEach(text => {
        text.style.animation = 'none';
        text.offsetHeight; // trigger reflow
        text.style.animation = '';
      });
    }

    function nextSlide() {
      showSlide(index + 1);
    }

    function prevSlide() {
      showSlide(index - 1);
    }

    setInterval(() => {
      nextSlide();
    }, 6000); // Auto-scroll every 6 seconds
  


// Mouse Trail Effect
document.addEventListener('DOMContentLoaded', () => {
    new MouseTrail();
});

class MouseTrail {
    constructor() {
        this.trail = [];
        this.maxTrail = 20;
        this.mouseX = 0;
        this.mouseY = 0;
        this.colorMode = "dark"; // "dark" for black, "light" for white
        this.init();
    }

    init() {
        // Desktop mouse tracking
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
            this.detectBackground(e.clientX, e.clientY);
        });

        // Mobile touch tracking
        document.addEventListener('touchmove', (e) => {
            if (e.touches.length > 0) {
                this.mouseX = e.touches[0].clientX;
                this.mouseY = e.touches[0].clientY;
                this.detectBackground(this.mouseX, this.mouseY);
            }
        });

        this.createTrailElements();
        this.animate();
    }

    createTrailElements() {
        for (let i = 0; i < this.maxTrail; i++) {
            const trail = document.createElement('div');
            trail.className = 'mouse-trail';
            trail.style.width = `${8 - (i * 0.3)}px`;
            trail.style.height = `${8 - (i * 0.3)}px`;
            trail.style.borderRadius = '50%';
            trail.style.position = 'fixed';
            trail.style.pointerEvents = 'none';
            trail.style.zIndex = '9999';
            trail.style.transform = 'translate(-50%, -50%)';
            document.body.appendChild(trail);
            this.trail.push({ element: trail, x: 0, y: 0 });
        }
    }

    detectBackground(x, y) {
        const elem = document.elementFromPoint(x, y);
        if (elem) {
            const bg = window.getComputedStyle(elem).backgroundColor;
            const [r, g, b] = bg.match(/\d+/g) || [];

            if (r !== undefined && g !== undefined && b !== undefined) {
                const brightness = (0.299 * r + 0.587 * g + 0.114 * b);
                this.colorMode = brightness < 128 ? "light" : "dark";
            }
        }
    }

    animate() {
        let targetX = this.mouseX;
        let targetY = this.mouseY;

        this.trail.forEach((point, i) => {
            point.x += (targetX - point.x) * 0.4;
            point.y += (targetY - point.y) * 0.4;

            point.element.style.left = point.x + 'px';
            point.element.style.top = point.y + 'px';

            // Change color smoothly
            if (this.colorMode === "light") {
                point.element.style.backgroundColor = `rgba(255,255,255,${0.8 - (i * 0.04)})`;
            } else {
                point.element.style.backgroundColor = `rgba(0,0,0,${0.8 - (i * 0.04)})`;
            }

            targetX = point.x;
            targetY = point.y;
        });

        requestAnimationFrame(() => this.animate());
    }
}

// brand //
//   <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>//
  let track = document.querySelector(".brand-track");
let brands = gsap.utils.toArray(".brand");

// Duplicate logos for seamless loop
brands.forEach(brand => {
  let clone = brand.cloneNode(true);
  track.appendChild(clone);
});

let allBrands = gsap.utils.toArray(".brand");

// Fade-in + scale-up animation when loaded
gsap.to(".brand img", {
  opacity: 1,
  scale: 1,
  stagger: 0.6,
  duration: 0.6,
  ease: "power2.out"
});

// Calculate width of one full set
let totalWidth = brands.reduce((acc, brand) => {
  return acc + brand.offsetWidth + 80; // 80px gap
}, 0);

// Infinite carousel scroll
gsap.to(track, {
  x: -totalWidth,
  duration: 20,
  ease: "none",
  repeat: -1,
  modifiers: {
    x: gsap.utils.unitize(x => parseFloat(x) % totalWidth)
  }
});

// Subtle floating animation for each brand
allBrands.forEach(brand => {
  gsap.to(brand, {
    y: "+=10",
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    duration: gsap.utils.random(2, 4),
    delay: gsap.utils.random(0, 1)
  });
});

// precision-section //
gsap.registerPlugin(ScrollTrigger);

// Split text into characters for animation
document.querySelectorAll(".split").forEach(el => {
  el.innerHTML = el.textContent
    .split("")
    .map(char => `<span class="char">${char}</span>`)
    .join("");
});

// Slide-up reveal animation (runs every scroll into view)
gsap.fromTo(
  ".char, .inline-image img",
  { y: 80, opacity: 0 },
  {
    y: 0,
    opacity: 1,
    stagger: 0.04,
    duration: 0.6,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".precision-section",
      start: "top 80%",
      toggleActions: "restart none restart none",
    }
  }
);

// Floating effect ONLY for characters (not para)
gsap.to(".char", {
  y: "+=10",
  ease: "none",
  scrollTrigger: {
    trigger: ".precision-section",
    start: "top bottom",
    end: "bottom top",
    scrub: true
  }
});


// about us //
gsap.registerPlugin(ScrollTrigger);

// Fade out ABOUT US before content appears
gsap.to(".about-title h1", {
  scale: 0.6,
  opacity: 0,
  scrollTrigger: {
    trigger: ".about-content",
    start: "top 90%",
    end: "top 70%",
    scrub: true
  }
});

// Background color change: black only during content section
ScrollTrigger.create({
  trigger: ".about-content",
  start: "top center",
  end: "bottom bottom",
  scrub: true,
  onEnter: () => {
    gsap.to(".about-section", { backgroundColor: "#000", color: "#fff", duration: 0.5 });
  },
  onLeaveBack: () => {
    gsap.to(".about-section", { backgroundColor: "#fff", color: "#000", duration: 0.5 });
  }
});



// Image fade-in from left
gsap.fromTo(".about-image",
  { x: -100, opacity: 0 },
  {
    x: 0, opacity: 1,
    scrollTrigger: {
      trigger: ".about-content",
      start: "top 80%",
      end: "top 50%",
      scrub: true
    }
  }
);

// Text fade-in from right
gsap.fromTo(".about-text",
  { x: 100, opacity: 0 },
  {
    x: 0, opacity: 1,
    scrollTrigger: {
      trigger: ".about-content",
      start: "top 80%",
      end: "top 50%",
      scrub: true
    }
  }
);

// Reveal content
ScrollTrigger.create({
  trigger: ".about-content",
  start: "top 80%",
  onEnter: () => gsap.to(".about-content", { opacity: 1, duration: 1 })
});

// choose us

// Register the GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Animation for the top hero grid images
gsap.from(".hero-grid .grid-item", {
    opacity: 0,
    y: 50,
    stagger: 0.2,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
        trigger: ".hero-gallery-section",
        start: "top 80%",
        toggleActions: "play none none none"
    }
});

// Animation for the text sections
gsap.from(".visual-container, .poetry-container", {
    opacity: 0,
    y: 50,
    stagger: 0.2,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
        trigger: ".visual-poetry-section",
        start: "top 80%",
        toggleActions: "play none none none"
    }
});

// Animation for the single gallery below
gsap.from(".main-gallery-container .gallery-item", {
    opacity: 0,
    y: 50,
    stagger: 0.15,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
        trigger: ".main-gallery-container",
        start: "top 80%",
        toggleActions: "play none none none"
    }
});

// Continuous rotation for the flower icon
gsap.to(".flower-icon", {
    rotation: 360,
    duration: 5,
    ease: "linear",
    repeat: -1,
    transformOrigin: "center center"
});

// statue
         gsap.registerPlugin(ScrollTrigger, TextPlugin);

const animatedSection = document.querySelector(".animated-section");
const statueImg = document.querySelector(".statue-img");
const quoteText = document.querySelector(".quote-text");

const quote = "I work with Lives instead of working with Lines....-Rahul Gupta";

// Floating Animation for the Statue (continuous)
gsap.to(statueImg, {
    y: "-=20",
    duration: 3,
    ease: "power1.inOut",
    repeat: -1,
    yoyo: true
});

// Glowing Background Animation (continuous)
gsap.to(".glow-bg", {
    scale: 1.1,
    opacity: 0.8,
    duration: 5,
    ease: "power1.inOut",
    repeat: -1,
    yoyo: true
});

// Timeline triggered by scrolling
const tl = gsap.timeline({
    scrollTrigger: {
        trigger: animatedSection,
        start: "top center",
        // Increase the end value to give more scroll space for typing
        end: "+=50", // Increased from a previous value, giving 500px of scroll
        scrub: 7
    }
});

// Animation 1: Move the statue to the left
tl.to(statueImg, {
    x: "-100", // Move statue 100px to the left
    duration: 2,
    ease: "power2.out"
});

// Animation 2: Start typing the quote on the right
tl.to(quoteText, {
    text: quote, // Auto-type the quote
    opacity: 1, // Make the text visible
    duration: 3,
    ease: "none"
}, "<0.5"); // Starts this animation 0.5 seconds before the previous one ends

// video
       // Wait for the window to load before running the script
        window.onload = function() {
            // Register the GSAP ScrollTrigger plugin
            gsap.registerPlugin(ScrollTrigger);

            // Get references to the DOM elements
            const videoContainer = document.getElementById('video-container');
            const scrollLeftBtn = document.getElementById('scroll-left');
            const scrollRightBtn = document.getElementById('scroll-right');
            const cardItems = gsap.utils.toArray('.card-item'); // Use GSAP's utility to get an array of elements

            // Animate cards into view on scroll using GSAP
            gsap.set(cardItems, { opacity: 0, y: 50 }); // Set initial state of cards (invisible and slightly below)

            gsap.timeline({
                scrollTrigger: {
                    trigger: ".section-container", // The section that triggers the animation
                    start: "top 80%", // When the top of the section hits 80% of the viewport
                    toggleActions: "play none none none" // Play the animation once, then do nothing
                }
            })
            .to(cardItems, {
                opacity: 1, // Animate to full opacity
                y: 0, // Animate to original vertical position
                duration: 1.2, // Duration of the animation
                stagger: 0.1, // Stagger the animation of each card by 0.1 seconds
                ease: "power2.out"
            });

            // Function to handle smooth scrolling
            const scrollCarousel = (direction) => {
                // Recalculate the scroll amount on every click for maximum reliability
                const firstCard = videoContainer.querySelector('.card-item');
                if (!firstCard) {
                    console.error("No card items found to calculate scroll amount.");
                    return;
                }
                const cardWidth = firstCard.offsetWidth;
                const style = window.getComputedStyle(videoContainer);
                const gap = parseFloat(style.columnGap);
                const scrollAmount = cardWidth + gap;

                if (direction === 'left') {
                    videoContainer.scrollBy({
                        left: -scrollAmount,
                        behavior: 'smooth'
                    });
                } else if (direction === 'right') {
                    videoContainer.scrollBy({
                        left: scrollAmount,
                        behavior: 'smooth'
                    });
                }
            };

            // Add event listeners to the buttons
            if (scrollLeftBtn && scrollRightBtn) {
                scrollLeftBtn.addEventListener('click', () => {
                    scrollCarousel('left');
                });
                
                scrollRightBtn.addEventListener('click', () => {
                    scrollCarousel('right');
                });
            } else {
                console.error("Scroll buttons not found in the DOM.");
            }
        };
        // review

         // New section for the Review Carousel
    const reviews = [
        "\"Working with this team has been an absolute pleasure. Their attention to detail and creative solutions are second to none.\"",
        "\"I'm thoroughly impressed with the quality and speed of their work. They exceeded all our expectations.\"",
        "\"The end result was exactly what we were looking for and more. A truly professional and talented group.\""
    ];
    let currentReviewIndex = 0;
    const reviewTextElement = document.getElementById('review-text');
    const reviewScrollLeftBtn = document.getElementById('review-scroll-left');
    const reviewScrollRightBtn = document.getElementById('review-scroll-right');

    const updateReview = () => {
        // Fade out the text
        reviewTextElement.style.opacity = 0;
        
        // After the fade-out, change the text and fade it back in
        setTimeout(() => {
            reviewTextElement.textContent = reviews[currentReviewIndex];
            reviewTextElement.style.opacity = 1;
        }, 500); // This should match the CSS transition duration
    };

    // Auto-slide functionality
    const slideInterval = 5000; // Change review every 5 seconds
    let autoSlideTimer;

    const startAutoSlide = () => {
        // Clear any existing timers to prevent them from stacking
        clearInterval(autoSlideTimer);
        autoSlideTimer = setInterval(() => {
            currentReviewIndex = (currentReviewIndex + 1) % reviews.length;
            updateReview();
        }, slideInterval);
    };

    // Restart the auto-slide timer after a manual interaction
    const restartAutoSlide = () => {
        clearInterval(autoSlideTimer);
        // Start a new timer after a delay to allow the user to read the review
        setTimeout(startAutoSlide, slideInterval / 2); 
    };

    // Add event listeners for manual navigation
    if (reviewScrollLeftBtn && reviewScrollRightBtn && reviewTextElement) {
        reviewScrollLeftBtn.addEventListener('click', () => {
            currentReviewIndex = (currentReviewIndex - 1 + reviews.length) % reviews.length;
            updateReview();
            restartAutoSlide();
        });
        
        reviewScrollRightBtn.addEventListener('click', () => {
            currentReviewIndex = (currentReviewIndex + 1) % reviews.length;
            updateReview();
            restartAutoSlide();
        });

        // Start the initial auto-slide
        startAutoSlide();
    }

// magazine

 // Duplicate the scroll track content to create a seamless loop
        const scrollTrack = document.querySelector('.scroll-track');
        const trackContent = scrollTrack.innerHTML;
        scrollTrack.innerHTML = trackContent + trackContent;

    // footer


        // Function to update the local time
        function updateTime() {
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
            const gmtOffset = now.toString().match(/([A-Z]+[+-]\d{4})/)[1];
            document.getElementById('local-time').textContent = `${timeString} ${gmtOffset}`;
        }

        // Update the time immediately and then every second
        updateTime();
        setInterval(updateTime, 1000);