// ===== НАСТРОЙКИ — поменяйте под свой сервер =====
const SERVER_IP = "fishsmp.minehost.gg";
// ================================================

document.getElementById("server-ip").textContent = SERVER_IP;
document.getElementById("year").textContent = new Date().getFullYear();

// Копирование IP
const copyBtn = document.getElementById("copy-btn");
copyBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(SERVER_IP);
    copyBtn.textContent = "Скопировано!";
  } catch {
    copyBtn.textContent = "Не вышло :(";
  }
  setTimeout(() => (copyBtn.textContent = "Скопировать"), 1800);
});

// Статус сервера через бесплатный API mcsrvstat.us
async function loadStatus() {
  const status = document.getElementById("status");
  const text = document.getElementById("status-text");
  try {
    const res = await fetch(`https://api.mcsrvstat.us/3/${SERVER_IP}`);
    const data = await res.json();

    if (data.online) {
      status.classList.add("online");
      text.textContent = "Онлайн";
      document.getElementById("players").textContent =
        `${data.players.online} / ${data.players.max}`;
      document.getElementById("version").textContent = data.version || "—";
    } else {
      status.classList.add("offline");
      text.textContent = "Оффлайн";
    }
  } catch {
    text.textContent = "Не удалось получить статус";
  }
}

loadStatus();
setInterval(loadStatus, 60000); // обновлять раз в минуту
