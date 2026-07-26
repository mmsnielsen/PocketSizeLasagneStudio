// HEADER SECTION //

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 20) {
    header.classList.add("header--scrolled");
  } else {
    header.classList.remove("header--scrolled");
  }
});

// PROJECTS SECTION //

const projectButtons = document.querySelectorAll(".projects-trigger-btn");

projectButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const contentId = button.getAttribute("aria-controls");
    const contentDrawer = document.getElementById(contentId);

    const isExpanded = button.getAttribute("aria-expanded") === "true";

    button.setAttribute("aria-expanded", !isExpanded);

    if (contentDrawer) {
      contentDrawer.setAttribute("aria-hidden", isExpanded);
    }

    // Rotates the '+' icon to 'x' symbol when open //
    const icon = button.querySelector(".projects-icon");
    if (icon) {
      if (!isExpanded) {
        icon.style.transform = "rotate(45deg)";
      } else {
        icon.style.transform = "rotate(0deg)";
      }
    }
  });
});

// SENT MSG OVERLAY POP UP//

const contactForm = document.getElementById("contact-form");
const sentMsgPopup = document.getElementById("sent-msg-popup");
// listening for user clicking submit btn //
contactForm.addEventListener("submit", (event) => {
  // stops page from refreshing automatcially //
  event.preventDefault();

  // 1. Gather all the data typed into the form input boxes
  const myForm = event.target;
  const formData = new FormData(myForm);

  // Convert our input fields into a clean JSON data object format
  const object = {};
  formData.forEach((value, key) => (object[key] = value));
  const json = JSON.stringify(object);

  // 2. Secretly send the text data to Netlify's processing server in the background
  fetch("https://staticforms.xyz", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: json,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        // Reveals popup //
        sentMsgPopup.classList.remove("hidden");
        // Resert all text fields inside form //
        contactForm.reset();
        // timeout timer //
        setTimeout(() => {
          sentMsgPopup.classList.add("hidden");
        }, 4000);
      } else {
        console.error("Form Processing Error:", data.message);
      }
    })
    .catch((error) => {
      // Safety check: logs an alert in your inspect window if your network drops
      console.error("Netlify Submission Error:", error);
    });
});

// if the user clicks anywhere on the background overlay it closes the modal//
sentMsgPopup.addEventListener("click", (event) => {
  if (event.target === sentMsgPopup) {
    sentMsgPopup.classList.add("hidden");
  }
});
