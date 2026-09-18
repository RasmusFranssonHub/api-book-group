// Öppna login-rutan
document.getElementById("login-btn").addEventListener("click", function () {
    document.getElementById("login-overlay").style.display = "flex";

    // Visa login-vyn och dölj register-vyn
    document.getElementById("login-view").style.display = "block";
    document.getElementById("register-view").style.display = "none";

    // Rensa gamla meddelanden
    document.getElementById("login-message").textContent = "";
    document.getElementById("register-message").textContent = "";

    // Markera login-fliken som aktiv och register-fliken som inaktiv
    document.getElementById("show-login").classList.add("active");
    document.getElementById("show-register").classList.remove("active");
});


// Stäng login-rutan
document.getElementById("login-close").addEventListener("click", function () {
    document.getElementById("login-overlay").style.display = "none";
});


// Visa Logga in
document.getElementById("show-login").addEventListener("click", function () {
    document.getElementById("login-view").style.display = "block";
    document.getElementById("register-view").style.display = "none";

    document.getElementById("show-login").classList.add("active");
    document.getElementById("show-register").classList.remove("active");
});


// Visa Registrera
document.getElementById("show-register").addEventListener("click", function () {
    document.getElementById("login-view").style.display = "none";
    document.getElementById("register-view").style.display = "block";

    // Markera register-fliken som aktiv och login-fliken som inaktiv
    document.getElementById("show-login").classList.remove("active");
    document.getElementById("show-register").classList.add("active");
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

            // Visa användarnamn och logout-knapp, dölj login-knapp
            handleLoginSuccess(username);

            showToast("Inloggning lyckades!");

        } else {
            console.log("Login misslyckades", data);

            document.getElementById("login-message").textContent = data.message;
        }

    } catch (error) {
        console.error("Fel vid login:", error);
    }
});

// when login is successful, show the username and logout button, hide login button
function handleLoginSuccess(username) {
    document.getElementById("username-display").textContent = username;
    document.querySelector(".user-info").style.display = "flex";
    document.getElementById("logout-btn").style.display = "inline-block";
    document.getElementById("login-btn").style.display = "none";
    document.getElementById("admin-btn").style.display = "inline-block";
}


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

        // Byt till Login
        document.getElementById("register-view").style.display = "none";
        document.getElementById("login-view").style.display = "block";

        // Markera Login som aktiv
        document.getElementById("show-login").classList.add("active");
        document.getElementById("show-register").classList.remove("active");

        // Fyll i användarnamnet
        document.getElementById("username").value = username;

        // Visa tydligt meddelande
        document.getElementById("login-message").textContent =
            "Registrering lyckades, du kan nu logga in";

        // Rensa eventuell gammal feltext
        document.getElementById("register-message").textContent = "";
        showToast("Registrering lyckades!");

        } else {
            console.log("Registrering misslyckades", data);

            document.getElementById("register-message").textContent = data.message;
        }

    } catch (error) {
        console.error("Fel vid registrering:", error);
    }
});

// Logga ut
document.getElementById("logout-btn").addEventListener("click", async function () {

    try {
        const response = await fetch(API_URL + "/auth/logout", {
            method: "POST",
            credentials: "include"
        });

        const data = await response.json();

        if (response.ok) {
            console.log("Utloggad", data);

            // Ta bort användarnamn
            document.getElementById("username-display").textContent = "";

            // Dölj Adminpanel
            document.getElementById("admin-btn").style.display = "none";

            // dölj användaricon
            document.querySelector(".user-info").style.display = "none";

            // Dölj Logga ut
            document.getElementById("logout-btn").style.display = "none";

            // Visa Logga in
            document.getElementById("login-btn").style.display = "block";

            showToast("Du är nu utloggad!");
        }

        

    } catch (error) {
        console.error("Fel vid logout:", error);
    }
});

// Kontrollera om användaren redan är inloggad när sidan laddas
async function checkLogin() {
    try {
        const response = await fetch(API_URL + "/auth/me", {
            credentials: "include"
        });

        if (response.ok) {
            const data = await response.json();

            handleLoginSuccess(data.user.username);
        }
    } catch (error) {
        console.error("Fel vid kontroll av login:", error);
    }
}

checkLogin();

// Visa UI-feedback
function showToast(message) {
    const toast = document.getElementById("toast");

    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}