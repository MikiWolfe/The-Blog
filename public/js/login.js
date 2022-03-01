const loginFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector("#user-login").value.trim();
  const password = document.querySelector("#pass-login").value.trim();

  if (username && password) {
    const response = await fetch("/api/user/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      alert("you are now logged in");
    } else {
      alert("Failed to log in. Try again please");
    }
  }
};



document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);


