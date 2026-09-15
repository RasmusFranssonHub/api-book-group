// Ansvarsområde 2 — Oscar

async function loadBooks() {
  const container = document.getElementById("book-list");

  try {
    const response = await fetch(`${API_URL}/books`);
    if (!response.ok) throw new Error(`Status ${response.status}`);
    const books = await response.json();

    container.innerHTML = "";

    books.forEach((book) => {
      const card = document.createElement("article");

      const img = document.createElement("img");
      img.src = book.image;
      img.alt = book.title;
      img.width = 120;

      const link = document.createElement("a");
      link.href = `/book.html?id=${book._id}`;
      link.textContent = book.title;

      const heading = document.createElement("h2");
      heading.appendChild(link);

      const author = document.createElement("p");
      author.textContent = book.author;

      const year = document.createElement("p");
      year.textContent = book.published_year;

      const genres = document.createElement("p");
      genres.textContent = book.genres.join(", ");

      card.append(img, heading, author, year, genres);

      card.style.cursor = "pointer";
      card.addEventListener("click", () => {
        window.location.href = `/book.html?id=${book._id}`;
      });

      container.appendChild(card);
    });
  } catch (error) {
    container.textContent = "Kunde inte hämta böcker.";
  }
}

loadBooks();
