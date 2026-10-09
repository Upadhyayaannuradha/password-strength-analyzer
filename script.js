const passwordInput = document.getElementById("password");
const strengthFill = document.getElementById("strengthFill");
const strengthText = document.getElementById("strengthText");
const message = document.getElementById("message");
const suggestion = document.getElementById("suggestion");
const toggleBtn = document.getElementById("toggleBtn");

const checks = {
    length: document.getElementById("length"),
    upper: document.getElementById("upper"),
    lower: document.getElementById("lower"),
    number: document.getElementById("number"),
    special: document.getElementById("special")
};

toggleBtn.addEventListener("click", function () {
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        toggleBtn.textContent = "Hide";
    } else {
        passwordInput.type = "password";
        toggleBtn.textContent = "Show";
    }
});

passwordInput.addEventListener("input", analyzePassword);

function analyzePassword() {
    const password = passwordInput.value;

    if (!password) {
        strengthText.textContent = "Password Strength: —";
        strengthFill.style.width = "0%";
        message.textContent = "Enter a password to begin.";
        suggestion.textContent = "";
        Object.values(checks).forEach(item => {
            item.style.color = "#777";
        });
        return;
    }

    const results = {
        length: password.length >= 8,
        upper: /[A-Z]/.test(password),
        lower: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
        special: /[^A-Za-z0-9]/.test(password)
    };

    const labels = {
        length: "At least 8 characters",
        upper: "Contains uppercase letter",
        lower: "Contains lowercase letter",
        number: "Contains a number",
        special: "Contains special character"
    };

    let score = 0;

    for (const key in results) {
        checks[key].textContent =
            (results[key] ? "✓ " : "✗ ") + labels[key];

        checks[key].style.color =
            results[key] ? "green" : "#777";

        if (results[key]) score++;
    }

    let strength;

    if (score <= 2) {
        strength = "Weak";
        strengthFill.style.background = "#dc2626";
        message.textContent = "Add more character types to improve your password.";
    } else if (score <= 4) {
        strength = "Medium";
        strengthFill.style.background = "#f59e0b";
        message.textContent = "Good start! Try adding more variety.";
    } else {
        strength = "Strong";
        strengthFill.style.background = "#16a34a";
        message.textContent = "Great! All five checks have passed.";
    }

    strengthText.textContent = "Password Strength: " + strength;
    strengthFill.style.width = (score / 5 * 100) + "%";

    suggestion.textContent = strength === "Strong"
        ? ""
        : "Tip: Use a longer password with letters, numbers and symbols.";
}