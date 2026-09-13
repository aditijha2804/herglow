const registerForm = document.getElementById("registerForm");
const registerMessage = document.getElementById("registerMessage");

if (registerForm) {
    registerForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        try {
            const response = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            });

            const data = await response.json();

            if (response.ok) {
                registerMessage.textContent = data.message;
                registerMessage.className = "mt-3 text-center text-success";

                registerForm.reset();
            } else {
                registerMessage.textContent = data.message;
                registerMessage.className = "mt-3 text-center text-danger";
            }

        } catch (error) {
            console.error(error);

            registerMessage.textContent =
                "Unable to connect to the HerGlow server.";

            registerMessage.className =
                "mt-3 text-center text-danger";
        }
    });
}
const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");

if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value;

        try {
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });

            const data = await response.json();

            if (response.ok) {
                loginMessage.textContent = data.message;
                loginMessage.className = "mt-3 text-center text-success";

                localStorage.setItem("herglowUser", JSON.stringify(data.user));
            } else {
                loginMessage.textContent = data.message;
                loginMessage.className = "mt-3 text-center text-danger";
            }

        } catch (error) {
            console.error(error);

            loginMessage.textContent =
                "Unable to connect to the HerGlow server.";

            loginMessage.className =
                "mt-3 text-center text-danger";
        }
    });
}
// ==============================
// PROFILE
// ==============================

const profileName = document.getElementById("profileName");
const profileEmail = document.getElementById("profileEmail");

if (profileName && profileEmail) {

    const savedUser = localStorage.getItem("herglowUser");

    if (savedUser) {

        const user = JSON.parse(savedUser);

        profileName.textContent = `Welcome, ${user.name}!`;
        profileEmail.textContent = user.email;

    } else {

        profileName.textContent = "Welcome!";
        profileEmail.textContent = "Please log in to view your profile.";

    }
}
// ==============================
// LOGOUT
// ==============================

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", () => {

        localStorage.removeItem("herglowUser");

        window.location.href = "login.html";

    });
}