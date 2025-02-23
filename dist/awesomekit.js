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
