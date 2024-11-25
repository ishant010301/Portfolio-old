// Cache DOM elements to avoid repeated querying
const outerCursor = document.getElementById("outerCursor");
const innerCursor = document.getElementById("innerCursor");
const toparrow = document.getElementById("toparrow");
const navmenu = document.getElementById("navmenu");
const navmenulist = document.getElementById("navmenulist");

let mouseX = 0,
  mouseY = 0; // Track mouse position
let outerX = 0,
  outerY = 0; // Track outer cursor position
const easeAmount = 0.1; // Adjust for slower movement

// Throttle mousemove events by using requestAnimationFrame
let lastMouseMoveTime = 0;
const throttleMouseMove = (e) => {
  const now = performance.now();
  if (now - lastMouseMoveTime > 1) {
    mouseX = e.clientX;
    mouseY = e.clientY;

    innerCursor.style.left = `${mouseX}px`;
    innerCursor.style.top = `${mouseY}px`;
    innerCursor.style.opacity = "1";
    innerCursor.style.display = "block";
    outerCursor.style.opacity = "1";
    outerCursor.style.display = "block";
    lastMouseMoveTime = now;
  }
};

// Animate cursor with smooth easing
function animateCursor() {
  outerX += (mouseX - outerX) * easeAmount;
  outerY += (mouseY - outerY) * easeAmount;
  outerCursor.style.left = `${outerX}px`;
  outerCursor.style.top = `${outerY}px`;
  requestAnimationFrame(animateCursor);
}

animateCursor();

document.addEventListener("mouseleave", () => {
  outerCursor.style.opacity = "0";
  innerCursor.style.opacity = "0";
  document.body.classList.add("mouse-leave");
});

document.addEventListener("mouseenter", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  innerCursor.style.left = `${mouseX}px`;
  innerCursor.style.top = `${mouseY}px`;
  document.body.classList.remove("mouse-leave");
  innerCursor.style.opacity = "1";
  outerCursor.style.opacity = "1";
});

// Load Lottie animations after a delay
const loadLottieAnimations = () => {
  if (innerCursor) {
    lottie.loadAnimation({
      container: innerCursor,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "../public/lottie/animationcursor.json",
    });
  }

  if (toparrow) {
    const lottieAnimation = lottie.loadAnimation({
      container: toparrow,
      renderer: "svg",
      loop: false,
      autoplay: false,
      path: "../public/lottie/Arrow front.json",
    });

    // Hover events for toparrow
    const onArrowHover = () => {
      document.body.classList.add("button-hovered");
      toparrow.style.filter = "invert()";
      lottieAnimation.setDirection(1);
      lottieAnimation.play();
    };
    const onArrowUnhover = () => {
      document.body.classList.remove("button-hovered");
      toparrow.style.filter = "none";
      lottieAnimation.setDirection(-1);
      lottieAnimation.play();
    };

    toparrow.addEventListener("mouseenter", onArrowHover);
    toparrow.addEventListener("mouseleave", onArrowUnhover);
  }

  if (navmenu) {
    const navlottieAnimation = lottie.loadAnimation({
      container: navmenu,
      renderer: "svg",
      loop: false,
      autoplay: false,
      path: "../public/lottie/nav.json",
    });

    // Hover events for toparrow
    const onNavClick = () => {
      document.body.classList.add("button-hovered");
      navmenu.style.filter = "none";
      navmenulist.style.opacity = "1";
      navmenulist.style.pointerEvents = "auto";
      navmenulist.style.transform = "translateX(-80px)";
      navlottieAnimation.setDirection(1);
      navlottieAnimation.play();
    };

    const onNavHover = () => {
      document.body.classList.add("button-hovered");
      navmenu.style.filter = "invert()";
      navmenulist.style.pointerEvents = "none";
      navmenulist.style.opacity = "0";
      navlottieAnimation.setDirection(-1);
      navlottieAnimation.play();
    };

    const onNavUnhover = () => {
      document.body.classList.remove("button-hovered");
      navmenu.style.filter = "none";
      navmenulist.style.transform = "translateX(0px)";
      navmenulist.style.pointerEvents = "none";
      navmenulist.style.opacity = "0";
      navlottieAnimation.setDirection(-1);
      navlottieAnimation.play();
    };

    navmenu.addEventListener("mousedown", onNavClick);
    navmenu.addEventListener("mouseenter", onNavHover);
    navmenu.addEventListener("mouseleave", onNavUnhover);
    navmenulist.addEventListener("mouseup", onNavUnhover);
  }
};

// Optimize Lottie loading with a timeout
setTimeout(loadLottieAnimations, 500);

// Scroll event listener
window.addEventListener("scroll", () => {
  if (
    document.body.scrollTop > 200 ||
    document.documentElement.scrollTop > 200
  ) {
    toparrow.style.transform = "translateY(0px)";
    navmenu.style.transform = "translateY(-80px)";
  } else {
    toparrow.style.transform = "translateY(100px)";
    navmenu.style.transform = "translateY(0px)";
  }
});

// Mouse movement handler
document.addEventListener("mousemove", throttleMouseMove);

// Mouse down/up events for cursor effects
document.addEventListener("mousedown", () =>
  document.body.classList.add("cursor-click")
);
document.addEventListener("mouseup", () =>
  document.body.classList.remove("cursor-click")
);

// Add/remove hover class for form elements
const addButtonHover = (e) => {
  if (["BUTTON", "INPUT", "TEXTAREA"].includes(e.target.tagName)) {
    document.body.classList.add("button-hovered");
  }
};

const removeButtonHover = (e) => {
  if (["BUTTON", "INPUT", "TEXTAREA"].includes(e.target.tagName)) {
    document.body.classList.remove("button-hovered");
  }
};

document.body.addEventListener("mouseover", addButtonHover);
document.body.addEventListener("mouseout", removeButtonHover);

// Scroll to top functionality
if (toparrow) {
  toparrow.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

const loadLoadingAnimation = () => {
  const loadingContainer = document.getElementById("lottie-loading");

  if (loadingContainer) {
    // Load the Lottie animation
    const animation = lottie.loadAnimation({
      container: loadingContainer,
      renderer: "svg",
      loop: false, // Play once
      autoplay: true,
      path: "../public/lottie/animationcursor.json",
    });

    // When the animation completes, hide the loading screen
    animation.addEventListener("complete", hideLoadingScreen);
  } else {
    console.error("Loading container not found!");
  }
};

// Function to hide the loading screen
const hideLoadingScreen = () => {
  const loadingScreen = document.getElementById("loading");
  if (loadingScreen) {
    // Fade out the loading screen
    loadingScreen.style.transition = "opacity 0.5s";
    loadingScreen.style.opacity = "0";

    // Remove from the DOM after fade-out
    setTimeout(() => {
      loadingScreen.style.display = "none";
    }, 500);
  } else {
    console.error("Loading screen element not found!");
  }
};

// Initialize loading animation on DOMContentLoaded
document.addEventListener("DOMContentLoaded", loadLoadingAnimation);
