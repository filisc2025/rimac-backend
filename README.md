# Rimac Backend Challenge

Este proyecto implementa un backend serverless en AWS para la gestión de citas médicas, usando Node.js, TypeScript, DynamoDB y SNS.

## Endpoints principales

- **POST /appointments**
	- Crea una cita médica.
	- Body JSON: `{ insuredId, scheduleId, countryISO }`
	- Respuesta: `{ message, appointment }`

- **GET /appointments/{insuredId}**
	- Obtiene todas las citas de un asegurado.
	- Respuesta: `{ appointments: [...] }`

## Documentación Swagger

La documentación OpenAPI está en `docs/openapi.yaml`.
Puedes visualizarla con [Swagger Editor](https://editor.swagger.io/) copiando el contenido del archivo.

## Despliegue

El proyecto usa Serverless Framework. Para desplegar:

```bash
npx serverless deploy
```

Asegúrate de tener configuradas tus credenciales AWS y la región correcta (`us-east-2`).

## Pruebas

Los tests de los endpoints están en la carpeta `tests/` y pueden ejecutarse con:

```bash
npm test
```

## Repositorio

GitHub: https://github.com/filisc2025/rimac-backend.git

## Autor

Fili Sanchez Condori

---

Para dudas o soporte, revisa el archivo `docs/swagger-instructions.md` o contacta por GitHub.
