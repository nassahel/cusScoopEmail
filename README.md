# Envío de E-mail mediante Resend

## Pasos para desplegar y usar la aplicación

- Clona el repositorio con el siguiente comando en una terminal:

    ```bash
    git clone https://github.com/nassahel/cusScoopEmail.git
    ```

- Instala las dependencias de Node.js:

    ```bash
    npm install
    ```

- Crea un archivo `.env` y define la API key de Resend junto con el puerto. Ejemplo:

    ```env
    RESEND_API_KEY=miApyKeiDeResend
    PORT=3000
    ```

- Usa una herramienta para gestionar endpoints (como Postman) y realiza una solicitud `POST` al siguiente endpoint. Al hacerlo, se enviará automáticamente un email a la dirección establecida en el código.

    **Endpoint**:

    ```
    http://localhost:3000/send-email
    ```


