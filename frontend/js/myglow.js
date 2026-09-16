// ==============================
// MYGLOW - HABIT TRACKER
// ==============================

const habitDate = document.getElementById("habitDate");

const waterHabit = document.getElementById("waterHabit");
const skincareHabit = document.getElementById("skincareHabit");
const exerciseHabit = document.getElementById("exerciseHabit");
const selfCareHabit = document.getElementById("selfCareHabit");
const nutritionHabit = document.getElementById("nutritionHabit");

const glowScore = document.getElementById("glowScore");

const saveHabitsBtn = document.getElementById("saveHabitsBtn");
const habitSaveMessage = document.getElementById("habitSaveMessage");


// ==============================
// SET TODAY'S DATE
// ==============================

if (habitDate) {
    habitDate.value = new Date().toISOString().split("T")[0];
}


// ==============================
// UPDATE GLOW SCORE
// ==============================

function updateGlowScore() {

    let score = 0;

    if (waterHabit && waterHabit.checked) {
        score += 20;
    }

    if (skincareHabit && skincareHabit.checked) {
        score += 20;
    }

    if (exerciseHabit && exerciseHabit.checked) {
        score += 20;
    }

    if (selfCareHabit && selfCareHabit.checked) {
        score += 20;
    }
    if (nutritionHabit && nutritionHabit.checked) {
    score += 20;
}

    if (glowScore) {
        glowScore.textContent = score;
    }
}


// ==============================
// LISTEN FOR HABIT CHANGES
// ==============================

if (waterHabit) {
    waterHabit.addEventListener("change", updateGlowScore);
}

if (skincareHabit) {
    skincareHabit.addEventListener("change", updateGlowScore);
}

if (exerciseHabit) {
    exerciseHabit.addEventListener("change", updateGlowScore);
}

if (selfCareHabit) {
    selfCareHabit.addEventListener("change", updateGlowScore);
}

if (nutritionHabit) {
    nutritionHabit.addEventListener("change", updateGlowScore);
}


// ==============================
// SAVE HABITS
// ==============================

if (saveHabitsBtn) {

    saveHabitsBtn.addEventListener("click", async () => {

        const savedUser = localStorage.getItem("herglowUser");

        if (!savedUser) {

            habitSaveMessage.textContent =
                "Please log in before saving your habits.";

            habitSaveMessage.className =
                "mt-3 text-danger";

            return;
        }

        const user = JSON.parse(savedUser);

        if (!habitDate.value) {

            habitSaveMessage.textContent =
                "Please select a date.";

            habitSaveMessage.className =
                "mt-3 text-danger";

            return;
        }

        try {

            const response = await fetch(
                "http://localhost:5000/api/habits",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({

                        user_id: user.id,

                        date: habitDate.value,

                        water: waterHabit.checked,

                        skincare: skincareHabit.checked,

                        exercise: exerciseHabit.checked,

                        nutrition: nutritionHabit.checked,

                        self_care: selfCareHabit.checked
                    })
                }
            );

            const data = await response.json();

            if (response.ok) {

                habitSaveMessage.textContent =
                    data.message;

                habitSaveMessage.className =
                    "mt-3 text-success";

            } else {

                habitSaveMessage.textContent =
                    data.message;

                habitSaveMessage.className =
                    "mt-3 text-danger";
            }

        } catch (error) {

            console.error(error);

            habitSaveMessage.textContent =
                "Unable to connect to the HerGlow server.";

            habitSaveMessage.className =
                "mt-3 text-danger";
        }
    });
}


// ==============================
// LOAD SAVED HABITS
// ==============================

async function loadSavedHabits() {

    const savedUser =
        localStorage.getItem("herglowUser");

    if (!savedUser) {
        return;
    }

    const user = JSON.parse(savedUser);

    const selectedDate =
        habitDate.value;

    if (!selectedDate) {
        return;
    }

    try {

        const response = await fetch(
            `http://localhost:5000/api/habits/${user.id}`
        );

        const habits = await response.json();

        const todayHabit = habits.find(
            habit =>
                habit.date.substring(0, 10) === selectedDate
        );

        if (todayHabit) {

            waterHabit.checked =
                Boolean(todayHabit.water);

            skincareHabit.checked =
                Boolean(todayHabit.skincare);

            exerciseHabit.checked =
                Boolean(todayHabit.exercise);

            selfCareHabit.checked =
                Boolean(todayHabit.self_care);
            nutritionHabit.checked =
                Boolean(todayHabit.nutrition);

            updateGlowScore();
        }

    } catch (error) {

        console.error(
            "Unable to load habits:",
            error
        );
    }
}


// ==============================
// LOAD WHEN PAGE OPENS
// ==============================

window.addEventListener("DOMContentLoaded", () => {
    loadSavedHabits();
});

// ==============================
// RELOAD WHEN DATE CHANGES
// ==============================

if (habitDate) {

    habitDate.addEventListener(
        "change",
        loadSavedHabits
    );
}