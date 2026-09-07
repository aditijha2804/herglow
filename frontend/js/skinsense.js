// =========================================
// SKINSENSE QUIZ
// =========================================

const quizButton = document.getElementById("skinQuizBtn");
const quizResult = document.getElementById("skinQuizResult");
const resultContent = document.getElementById("skinResultContent");
const resetQuizButton = document.getElementById("resetSkinQuizBtn");


// Run when the user clicks the button

quizButton.addEventListener("click", function () {

    // Get selected answers

    const selectedAnswers = document.querySelectorAll(
        'input[type="radio"]:checked'
    );


    // Check whether all questions are answered

    if (selectedAnswers.length < 4) {

        quizResult.style.display = "block";

        quizResult.innerHTML = `
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


    // Count selected answers

    selectedAnswers.forEach(function (answer) {

        scores[answer.value]++;

    });


    // Find the highest score

    let skinType = "normal";
    let highestScore = 0;


    for (const type in scores) {

        if (scores[type] > highestScore) {

            highestScore = scores[type];

            skinType = type;

        }

    }


    // Result information

    const skinInfo = {

        dry: {
            title: "Dry Skin",
            message:
                "Your skin may benefit from gentle cleansing and regular hydration."
        },

        oily: {
            title: "Oily Skin",
            message:
                "Your skin may produce more natural oil. A gentle, balanced routine can help."
        },

        combination: {
            title: "Combination Skin",
            message:
                "Your skin may have both oily and dry areas. A balanced routine can help care for both."
        },

        normal: {
            title: "Normal / Balanced Skin",
            message:
                "Your answers suggest your skin may be relatively balanced. Keep your routine simple and consistent."
        },

        sensitive: {
            title: "Sensitive Skin",
            message:
                "Your skin may be more reactive. Gentle, fragrance-free products may be a good starting point."
        }

    };


    // Display result

    quizResult.style.display = "block";

    resultContent.innerHTML = `
    <p class="eyebrow">YOUR SKINSENSE RESULT</p>

    <h3>
        ${skinInfo[skinType].title}
    </h3>

    <p>
        ${skinInfo[skinType].message}
    </p>
`;


    // Scroll smoothly to result

    quizResult.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

});
// =========================================
// RESET SKIN QUIZ
// =========================================

resetQuizButton.addEventListener("click", function () {

    // Clear selected answers

    const selectedAnswers = document.querySelectorAll(
        'input[type="radio"]:checked'
    );

    selectedAnswers.forEach(function (answer) {
        answer.checked = false;
    });


    // Hide result

    quizResult.style.display = "none";

    resultContent.innerHTML = "";


    // Scroll back to quiz

    quizButton.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

});