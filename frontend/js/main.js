// =========================================
// HERGLOW NAVIGATION
// =========================================

const currentPage =
    window.location.pathname.split("/").pop() || "index.html";

const navLinks =
    document.querySelectorAll(".herglow-navbar .nav-link");


navLinks.forEach(function (link) {

    const linkPage =
        link.getAttribute("href");

    if (linkPage === currentPage) {

        navLinks.forEach(function (item) {
            item.classList.remove("active");
        });

        link.classList.add("active");

    }

});
// =========================================
// WELCOME MESSAGE
// =========================================

const welcomeMessage =
    document.getElementById("welcomeMessage");


if (welcomeMessage) {

    const currentHour = new Date().getHours();

    let greeting;


    if (currentHour < 12) {

        greeting = "Good morning 🌸";

    } else if (currentHour < 18) {

        greeting = "Good afternoon 🌿";

    } else {

        greeting = "Good evening ✨";

    }


    welcomeMessage.textContent = greeting;

}