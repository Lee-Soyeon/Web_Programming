const loginForm = document.querySelector("#login-form")
const idInput = document.querySelector("#login-form #id")
const passwordInput = document.querySelector("#login-form #password")
const button = document.querySelector("#button")

function onLoginButtonClick(event) {
    event.preventDefault()

    const id = idInput.value
    const password = passwordInput.value

    console.log(id)
    console.log(password)

    if (id == "soyena729" && password == "abc0518") {
        alert("로그인 성공!!!!")
        window.location.href = "index.html"
    } else {
        alert("로그인 실패....")
    }

}

button.addEventListener("click", onLoginButtonClick)