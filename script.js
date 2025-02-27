document.addEventListener("DOMContentLoaded", function () {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll(".nav-links a");
    navLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 50,
                    behavior: "smooth"
                });
            }
        });
    });

    // Add animation to project cards on hover
    const projectCards = document.querySelectorAll(".project");
    projectCards.forEach(card => {
        card.addEventListener("mouseover", function () {
            this.style.transform = "scale(1.05)";
            this.style.boxShadow = "0 6px 15px rgba(0, 170, 255, 0.3)";
        });
        card.addEventListener("mouseout", function () {
            this.style.transform = "scale(1)";
            this.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.3)";
        });
    });

    console.log(document.querySelector(".search-btn")); 


    // Search Book Function
    function searchBook() {
        const searchTerm = document.getElementById("book-search").value.trim();
        const searchResults = document.getElementById("search-results");

        if (searchTerm === "") {
            searchResults.innerHTML = "<p>Please enter a book name.</p>";
            return;
        }

        searchResults.innerHTML = "<p>Searching...</p>";

        fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(searchTerm)}`)
            .then(response => response.json())
            .then(data => {
                searchResults.innerHTML = ""; // Clear previous results

                if (!data.docs || data.docs.length === 0) {
                    searchResults.innerHTML = "<p>No results found. Try another search.</p>";
                    return;
                }

                data.docs.slice(0, 5).forEach(book => {
                    const bookTitle = book.title.replace(/'/g, "&#39;");
                    const bookAuthor = book.author_name ? book.author_name.join(", ") : "Unknown Author";
                    const bookCoverId = book.cover_i
                        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                        : "https://via.placeholder.com/128x180?text=No+Cover";

                    const bookElement = document.createElement("div");
                    bookElement.classList.add("book-item");
                    bookElement.innerHTML = `
                        <div style="display: flex; align-items: center;">
                            <img src="${bookCoverId}" alt="${bookTitle}" style="width: 60px; height: 90px; margin-right: 10px;">
                            <p><strong>${bookTitle}</strong> - ${bookAuthor}</p>
                        </div>
                        <button class="recommend-btn">Recommend</button>
                    `;

                    const recommendBtn = bookElement.querySelector(".recommend-btn");
                    recommendBtn.addEventListener("click", function () {
                        recommendBook(bookTitle, bookAuthor);
                    });

                    searchResults.appendChild(bookElement);
                });
            })
            .catch(error => {
                searchResults.innerHTML = "<p>Error fetching books. Try again.</p>";
                console.error("Error fetching books:", error);
            });
    }

    // Recommend Book Function
    function recommendBook(title, author) {
        const recommendedBooks = document.getElementById("recommended-books");
        const listItem = document.createElement("li");
        listItem.innerHTML = `<strong>${title}</strong> - ${author}`;
        recommendedBooks.appendChild(listItem);
    }

    // Attach event listener for search button
    document.querySelector(".search-btn").addEventListener("click", searchBook);

    // Allow "Enter" key to trigger search
    document.getElementById("book-search").addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            searchBook();
        }
    });

    // Form submission handling
    const contactForm = document.querySelector(".contact form");
    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();
            alert("Thank you for reaching out! I'll get back to you soon.");
            contactForm.reset();
        });
    }
});
