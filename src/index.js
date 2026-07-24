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
  // Reveals popup //
  sentMsgPopup.classList.remove("hidden");
  // Resert all text fields inside form //
  contactForm.reset();
  // timeout timer //
  setTimeout(() => {
    sentMsgPopup.classList.add("hidden");
  }, 4000);
});

// if the user clicks anywhere on the background overlay it closes the modal//
sentMsgPopup.addEventListener("click", (event) => {
  if (event.target === sentMsgPopup) {
    sentMsgPopup.classList.add("hidden");
  }
});
