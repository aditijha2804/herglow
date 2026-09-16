// =========================================
// SKINSENSE QUIZ
// =========================================

const quizButton = document.getElementById("skinQuizBtn");
const quizResult = document.getElementById("skinQuizResult");
const resultContent = document.getElementById("skinResultContent");
const resetQuizButton = document.getElementById("resetSkinQuizBtn");


// =========================================
// SKIN TYPE INFORMATION
// =========================================

const skinInfo = {

    dry: {
        title: "Dry Skin",
        message:
            "Your skin may benefit from gentle cleansing and regular hydration.",

        routine: [
            "Morning: Use a gentle cleanser.",
            "Morning: Apply a hydrating moisturizer.",
            "Morning: Finish with broad-spectrum sunscreen.",
            "Evening: Cleanse gently and apply moisturizer.",
            "Avoid very hot water and harsh cleansers."
        ]
    },

    oily: {
        title: "Oily Skin",
        message:
            "Your skin may produce more natural oil. A gentle, balanced routine can help.",

        routine: [
            "Morning: Use a gentle foaming cleanser.",
            "Morning: Apply a lightweight moisturizer.",
            "Morning: Finish with broad-spectrum sunscreen.",
            "Evening: Cleanse gently and moisturize.",
            "Avoid over-cleansing, which can irritate your skin."
        ]
    },

    combination: {
        title: "Combination Skin",
        message:
            "Your skin may have both oily and dry areas. A balanced routine can help care for both.",

        routine: [
            "Morning: Use a gentle cleanser.",
            "Morning: Apply a lightweight moisturizer.",
            "Morning: Finish with broad-spectrum sunscreen.",
            "Evening: Cleanse and moisturize.",
            "Use lighter products on oily areas and richer hydration on dry areas."
        ]
    },

    normal: {
        title: "Normal / Balanced Skin",
        message:
            "Your answers suggest your skin may be relatively balanced. Keep your routine simple and consistent.",

        routine: [
            "Morning: Cleanse gently.",
            "Morning: Apply a comfortable moisturizer.",
            "Morning: Finish with broad-spectrum sunscreen.",
            "Evening: Cleanse and moisturize.",
            "Keep your routine simple and consistent."
        ]
    },

    sensitive: {
        title: "Sensitive Skin",
        message:
            "Your skin may be more reactive. Gentle, fragrance-free products may be a good starting point.",

        routine: [
            "Morning: Use a gentle, fragrance-free cleanser.",
            "Morning: Apply a simple fragrance-free moisturizer.",
            "Morning: Finish with broad-spectrum sunscreen.",
            "Evening: Cleanse gently and moisturize.",
            "Patch-test new products and introduce them gradually."
        ]
    }

};


// =========================================
// RUN QUIZ
// =========================================

quizButton.addEventListener("click", function () {

    const selectedAnswers = document.querySelectorAll(
        'input[type="radio"]:checked'
    );


    // Check all questions

    if (selectedAnswers.length < 4) {

        quizResult.style.display = "block";

        resultContent.innerHTML = `
            <strong>Please answer all four questions.</strong>
            <br>
            We need all your answers to give you a result.
        `;

        return;
    }


    // Store scores

    const scores = {
        dry: 0,
        oily: 0,
        combination: 0,
        normal: 0,
        sensitive: 0
    };


    // Count answers

    selectedAnswers.forEach(function (answer) {

        scores[answer.value]++;

    });


    // Find highest score

    let skinType = "normal";
    let highestScore = 0;

    for (const type in scores) {

        if (scores[type] > highestScore) {

            highestScore = scores[type];
            skinType = type;

        }

    }


    const info = skinInfo[skinType];


    // =========================================
    // DISPLAY RESULT + ROUTINE
    // =========================================

    quizResult.style.display = "block";

    resultContent.innerHTML = `

        <p class="eyebrow">
            YOUR SKINSENSE RESULT
        </p>

        <h3>
            ${info.title}
        </h3>

        <p>
            ${info.message}
        </p>

        <div class="skin-routine">

            <h4>
                ✦ Your Simple Skin Routine
            </h4>

            <ul>
                ${info.routine.map(function (step) {
                    return `<li>${step}</li>`;
                }).join("")}
            </ul>

        </div>

        <p class="small text-muted mt-3">
            Skin needs can vary. Patch-test new products and
            stop using a product if it causes irritation.
        </p>
    `;


    // Scroll to result

    quizResult.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

});


// =========================================
// RESET QUIZ
// =========================================

resetQuizButton.addEventListener("click", function () {

    const selectedAnswers = document.querySelectorAll(
        'input[type="radio"]:checked'
    );

    selectedAnswers.forEach(function (answer) {

        answer.checked = false;

    });


    quizResult.style.display = "none";

    resultContent.innerHTML = "";


    quizButton.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

});