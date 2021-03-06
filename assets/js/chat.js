import {
    getSocket
} from './sockets';

const messages = document.getElementById("jsMessages");
const sendMsg = document.getElementById("jsSendMsg");

const appendMsg = (text, nickname) => {
    const li = document.createElement("li");
    li.innerHTML = `
        <span class="author ${nickname ? (nickname !== "bot" ? "other" : nickname) : "self"}">${nickname || "you"}:</span> ${text}
    `;
    messages.appendChild(li);
}

const handleSendMsg = event => {
    event.preventDefault();
    const input = sendMsg.querySelector("input");
    const {
        value
    } = input;
    const {
        events
    } = window;
    getSocket().emit(events.sendMsg, {
        message: value
    });
    input.value = "";
    appendMsg(value);
}

export const handleNewMessage = ({
    message,
    nickname
}) => {
    appendMsg(message, nickname);
}

if (sendMsg) {
    sendMsg.addEventListener("submit", handleSendMsg);
}