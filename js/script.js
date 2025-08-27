 // Initialize AOS animation library
      AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
      });

      // DOM elements
      const burger = document.getElementById("burger");
      const menuPanel = document.getElementById("menuPanel");
      const closeBtn = document.getElementById("btn-close");
      const header = document.getElementById("main-header");
      const backToTop = document.getElementById("backToTop");
      const loader = document.getElementById("loader");

      // Mobile menu functionality
      burger.addEventListener("click", () => {
        menuPanel.classList.add("active");
        document.body.style.overflow = "hidden";
      });

      closeBtn.addEventListener("click", () => {
        menuPanel.classList.remove("active");
        document.body.style.overflow = "auto";
      });

      // Close mobile menu when clicking on links
      const menuLinks = document.querySelectorAll("#menuPanel .nav a");
      menuLinks.forEach((link) => {
        link.addEventListener("click", () => {
          menuPanel.classList.remove("active");
          document.body.style.overflow = "auto";
        });
      });

      // Header scroll effect
      window.addEventListener("scroll", () => {
        header.classList.toggle("scrolled", window.scrollY > 50);

        // Show/hide back to top button
        if (window.scrollY > 300) {
          backToTop.style.display = "flex";
        } else {
          backToTop.style.display = "none";
        }
      });

      // Back to top functionality
      backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });

      // Counter animation
      const counters = document.querySelectorAll(".counter");
      const counterSpeed = 200;

      const startCounter = () => {
        counters.forEach((counter) => {
          const target = +counter.getAttribute("data-target");
          const count = +counter.innerText;
          const increment = target / counterSpeed;

          if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(() => startCounter(counter), 1);
          } else {
            counter.innerText = target + "+";
          }
        });
      };

      // Initialize counters when they are in viewport
      const counterSection = document.querySelector(".intro-section");
      let counterStarted = false;

      const checkCounterView = () => {
        const counterPosition = counterSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;

        if (counterPosition < screenPosition && !counterStarted) {
          startCounter();
          counterStarted = true;
        }
      };

      window.addEventListener("scroll", checkCounterView);

      // Page loading animation
      window.addEventListener("load", () => {
        setTimeout(() => {
          loader.classList.add("hidden");
        }, 1500);
      });

      // Form validation
      const contactForm = document.querySelector(".contact-form");
      if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
          e.preventDefault();
          // Simple form validation
          const name = document.getElementById("name").value;
          const email = document.getElementById("email").value;
          const message = document.getElementById("message").value;

          if (name && email && message) {
            // Here you would typically send the form data to a server
            alert("Thank you for your message! We will get back to you soon.");
            contactForm.reset();
          }
        });
      }

      // Initialize date inputs for booking modal
      const checkIn = document.getElementById("checkIn");
      const checkOut = document.getElementById("checkOut");

      if (checkIn && checkOut) {
        // Set minimum dates to today
        const today = new Date().toISOString().split("T")[0];
        checkIn.min = today;
        checkOut.min = today;

        // Update checkout min date when checkin changes
        checkIn.addEventListener("change", () => {
          checkOut.min = checkIn.value;
        });
      }