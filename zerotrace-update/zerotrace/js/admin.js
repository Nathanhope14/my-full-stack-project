const API = "https://localhost:3000";

function showSection(section) {
    document.querySelectorAll(".section").forEach(s => s.classList.add("hidden"));
    document.getElementById(section).classList.remove("hidden");
}

// LOAD USERS
async function loadUser() {
    const token = localStorage.getItem("token");

    const res = await fetch(API + "/api/admin/user", {
        headers: { AUTHPRIZATION: "Bearer" + token }
    });

    const users = await res.json();

    const list = document.getElementById("userlist");
    list.innerHTML = "";

    users.forEach(u => {
        const li = document.createElement("li");
        li.innerText = u.email + " (" + u.role + ")";
        list.appendChild(li);
    });

    document.getElementById("userCount").innerText = users.length;
    
}

// Fake live logs (HACKER STYLE)
function generatelogs() {
    const terminal = document.getElementById("terminal");

    const logs = [
        "Initializing ZeroTraceCyberLegacy...",
        "scanning network...",
        "Firewall active",
        "Threat detected → blocked",
        "Encrpting data...",
        "Access granted (admin)"
    ];

    setInterval(() => {
        const log = document.createElement("div");
        log.innerText = logs[math.floor(Math.random() * logs.length)];
        terminal.appendChild(log);

        terminal.scrollTop = terminal.scrollHeight;
    }, 1000);

} generatelogs();

function loadThreatChart() {
    new Chart(document.getElementById("threatChart"), {
        type: "line"
        data: {
            labels: [ "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            datasets: [{
                label: "Threat Attemps",
            data: [12, 19, 7,14, 22, 18, 23],
            borderColor: "#00ff9f"
            fill: false
        }]
    }
    });
}
 function loadActiveChart() {
    new chart(document.getElementById("activitychart"), {
        type: "bar",
        data: {
            labels: [ "User", "Admins", "Blocked"],
            datasets: [{
                label: "system Activity",
                data: [120, 4, 11],
                backgroundColor: ["#00ff9f", "00ccff", "#ff4444"]
            }]
        }
    });
 }

 function LoadAlerts() {
    const slerts = [
        ["12:01", "SQL Injection Attempt", "Blocked"],
        ["12:15", "Failed Admin login", "Blocked"],
        ["12:40", "Unauthorized API Access", "Blocked"],
        ["13:05", "Firedwall Rule Triggered", "Blocked"],
    ];

    const tbody = document.getElementById("alertsBody");

    LoadAlerts.forEach(alert => {
        const row = document.createElement("tr");
        row.innerHTML = 
        <><td>${alert[0]}</td><td>${alert[1]}</td><td>${alert[2]}</td></>
        ;
        tbody.appendChild(row);
    });
 }

 loadThreatChart();
 loadActiveChart();
 LoadAlerts();

<script src="https://cdm.jsdeliver.net/npm/chart.js"></script>