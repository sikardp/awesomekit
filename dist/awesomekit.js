document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".awe-slider").forEach(slider => {
        const slidesContainer = slider.querySelector(".awe-slides");
        const slides = Array.from(slidesContainer.children);
        const prevBtn = slider.querySelector(".awe-slider-prev");
        const nextBtn = slider.querySelector(".awe-slider-next");
        const autoplay = slider.dataset.autoplay === "true";
        const showIndicators = slider.dataset.indicators === "true";
        let indicatorsContainer;

        if (!slides.length) return;

        let index = 1;
        let autoSlideInterval;

        // Clone first and last slides for seamless effect
        const firstClone = slides[0].cloneNode(true);
        const lastClone = slides[slides.length - 1].cloneNode(true);
        slidesContainer.appendChild(firstClone);
        slidesContainer.prepend(lastClone);

        const totalSlides = slides.length;
        slidesContainer.style.transform = `translateX(-${100 * index}%)`;

        // Create indicators only if `data-indicators="true"`
        if (showIndicators) {
            indicatorsContainer = document.createElement("div");
            indicatorsContainer.classList.add("awe-slider-indicators");
            slider.appendChild(indicatorsContainer);

            slides.forEach((_, i) => {
                const dot = document.createElement("span");
                dot.classList.add("awe-indicator");
                dot.dataset.index = i;
                indicatorsContainer.appendChild(dot);
            });
        }

        const indicators = indicatorsContainer ? indicatorsContainer.querySelectorAll(".awe-indicator") : [];
        if (indicators.length) indicators[0].classList.add("active");

        // Update active indicator
        const updateIndicators = () => {
            let realIndex = index === 0 ? totalSlides - 1 : index === totalSlides + 1 ? 0 : index - 1;
            indicators.forEach((dot, i) => dot.classList.toggle("active", i === realIndex));
        };

        const moveSlide = () => {
            slidesContainer.style.transition = "transform 0.5s ease-in-out";
            slidesContainer.style.transform = `translateX(-${100 * index}%)`;
            updateIndicators();
        };

        const nextSlide = () => {
            if (index >= totalSlides) {
                setTimeout(() => {
                    slidesContainer.style.transition = "none";
                    index = 1;
                    slidesContainer.style.transform = `translateX(-${100 * index}%)`;
                }, 500);
            }
            index++;
            moveSlide();
            resetAutoSlide();
        };

        const prevSlide = () => {
            if (index <= 0) {
                setTimeout(() => {
                    slidesContainer.style.transition = "none";
                    index = totalSlides;
                    slidesContainer.style.transform = `translateX(-${100 * index}%)`;
                }, 500);
            }
            index--;
            moveSlide();
            resetAutoSlide();
        };

        if (showIndicators) {
            indicators.forEach(dot => {
                dot.addEventListener("click", e => {
                    index = parseInt(e.target.dataset.index) + 1;
                    moveSlide();
                    resetAutoSlide();
                });
            });
        }

        prevBtn.addEventListener("click", prevSlide);
        nextBtn.addEventListener("click", nextSlide);

        const startAutoSlide = () => {
            if (autoplay) {
                autoSlideInterval = setInterval(nextSlide, 3000);
            }
        };

        const resetAutoSlide = () => {
            if (autoplay) {
                clearInterval(autoSlideInterval);
                startAutoSlide();
            }
        };

        startAutoSlide();
    });
});

// Accordian

document.querySelectorAll(".awe-collapse-slider-container").forEach(container => {
    let isSingle = container.getAttribute("data-attribute") === "1";

    container.querySelectorAll(".awe-collapse-slider-heading").forEach(heading => {
        heading.addEventListener("click", function () {
            let content = this.nextElementSibling;
            let slider = this.parentElement;
            let isOpen = content.style.maxHeight && content.style.maxHeight !== "0px";

            if (isSingle) {
                container.querySelectorAll(".awe-collapse-slider-content").forEach(el => {
                    if (el !== content) {
                        el.style.maxHeight = null;
                        el.style.opacity = "0";
                        el.style.overflow = "hidden";
                        el.parentElement.classList.remove("active");
                    }
                });
            }

            if (isOpen) {
                content.style.maxHeight = null;
                content.style.opacity = "0";
                content.style.overflow = "hidden";
                slider.classList.remove("active");
            } else {
                content.style.display = "block";
                content.style.maxHeight = content.scrollHeight + "px";
                content.style.opacity = "1";
                content.style.overflow = "visible";
                slider.classList.add("active");
            }
        });
    });
});

// Dropdown

document.addEventListener("click", function (event) {
    document.querySelectorAll(".awe-dropdown-container").forEach(dropdown => {
        if (!dropdown.contains(event.target)) {
            dropdown.classList.remove("show");
        }
    });
});

document.querySelectorAll(".awe-dropdown-trigger").forEach(button => {
    button.addEventListener("click", function (event) {
        event.stopPropagation();
        let dropdown = this.parentElement;
        let isOpen = dropdown.classList.contains("show");

        document.querySelectorAll(".awe-dropdown-container").forEach(d => d.classList.remove("show"));

        if (!isOpen) {
            dropdown.classList.add("show");
        }
    });
});

// Notify Modal
document.addEventListener("DOMContentLoaded", function () {
    const openButtons = document.querySelectorAll(".open-popup");
    const closeButtons = document.querySelectorAll(".awe-notifypopup-close");
    const overlays = document.querySelectorAll(".awe-notifypopup-overlay");

    // Function to open popup
    function openPopup(id) {
        document.getElementById(id).classList.add("active");
        document.body.classList.add("modal-open"); // Block scrolling
    }

    // Function to close popup
    function closePopup(popup) {
        popup.classList.remove("active");
        document.body.classList.remove("modal-open"); // Unblock scrolling
    }

    // Attach event listeners to open buttons
    openButtons.forEach(button => {
        button.addEventListener("click", function () {
            let targetId = this.getAttribute("data-target");
            openPopup(targetId);
        });
    });

    // Attach event listeners to close buttons
    closeButtons.forEach(button => {
        button.addEventListener("click", function () {
            closePopup(this.closest(".awe-notifypopup-overlay"));
        });
    });

    // Close modal on overlay click
    overlays.forEach(overlay => {
        overlay.addEventListener("click", function (e) {
            if (e.target === this) closePopup(this);
        });
    });
});
