/* const form = document.querySelector<HTMLFormElement>("#chat-area form")!;
const input = document.querySelector<HTMLInputElement>("#chat-message")!;
const messageArea =
  document.querySelector<HTMLUListElement>("#chat-section ul")!;
const messageTemplate = document.querySelector<HTMLTemplateElement>(
  "#chat-message-template",
)!;

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const message = input.value;
  input.value = "";

  fetch(`/chat/${window.roomId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  }).then((response) => {
    if (response.status !== 200) {
      console.error("Error:", response);
    }
  });
});

window.socket.on(
  `message:${window.roomId}`,
  ({
    message,
    sender,
  }: {
    message: string;
    sender: string;
    timestamp: string;
  }) => {
    const messageElement = messageTemplate.content.cloneNode(
      true,
    ) as HTMLElement;
    messageElement.querySelector("span")!.textContent = message;

    messageArea.appendChild(messageElement);
    messageArea.scrollTo(0, messageArea.scrollHeight);
  },
); */
