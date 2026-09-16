// Ansvarsområde 2 — Oscar

async function loadBooks() {
  const tbody = document.getElementById("book-table");

  try {
    const response = await fetch(`${API_URL}/books`, {
      credentials: "include",
    });

    if (response.status === 401 || response.status === 403) {
      window.location.href =
        "index.html?message=You must be logged in to view this page";
      return;
    }

    const books = await response.json();
    tbody.innerHTML = "";

    books.forEach((book) => {
      const row = document.createElement("tr");

      const title = document.createElement("td");
      title.textContent = book.title;

      const author = document.createElement("td");
      author.textContent = book.author;

      const genres = document.createElement("td");
      genres.textContent = book.genres.join(", ");

      const year = document.createElement("td");
      year.textContent = book.published_year;

      row.append(title, author, genres, year);
      tbody.appendChild(row);
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

document.getElementById("create-btn").addEventListener("click", async () => {
  const message = document.getElementById("form-message");

  const genresInput = document.getElementById("genres").value;
  const genres = genresInput
    .split(",")
    .map((g) => g.trim())
    .filter((g) => g.length > 0);

  const newBook = {
    title: document.getElementById("title").value,
    author: document.getElementById("author").value,
    description: document.getElementById("description").value,
    genres: genres,
    image: document.getElementById("image").value,
    published_year: Number(document.getElementById("published_year").value),
  };

  try {
    const response = await fetch(`${API_URL}/books`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(newBook),
    });

    if (response.status === 401 || response.status === 403) {
      window.location.href =
        "index.html?message=You must be logged in to view this page";
      return;
    }

    if (response.ok) {
      message.textContent = "Boken skapades.";
      document.getElementById("title").value = "";
      document.getElementById("author").value = "";
      document.getElementById("description").value = "";
      document.getElementById("genres").value = "";
      document.getElementById("image").value = "";
      document.getElementById("published_year").value = "";
      loadBooks();
    } else {
      const data = await response.json();
      message.textContent = data.error || "Kunde inte skapa boken.";
    }
  } catch (error) {
    console.error("Error:", error);
    message.textContent = "Något gick fel.";
  }
});

loadBooks();

// ====================================
// Funktion för att ladda alla användare

async function loadUsers() {
  try {
    const response = await fetch(`${API_URL}/users`, {
      credentials: "include",
    });

    if (response.status === 401 || response.status === 403) {
      window.location.href =
        "index.html?message=You must be logged in to view this page";
      return;
    }

      const data = await response.json();
      const users = data.users;

      const tbody = document.getElementById("user-table");
      tbody.innerHTML = "";

      users.forEach((user) => {
      const row = document.createElement("tr");

      // Användarnamn
      const username = document.createElement("td");
      username.textContent = user.username;

      // Admin
      const isAdmin = document.createElement("td");
      isAdmin.textContent = user.is_admin ? "Ja" : "Nej";

      // Skapad
      const createdAt = document.createElement("td");
      createdAt.textContent = new Date(user.created_at).toLocaleDateString();

      // Ta bort
      const deleteCell = document.createElement("td");
      const btn = document.createElement("button");

      btn.textContent = "Ta bort";

      btn.addEventListener("click", async () => {
        try {
          const delResponse = await fetch(`${API_URL}/users/${user._id}`, {
            method: "DELETE",
            credentials: "include",
          });

          if (delResponse.ok) {
            loadUsers();
          } else {
            console.error("Kunde inte ta bort användaren");
          }
        } catch (error) {
          console.error("Error:", error);
        }
      });

      deleteCell.appendChild(btn);

      row.append(username, isAdmin, createdAt, deleteCell);
      tbody.appendChild(row);
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

loadUsers();
