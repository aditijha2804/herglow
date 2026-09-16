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
// ==============================
// SAVE CYCLE TO BACKEND
// ==============================

const saveCycleBtn = document.getElementById("saveCycleBtn");
const cycleSaveMessage = document.getElementById("cycleSaveMessage");

if (saveCycleBtn) {

    saveCycleBtn.addEventListener("click", async () => {

        const savedUser = localStorage.getItem("herglowUser");

        if (!savedUser) {
            cycleSaveMessage.textContent =
                "Please log in before saving your cycle.";
            cycleSaveMessage.className =
                "mt-3 text-danger";
            return;
        }

        const user = JSON.parse(savedUser);

        const startDate =
            document.getElementById("periodStart").value;

        const cycleLength =
            document.getElementById("cycleLength").value;

        if (!startDate) {
            cycleSaveMessage.textContent =
                "Please select your period start date.";
            cycleSaveMessage.className =
                "mt-3 text-danger";
            return;
        }

        try {

            const response = await fetch(
                "http://localhost:5000/api/cycle",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        user_id: user.id,
                        start_date: startDate,
                        cycle_length: Number(cycleLength),
                        period_length: 5
                    })
                }
            );

            const data = await response.json();

            if (response.ok) {

                cycleSaveMessage.textContent =
                    data.message;

                cycleSaveMessage.className =
                    "mt-3 text-success";

            } else {

                cycleSaveMessage.textContent =
                    data.message;

                cycleSaveMessage.className =
                    "mt-3 text-danger";
            }

        } catch (error) {

            console.error(error);

            cycleSaveMessage.textContent =
                "Unable to connect to the HerGlow server.";

            cycleSaveMessage.className =
                "mt-3 text-danger";
        }
    });
}
// ==============================
// LOAD SAVED CYCLE
// ==============================

async function loadSavedCycle() {

    const savedUser = localStorage.getItem("herglowUser");

    if (!savedUser) {
        return;
    }

    const user = JSON.parse(savedUser);

    try {

        const response = await fetch(
            `http://localhost:5000/api/cycle/${user.id}`
        );

        const cycles = await response.json();

        if (cycles.length > 0) {

            const latestCycle = cycles[0];

            document.getElementById("periodStart").value =
                latestCycle.start_date.substring(0, 10);

            document.getElementById("cycleLength").value =
                latestCycle.cycle_length;
        }

    } catch (error) {

        console.error("Unable to load saved cycle:", error);

    }
}

loadSavedCycle();