// =========================================
// SELF-CARE — MOOD CHECK
// =========================================

const moodButton = document.getElementById("moodCheckBtn");
const moodResult = document.getElementById("moodResult");


moodButton.addEventListener("click", function () {

    const selectedMood =
        document.querySelector('input[name="mood"]:checked');


    if (!selectedMood) {

        moodResult.style.display = "block";

        moodResult.innerHTML = `
            <strong>Choose a mood first.</strong>
            <p>Take a moment to check in with yourself.</p>
        `;

        return;
    }


    const messages = {

        happy:
            "Keep that positive energy going. Enjoy something that makes you smile today.",

        calm:
            "Beautiful. Protect that calm feeling and give yourself permission to slow down.",

        tired:
            "Your body may be asking for rest. Be gentle with yourself and take a small break.",

        stressed:
            "Take a slow breath. You don't have to solve everything at once. Give yourself a moment."
    };


    moodResult.style.display = "block";

    moodResult.innerHTML = `
        <p class="eyebrow">
            YOUR SELF-CARE NOTE
        </p>

        <h3>
            ${messages[selectedMood.value]}
        </h3>
    `;


    moodResult.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

});
// =========================================
// BREATHING EXERCISE
// =========================================

const breathingCircle =
    document.querySelector(".breathing-circle");


breathingCircle.addEventListener("click", function () {

    breathingCircle.classList.toggle("breathing-active");

});