// =========================================
// HERCYCLE TRACKER
// =========================================

const periodStartInput = document.getElementById("periodStart");
const cycleLengthInput = document.getElementById("cycleLength");
const calculateButton = document.getElementById("cycleCalculateBtn");
const cycleResult = document.getElementById("cycleResult");


calculateButton.addEventListener("click", function () {

    const startDateValue = periodStartInput.value;
    const cycleLength = parseInt(cycleLengthInput.value);


    // Check date

    if (!startDateValue) {

        cycleResult.style.display = "block";

        cycleResult.innerHTML = `
            <strong>Please enter the first day of your last period.</strong>
        `;

        return;
    }


    // Create date

    const startDate = new Date(startDateValue);


    // Calculate next period

    const nextPeriod = new Date(startDate);

    nextPeriod.setDate(
        nextPeriod.getDate() + cycleLength
    );


    // Calculate current cycle day

    const today = new Date();

    const difference =
        today.getTime() - startDate.getTime();

    const daysPassed =
        Math.floor(difference / (1000 * 60 * 60 * 24));

    const cycleDay =
        (daysPassed % cycleLength) + 1;


    // Format next period date

    const formattedNextPeriod =
        nextPeriod.toLocaleDateString(
            "en-US",
            {
                month: "long",
                day: "numeric",
                year: "numeric"
            }
        );


    // Display result

    cycleResult.style.display = "block";

    cycleResult.innerHTML = `
        <p class="eyebrow">
            YOUR CYCLE ESTIMATE
        </p>

        <h3>
            Cycle Day ${cycleDay}
        </h3>

        <p>
            Your next period may begin around
            <strong>${formattedNextPeriod}</strong>.
        </p>

        <small>
            This is a simple estimate based on the information
            you entered and may not reflect your actual cycle.
        </small>
    `;


    // Scroll to result

    cycleResult.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

});