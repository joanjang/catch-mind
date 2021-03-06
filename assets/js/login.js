import {
    initSockets
} from './sockets';

const body = document.querySelector("body");
const loginForm = document.getElementById("jsLogin");

const NICKNAME = "nickname";
const LOGGED_OUT = "loggedOut";
const LOGGED_IN = "loggedIn";

const logIn = nickname => {
    const socket = io("/");
    const {
        events
    } = window;
    socket.emit(events.setNickname, {
        nickname
    });
    initSockets(socket);
}

const checkNickname = (nickname = localStorage.getItem(NICKNAME)) => {
    if (nickname === null)
        body.className = LOGGED_OUT;
    else {
        body.className = LOGGED_IN;
        logIn(nickname);
    }
}

const handleFormSubmit = evnet => {
    evnet.preventDefault();
    const input = loginForm.querySelector("input");
    const {
        value
    } = input;
    input.value = "";
    localStorage.setItem(NICKNAME, value);
    checkNickname(value);
}

checkNickname();
if (loginForm) {
    loginForm.addEventListener("submit", handleFormSubmit);
}