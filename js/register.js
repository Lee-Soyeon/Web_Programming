const registerForm = document.querySelector("#register-form")
const registerID = document.querySelector("#register-form #id")
const registerPassword = document.querySelector("#register-form #password")
const registerPasswordCheck = document.querySelector("#register-form #passwordCheck")
const registerName = document.querySelector("#register-form #name")
const registerEmail = document.querySelector("#register-form #email")
const registerBirth = document.querySelector("#register-form #birth")
const registerButton = document.querySelector("#register-form #button")

const USER_ID_KEY = "userID"
const USER_PASSWORD_KEY = "userPassword"

function onRegisterButtonClick(event) {
    event.preventDefault()

    const userID = registerID.value
    const userPassword = registerPassword.value
    const userPasswordCheck = registerPasswordCheck.value
    const userName = registerName.value

    if (userID === "") {
        alert("아이디를 입력하세요.")
    } else if (userPassword !== userPasswordCheck) {
        alert("비밀번호가 같지 않습니다.")
    } else if (userPassword.length < 6) {
        alert("비밀번호는 6글자 이상 입력해주세요.")
    } else if (userName === "") {
        alert("이름을 입력하세요.")
    } else {
        localStorage.setItem(USER_ID_KEY, userID)
        localStorage.setItem(USER_PASSWORD_KEY, userPassword)
        alert("회원가입 성공!!!!")
        window.location.href = "intro.html"
    }
}

registerButton.addEventListener("click", onRegisterButtonClick)