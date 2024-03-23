# message_service_stripe

<h1 align="center">Message Service with Stripe payments</h1>
<p align="center"><img src="https://img.shields.io/badge/made_by-KD3821-darkviolet"></p>

<p align="center"><b>Управляйте рассылками с MESSAGE SERVICE!</b></p><br>
<ul>
<li>
Создайте .env файл в папке 'email_app' на одном уровне вложенности с файлом manage.py (используйте пример из файла env.example)</li>
<li>
Для .env файла также понадобятся данные вашего аккаунта Stripe (Secret key, Publishable key, Webhook Secret)</li>
<li>
Также необходимо создать в Stripe товар 'Campaign' (можно использовать любое ваше название) - с ценой $10 - и указать его 'price_id' в .env файле</li>
<li>
Перед запуском docker-compose из консоли установите пароль для БД в переменную среды командой: export POSTGRES_PASSWORD=EmailApp123 (пароль должен совпадать с паролем в .env файле)</li>
<li>
Также измените дефолтное значение таймаута для HTTP-соединения у контейнеров в момент сборки - из консоли запустите команду: export COMPOSE_HTTP_TIMEOUT=300 (300 сек. вместо 60 сек.)</li>
<li>
Запустите команду в консоли: docker-compose -f docker-compose.yml up --build (дождитесь завершения сборки сети контейнеров)</li>
<li>
Если по какой-то причине процесс остановился с ошибкой - вызовите команду из консоли: docker-compose down и дождитесь остановки. Затем повторите предыдущий шаг</li>
<li>
После завершения сборки сети нужно создать superuser для Django Admin в контейнере с приложением Django: docker exec -it message_backend /bin/bash (и далее: python manage.py createsuperuser)</li>
<li>
Авторизуйтесь в Django Admin ( http://127.0.0.1/admin ) и установите 'IntervalSchedule' для Celery Beat: 5, 10, 30 секунд (три интервала)</li>
<li>
Установите утилиту Stripe CLI и авторизуйтесь в ней с помощью вашего Stripe аккаунта - теперь вы сможете принимать запросы от Stripe на локальной машине</li>
<li>
Запустите утилиту на прослушивание событий от сервиса Stripe с помощью команды: stripe listen --forward-to 127.0.0.1:8000/api/webhook/</li>
<li>
Больше информации об использовании утилиты Stripe CLI и в целом модуля 'stripe' - рекомендуется ознакомиться с серией видеоуроков от компании Sripe: https://www.youtube.com/playlist?list=PLy1nL-pvL2M55YVn0mGoQ5r-39A1-ZypO </li>
<li>
Регистрируйтесь >> Входите в ЛК >> Добавляйте клиентов >> Создавайте рассылки >> Редактируйте и подтверждайте >> Проверяйте статус рассылки >> Оплачивайте счет за рассылку</li>
<li>
Тестовые карты для оплаты счета: 4242 4242 4242 4242 (успешная оплата), 4000 0000 0000 9995 (оплата не проходит). Срок действия и код могут быть любыми</li>
<li>
Если сообщение не будет отправлено с первого раза - повторная попытка произойдет через минимум 5 секунд. И так будет происходить пока не наступит таймаут - после первой попытки 60 секунд</li>
<li>
Если время окончания рассылки наступит раньше чем таймаут - попытки отправки сообщения будут остановлены</li>
<li>
Страница со Swagger-UI доступна по адресу: http://127.0.0.1/api/schema/swagger-ui/</li>
<li>
Страница с Redoc доступна по адресу: http://127.0.0.1/api/schema/redoc/</li>
<li>
Есть заготовка приложения с авторизацией по OAuth (частично реализована - сервис авторизации реализован на FastAPI & Vue.js - https://github.com/KD3821/email_app/tree/oauth</li>
<li>
Сервис авторизации (DOLLAR SERVICE) на FastAPI - https://github.com/KD3821/dollar_app & минимальным фронтендом на Vue.js + Vuetify- https://github.com/KD3821/dollar_vue</li></ul>


<p align="center"><img src="https://github.com/kd3821/message_service_stripe/blob/main/img/stripe_api_keys.png?raw=true"></p>

<p align="center"><img src="https://github.com/kd3821/message_service_stripe/blob/main/img/stripe_price_id.png?raw=true"></p>

<p align="center"><img src="https://github.com/kd3821/message_service_stripe/blob/main/img/edit_customer.png?raw=true"></p>

<p align="center"><img src="https://github.com/kd3821/message_service_stripe/blob/main/img/customer_list.png?raw=true"></p>

<p align="center"><img src="https://github.com/kd3821/message_service_stripe/blob/main/img/add_campaign.png?raw=true"></p>

<p align="center"><img src="https://github.com/kd3821/message_service_stripe/blob/main/img/confirm_start.png?raw=true"></p>

<p align="center"><img src="https://github.com/kd3821/message_service_stripe/blob/main/img/campaign_list.png?raw=true"></p>

<p align="center"><img src="https://github.com/kd3821/message_service_stripe/blob/main/img/email_service.png?raw=true"></p>

<p align="center"><img src="https://github.com/kd3821/message_service_stripe/blob/main/img/email_service_done.png?raw=true"></p>

<p align="center"><img src="https://github.com/kd3821/message_service_stripe/blob/main/img/pay_invoice.png?raw=true"></p>

<p align="center"><img src="https://github.com/kd3821/message_service_stripe/blob/main/img/stripe_checkout.png?raw=true"></p>

<p align="center"><img src="https://github.com/kd3821/message_service_stripe/blob/main/img/invoice_paid.png?raw=true"></p>

<p align="center"><img src="https://github.com/kd3821/message_service_stripe/blob/main/img/invoice_status.png?raw=true"></p>

<p align="center"><img src="https://github.com/kd3821/message_service_stripe/blob/main/img/stripe_cli_webhook.png?raw=true"></p>

<p align="center"><img src="https://github.com/kd3821/message_service_stripe/blob/main/img/schema_swagger_ui.png?raw=true"></p>

<p align="center"><img src="https://github.com/kd3821/message_service_stripe/blob/main/img/celery_beat_intervals.png?raw=true"></p>

<p align="center"><img src="https://github.com/kd3821/message_service_stripe/blob/main/img/oauth_service.png?raw=true"></p>