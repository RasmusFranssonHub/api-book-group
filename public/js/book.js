// Ansvarsområde 3 - Chariklia

const params = new URLSearchParams(window.location.search);
const bookId = params.get("id");

document.getElementById("rating").addEventListener("input", (e) => {
  if (e.target.value > 5) e.target.value = 5;
  if (e.target.value < 1 && e.target.value !== "") e.target.value = 1;
});

async function loadBook() {
  const titleEl = document.getElementById("book-title");
  const container = document.getElementById("book-info");

  try {
    const response = await fetch(`${API_URL}/books/${bookId}`);
    if (!response.ok) throw new Error(`Status ${response.status}`);
    const book = await response.json();

    titleEl.textContent = book.title;
    container.innerHTML = "";

    const img = document.createElement("img");
    img.src = book.image;
    img.alt = book.title;

    const author = document.createElement("p");
    const authorLabel = document.createElement("strong");
    authorLabel.textContent = "Författare: ";
    author.append(authorLabel, book.author);

    const year = document.createElement("p");
    const yearLabel = document.createElement("strong");
    yearLabel.textContent = "Utgiven: ";
    year.append(yearLabel, String(book.published_year));

    const genres = document.createElement("p");
    const genresLabel = document.createElement("strong");
    genresLabel.textContent = "Genre ";
    genres.append(genresLabel, book.genres.join(", "));

    const description = document.createElement("p");
    const descriptionLabel = document.createElement("strong");
    descriptionLabel.textContent = "Beskrivning: ";
    description.append(descriptionLabel, book.description);

    const textInfo = document.createElement("div");
    textInfo.append(author, year, genres, description);

    const bookLayout = document.createElement("div");
    bookLayout.className = "book-layout";
    bookLayout.append(img, textInfo);

    container.append(bookLayout);

    renderReviews(book.reviews || []);
  } catch (error) {
    container.textContent = "Kunde inte hämta boken.";
  }
}

function renderReviews(reviews) {
  const container = document.getElementById("review-list");
  container.innerHTML = "";

  document.getElementById("review-count").textContent =
    `Recensioner (${reviews.length})`;

  reviews.forEach((review) => {
    const card = document.createElement("article");

    const name = document.createElement("p");
    name.textContent = review.name;

    const rating = document.createElement("p");
    rating.textContent =
      "★".repeat(review.rating) + "☆".repeat(5 - review.rating);

    const content = document.createElement("p");
    content.textContent = review.content;

    const date = document.createElement("p");
    date.textContent = new Date(review.created_at).toLocaleDateString();

    card.append(name, rating, content, date);
    container.appendChild(card);
  });
}

document.getElementById("create-btn").addEventListener("click", async () => {
  const message = document.getElementById("form-message");

  const name = document.getElementById("name").value;
  const content = document.getElementById("content").value;
  const rating = document.getElementById("rating").value;

  if (!name || !content || !rating) {
    message.textContent = "Fyll i alla fält innan du skickar.";
    return;
  }

  if (Number(rating) < 1 || Number(rating) > 5) {
    message.textContent = "Betyget måste vara mellan 1 och 5.";
    return;
  }

  const newReview = {
    name,
    content,
    rating: Number(rating),
    book_id: bookId,
  };

  try {
    const response = await fetch(`${API_URL}/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newReview),
    });

    if (response.ok) {
      message.textContent = "Recensionen skapades.";
      document.getElementById("name").value = "";
      document.getElementById("content").value = "";
      document.getElementById("rating").value = "";
      loadBook();
    } else {
      const data = await response.json();
      message.textContent = data.message || "Kunde inte skapa recensionen.";
    }
  } catch (error) {
    console.error("Error:", error);
    message.textContent = "Något gick fel.";
  }
});
loadBook();
