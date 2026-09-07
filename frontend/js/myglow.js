// =========================================
// MYGLOW — GLOW SCORE
// =========================================

const waterHabit = document.getElementById("habitWater");
const skinHabit = document.getElementById("habitSkin");
const exerciseHabit = document.getElementById("habitExercise");
const selfCareHabit = document.getElementById("habitSelfCare");

const glowScore = document.querySelector(".glow-score");
const saveHabitsButton = document.getElementById("saveHabitsBtn");


// Calculate Glow Score

function calculateGlowScore() {

    let score = 0;


    if (waterHabit.checked) {
        score += 25;
    }

    if (skinHabit.checked) {
        score += 25;
    }

    if (exerciseHabit.checked) {
        score += 25;
    }

    if (selfCareHabit.checked) {
        score += 25;
    }


    glowScore.textContent = score;

}


// Update score whenever a habit changes

waterHabit.addEventListener("change", calculateGlowScore);
skinHabit.addEventListener("change", calculateGlowScore);
exerciseHabit.addEventListener("change", calculateGlowScore);
selfCareHabit.addEventListener("change", calculateGlowScore);


// Save progress button

saveHabitsButton.addEventListener("click", function () {

    calculateGlowScore();

    alert(
        "Today's progress has been saved! Your Glow Score is " +
        glowScore.textContent +
        "/100."
    );

});