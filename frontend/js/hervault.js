// =========================================
// HERVAULT SEARCH
// =========================================

const searchInput = document.getElementById("articleSearch");
const searchButton = document.querySelector(".vault-search-box button");
const vaultCards = document.querySelectorAll(".vault-card");


// Search function

function searchArticles() {

    const searchTerm = searchInput.value.toLowerCase().trim();


    vaultCards.forEach(function (card) {

        const cardText = card.textContent.toLowerCase();


        if (cardText.includes(searchTerm)) {

            card.parentElement.style.display = "";

        } else {

            card.parentElement.style.display = "none";

        }

    });

}


// Search button

searchButton.addEventListener("click", function () {

    searchArticles();

});


// Search when pressing Enter

searchInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

        searchArticles();

    }

});