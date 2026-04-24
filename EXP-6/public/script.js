const API = "http://localhost:3000/api";

// ======================
// Register
// ======================
async function register() {
    try {
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const res = await fetch(`${API}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password })
        });

        const data = await res.json();

        alert(data.message || "Registered");

        // Redirect to login
        window.location.href = "index.html";

    } catch (err) {
        alert("Error registering user");
        console.error(err);
    }
}

// ======================
// Login
// ======================
async function login() {
    try {
        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;

        const res = await fetch(`${API}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (data.accessToken) {
            // 🔥 Save token properly
            localStorage.setItem("token", data.accessToken);

            alert("Login Successful");

            // Redirect
            window.location.href = "dashboard.html";
        } else {
            alert(data.message || "Login failed");
        }

    } catch (err) {
        alert("Login error");
        console.error(err);
    }
}

// ======================
// Get Account Info
// ======================
async function getAccount() {
    try {
        const token = localStorage.getItem("token");

        if (!token) {
            alert("Please login first");
            window.location.href = "index.html";
            return;
        }

        const res = await fetch(`${API}/account`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token   // 🔥 FIXED
            }
        });

        const data = await res.json();

        if (data.message) {
            alert(data.message);
            return;
        }

        document.getElementById("account").innerText =
            `👤 ${data.name} | 💰 Balance: ₹${data.balance}`;

    } catch (err) {
        console.error(err);
        alert("Error fetching account");
    }
}

// ======================
// Transfer Money
// ======================
async function transfer() {
    try {
        const token = localStorage.getItem("token");

        const toUserId = document.getElementById("toUserId").value;
        const amount = parseInt(document.getElementById("amount").value);

        if (!toUserId || !amount) {
            alert("Enter all fields");
            return;
        }

        const res = await fetch(`${API}/transfer`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token   // 🔥 FIXED
            },
            body: JSON.stringify({ toUserId, amount })
        });

        const data = await res.json();

        alert(data.message);

        // 🔥 Refresh account after transfer
        await getAccount();

    } catch (err) {
        console.error(err);
        alert("Transfer failed");
    }
}

// ======================
// Get Transactions
// ======================
async function getTransactions() {
    try {
        const token = localStorage.getItem("token");

        const res = await fetch(`${API}/transactions`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token   // 🔥 FIXED
            }
        });

        const data = await res.json();

        const list = document.getElementById("transactions");
        list.innerHTML = "";

        data.forEach(tx => {
            const li = document.createElement("li");
            li.innerText = `₹${tx.amount} → ${tx.status}`;
            list.appendChild(li);
        });

    } catch (err) {
        console.error(err);
        alert("Error loading transactions");
    }
}

// ======================
// Logout
// ======================
function logout() {
    localStorage.removeItem("token");
    alert("Logged out");
    window.location.href = "index.html";
}

// ======================
// Auto-load account on dashboard
// ======================
if (window.location.pathname.includes("dashboard.html")) {
    getAccount();
}