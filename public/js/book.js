// Ansvarsområde 3 - Chariklia

const params = new URLSearchParams(window.location.search);
const bookId = params.get("id");

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
    img.width = 200;

    const author = document.createElement("p");
    author.innerHTML = `<strong>Författare:</strong> ${book.author}`;

    const year = document.createElement("p");
    year.innerHTML = `<strong>Utgiven:</strong> ${book.published_year}`;

    const genres = document.createElement("p");
    genres.innerHTML = `<strong>Genre:</strong> ${book.genres.join(", ")}`;

    const description = document.createElement("p");
    description.innerHTML = `<strong>Beskrivning:</strong> ${book.description}`;

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

  reviews.forEach((review) => {
    const card = document.createElement("article");

    const name = document.createElement("p");
    name.textContent = review.name;

    const rating = document.createElement("p");
    rating.textContent = "★".repeat(review.rating) + "☆".repeat(5 - review.rating);

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

  const newReview = {
    name: document.getElementById("name").value,
    content: document.getElementById("content").value,
    rating: Number(document.getElementById("rating").value),
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
