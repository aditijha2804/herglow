// =========================================
// HERVAULT - ARTICLE LOADER + SEARCH
// =========================================

const searchInput = document.getElementById("articleSearch");
const searchButton = document.querySelector(".vault-search-box button");


// =========================================
// LOAD ARTICLES FROM BACKEND
// =========================================

async function loadArticles() {

    try {

        const response = await fetch(
            "http://localhost:5000/api/articles"
        );

        const articles = await response.json();

        if (!response.ok) {
            throw new Error("Failed to load articles.");
        }

        displayArticles(articles);

    } catch (error) {

        console.error("Unable to load articles:", error);

    }
}


// =========================================
// DISPLAY ARTICLES
// =========================================

function displayArticles(articles) {

    const articleContainer =
        document.querySelector(".vault-categories .row");

    if (!articleContainer) {
        return;
    }

    articleContainer.innerHTML = "";

    articles.forEach(function (article) {

        const articleCard = document.createElement("div");

        articleCard.className =
            "col-md-6 col-lg-4";

        articleCard.innerHTML = `
            <div class="vault-card">

                <div class="vault-icon">
                    ✦
                </div>

                <p class="vault-category">
                    ${article.category}
                </p>

                <h2>
                    ${article.title}
                </h2>

                <p>
                    ${article.description}
                </p>

                <button
                    type="button"
                    class="btn-link-herglow read-article-btn"
                    data-id="${article.id}">
                    Read More →
                </button>

            </div>
        `;

        articleContainer.appendChild(articleCard);

    });

    addArticleButtons();
}


// =========================================
// SEARCH ARTICLES
// =========================================

function searchArticles() {

    const searchTerm =
        searchInput.value.toLowerCase().trim();

    const cards =
        document.querySelectorAll(".vault-card");

    cards.forEach(function (card) {

        const cardText =
            card.textContent.toLowerCase();

        if (cardText.includes(searchTerm)) {

            card.parentElement.style.display = "";

        } else {

            card.parentElement.style.display = "none";

        }

    });
}


// =========================================
// READ ARTICLE
// =========================================

function addArticleButtons() {

    const buttons =
        document.querySelectorAll(".read-article-btn");

    buttons.forEach(function (button) {

        button.addEventListener("click", async function () {

            const articleId =
                button.dataset.id;

            try {

                const response = await fetch(
                    `http://localhost:5000/api/articles/${articleId}`
                );

                const article =
                    await response.json();

                if (!response.ok) {
                    throw new Error("Article not found.");
                }

                let articleBox =
                    document.getElementById("articleContent");

                if (!articleBox) {

                    articleBox =
                        document.createElement("div");

                    articleBox.id =
                        "articleContent";

                    articleBox.className =
                        "container mt-5 mb-5";

                    document
                        .querySelector(".vault-categories")
                        .after(articleBox);
                }

                articleBox.innerHTML = `
                    <div class="vault-card article-detail">

                        <p class="vault-category">
                            ${article.category}
                        </p>

                        <h2>
                            ${article.title}
                        </h2>

                        <p>
                            ${article.content}
                        </p>

                        <button
                            type="button"
                            class="btn btn-herglow mt-3"
                            id="closeArticleBtn">
                            Close Article
                        </button>

                    </div>
                `;

                articleBox.scrollIntoView({
                    behavior: "smooth"
                });

                const closeButton =
                    document.getElementById("closeArticleBtn");

                closeButton.addEventListener(
                    "click",
                    function () {

                        articleBox.remove();

                    }
                );

            } catch (error) {

                console.error(
                    "Unable to load article:",
                    error
                );

            }

        });

    });
}


// =========================================
// SEARCH BUTTON
// =========================================

if (searchButton) {

    searchButton.addEventListener(
        "click",
        searchArticles
    );

}


// =========================================
// ENTER KEY SEARCH
// =========================================

if (searchInput) {

    searchInput.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Enter") {

                searchArticles();

            }

        }
    );

}


// =========================================
// LOAD ARTICLES WHEN PAGE OPENS
// =========================================

window.addEventListener(
    "DOMContentLoaded",
    function () {

        loadArticles();

    }
);