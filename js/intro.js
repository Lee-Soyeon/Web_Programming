const loginForm = document.querySelector("#login-form")
const idInput = document.querySelector("#login-form #id")
const passwordInput = document.querySelector("#login-form #password")
const button = document.querySelector("#button")

const USER_ID_KEY = "userID"
const USER_PASSWORD_KEY = "userPassword"

function onLoginButtonClick(event) {
    event.preventDefault()

    const id = idInput.value
    const password = passwordInput.value

    const savedUserID = localStorage.getItem(USER_ID_KEY)
    const savedUserPassword = localStorage.getItem(USER_PASSWORD_KEY)
    

    if (id === savedUserID && password === savedUserPassword) {
        alert("로그인 성공!!!!")
        window.location.href = "index.html"
    } else {
        alert("로그인 실패....")
    }  
}

button.addEventListener("click", onLoginButtonClick)