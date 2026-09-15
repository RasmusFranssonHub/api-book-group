// Öppna login-rutan
document.getElementById("login-btn").addEventListener("click", function () {
    document.getElementById("login-overlay").style.display = "flex";
    document.getElementById("login-view").style.display = "block";
    document.getElementById("register-view").style.display = "none";
});


// Stäng login-rutan
document.getElementById("login-close").addEventListener("click", function () {
    document.getElementById("login-overlay").style.display = "none";
});


// Visa Logga in
document.getElementById("show-login").addEventListener("click", function () {
    document.getElementById("login-view").style.display = "block";
    document.getElementById("register-view").style.display = "none";
});


// Visa Registrera
document.getElementById("show-register").addEventListener("click", function () {
    document.getElementById("login-view").style.display = "none";
    document.getElementById("register-view").style.display = "block";
});

// Login till API
document.getElementById("login-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch(API_URL + "/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                username: username,
                password: password
            })
        });

        const data = await response.json();

        if (response.ok) {
            console.log("Login lyckades", data);

            // Stäng login-rutan
            document.getElementById("login-overlay").style.display = "none";

        } else {
            console.log("Login misslyckades", data);

            document.getElementById("login-message").textContent = data.message;
        }

    } catch (error) {
        console.error("Fel vid login:", error);
    }
});


// Registrera användare
document.getElementById("register-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const username = document.getElementById("register-username").value;
    const password = document.getElementById("register-password").value;

    try {
        const response = await fetch(API_URL + "/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });

        const data = await response.json();

        if (response.ok) {
            console.log("Registrering lyckades", data);

            // Gå tillbaka till login
            document.getElementById("register-view").style.display = "none";
            document.getElementById("login-view").style.display = "block";

            // Fyll i användarnamnet
            document.getElementById("username").value = username;

        } else {
            console.log("Registrering misslyckades", data);

            document.getElementById("login-message").textContent = data.message;
        }

    } catch (error) {
        console.error("Fel vid registrering:", error);
    }
});