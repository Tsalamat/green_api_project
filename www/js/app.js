function getBaseUrl(method) {
  const idInstance = document.getElementById("idInstance").value.trim();
  const apiTokenInstance = document.getElementById("apiTokenInstance").value.trim();

  if (!idInstance || !apiTokenInstance) {
    throw new Error("Введите idInstance и ApiTokenInstance");
  }

  return `https://api.green-api.com/waInstance${idInstance}/${method}/${apiTokenInstance}`;
}

function showResponse(data) {
  document.getElementById("response").value = JSON.stringify(data, null, 2);
}

function showError(error) {
  document.getElementById("response").value = "ERROR:\n" + error.message;
}

async function request(method, options = {}) {
  try {
    const url = getBaseUrl(method);

    const response = await fetch(url, options);
    const text = await response.text();

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }

    showResponse({
      status: response.status,
      ok: response.ok,
      data: data
    });
  } catch (error) {
    showError(error);
  }
}

async function getSettings() {
  await request("getSettings", { method: "GET" });
}

async function getStateInstance() {
  await request("getStateInstance", { method: "GET" });
}

async function sendMessage() {
  const chatId = document.getElementById("chatId").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!chatId || !message) {
    showError(new Error("Введите chatId и message"));
    return;
  }

  await request("sendMessage", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chatId, message })
  });
}

async function sendFileByUrl() {
  const chatId = document.getElementById("fileChatId").value.trim();
  const urlFile = document.getElementById("urlFile").value.trim();
  const fileName = document.getElementById("fileName").value.trim();
  const caption = document.getElementById("caption").value.trim();

  if (!chatId || !urlFile || !fileName) {
    showError(new Error("Введите chatId, urlFile и fileName"));
    return;
  }

  await request("sendFileByUrl", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chatId, urlFile, fileName, caption })
  });
}
