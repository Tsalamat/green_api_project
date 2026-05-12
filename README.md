## Запуск проекта

Чтобы запустить проект на сервере, вам нужно установить Docker Compose и выполнить команду:

```bash
docker compose up -d --build
Перед запуском обязательно откройте файл Caddyfile и замените домен 404tears.kz на свой собственный домен.
Пример:
yourdomain.com, www.yourdomain.com {
    root * /var/www/404tears
    file_server

    try_files {path} /index.html

    handle /api/* {
        reverse_proxy backend:8080
    }
}
После изменения Caddyfile сохраните файл и перезапустите проект:
docker compose restart
После этого проект будет готов к работе 🚀
