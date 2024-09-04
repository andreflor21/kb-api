# Kanban API

![License](https://img.shields.io/github/license/andreflor21/kb-api)
![Node.js Version](https://img.shields.io/badge/node-%3E%3D%2020.x-brightgreen)
![TypeScript Version](https://img.shields.io/badge/typescript-%3E%3D%204.x-blue)

A knowledge base API designed to provide efficient and flexible access to knowledge resources. Built with Node.js and TypeScript.

## Table of Contents

-   [Installation](#installation)
-   [Usage](#usage)
-   [API Documentation](#api-documentation)
    -   [Authentication](#authentication-1)
    -   [Users](#users)
    -   [Profile](#profiles)
    -   [Section](#sections)
    -   [Supplier](#suppliers)
    -   [Import/Export](#importexport)
-   [License](#license)

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/andreflor21/kb-api.git
    cd kb-api
    ```

2. **Install dependencies:**

    Make sure you have Node.js (>= 14.x) and npm installed.

    if you are using <code>npm</code>. Then run:

    ```bash
    npm install
    ```

    if you are using <code>yarn</code>. Then run:

    ```bash
    yarn install
    ```

    if you are using <code>pnpm</code>. Then run:

    ```bash
    pnpm install
    ```

3. **Set up environment variables:**

    Create a .env file in the root directory with the following variables:

    ```env

        DATABASE_URL="mysql://user:db@localhost:3306/db?schema=public"
        FROM_EMAIL=""
        SMTP_HOST=""
        SMTP_PORT=
        SMTP_USER=""
        SMTP_PASSWORD=""
        JWT_SECRET=""
        NODE_ENV=
        PORT=
    ```

4. **Start the Server**

    ```bash
    npm run dev
    ```

    The API will be running at http://localhost:`port`.

## Usage

To use this API, you can make HTTP requests to the endpoints. Below is an example using curl:

```bash
curl -X GET http://localhost:port/suppliers/new
```

## API Documentation

### Base URL

All endpoints are prefixed with the base URL: http://localhost:`port`

### Authentication

Most routes require a Bearer token for authorization.

### Users

-   **Create a New User**

    -   **Endpoint:** `POST /users/new`
    -   **Body:**
        ```json
        {
            "name": "Usuario",
            "email": "kanban@email.com",
            "password": "123456",
            "perfil": "b7ae3086-e3bd-49bc-ab67-df9929bf3650"
        }
        ```
    -   **Description:** Creates a new user with the specified details.

-   **Edit a User**

    -   **Endpoint:** `PATCH /users/{usuario_id}/edit`
    -   **Body:**
        ```json
        {
            "name": "Usuario 2",
            "email": "kanban@email.com",
            "cpf": "123.456.789-09",
            "birthdate": "1990-01-01T00:00:00Z",
            "code": "12345"
        }
        ```
    -   **Description:** Updates the details of an existing user.

-   **Delete a User**

    -   **Endpoint:** `DELETE /users/{usuario_id}/delete`
    -   **Description:** Deletes the specified user.

-   **Change Password**

    -   **Endpoint:** `PATCH /users/{usuario_id}/change-password`
    -   **Body:**
        ```json
        {
            "password": "123456"
        }
        ```
    -   **Description:** Updates the password of the specified user.

-   **Get a User**

    -   **Endpoint:** `GET /users/{usuario_id}`
    -   **Description:** Retrieves details of a specific user.

-   **List Users**

    -   **Endpoint:** `GET /users`
    -   **Description:** Lists all users.

-   **Forgot Password**
    -   **Endpoint:** `POST /forgot-password`
    -   **Body:**
        ```json
        {
            "email": "kanban@email.com"
        }
        ```
    -   **Description:** Initiates the password reset process for a user.

### Profiles

-   **Create a New Profile**

    -   **Endpoint:** `POST /profiles/new`
    -   **Body:**
        ```json
        {
            "description": "Admin"
        }
        ```
    -   **Description:** Creates a new profile.

-   **Duplicate a Profile**

    -   **Endpoint:** `POST /profiles/{perfil_id}/duplicate`
    -   **Body:**
        ```json
        {
            "description": "Admin"
        }
        ```
    -   **Description:** Duplicates an existing profile.

-   **Delete a Profile**

    -   **Endpoint:** `DELETE /perfil/{perfil_id}/delete`
    -   **Description:** Deletes the specified profile.

-   **Link Routes to Profile**

    -   **Endpoint:** `POST /perfil/{perfil_id}/rotas/link`
    -   **Description:** Links routes to a specified profile.

-   **Unlink Route from Profile**

    -   **Endpoint:** `DELETE /profiles/{perfil_id}/routes/{rota_id}/unlink`
    -   **Description:** Unlinks a route from a specified profile.

-   **Get Profile Details**

    -   **Endpoint:** `GET /profiles/{perfil_id}`
    -   **Description:** Retrieves details of a specific profile.

-   **Get Profile Routes**
    -   **Endpoint:** `GET /profiles/{perfil_id}/routes`
    -   **Description:** Lists all routes linked to a specific profile.

### Routes

-   **List Routes**

    -   **Endpoint:** `GET /routes`
    -   **Description:** Retrieves a list of all available routes.

-   **Create New Routes**

    -   **Endpoint:** `POST /routes/new`
    -   **Body:** An array of route objects
        ```json
        [
          { "description": "Dados do Usuário", "path": "/users/:usuario_id", "method": "get" },
          ...
        ]
        ```
    -   **Description:** Creates new routes.

-   **Update a Route**
    -   **Endpoint:** `PATCH /routes/{rota_id}/edit`
    -   **Description:** Updates a specific route.

### Sections

-   **Get Section Types**

    -   **Endpoint:** `GET /sections/types`
    -   **Description:** Retrieves a list of all section types.

-   **Create a New Section Type**

    -   **Endpoint:** `POST /sections/types/new`
    -   **Body:**
        ```json
        {
            "description": "Almoxarifado",
            "abreviation": "ALM"
        }
        ```
    -   **Description:** Creates a new section type.

-   **Update a Section Type**

    -   **Endpoint:** `PATCH /sections/types/{tipo_id}/edit`
    -   **Body:**
        ```json
        {
            "description": "Almoxarifado",
            "abreviation": "A"
        }
        ```
    -   **Description:** Updates an existing section type.

-   **Delete a Section Type**

    -   **Endpoint:** `DELETE /sections/types/{tipo_id}/delete`
    -   **Description:** Deletes a specific section type.

-   **Get Sections**

    -   **Endpoint:** `GET /sections`
    -   **Description:** Retrieves a list of all sections.

-   **Get Section Details**

    -   **Endpoint:** `GET /sections/{secao_id}`
    -   **Description:** Retrieves details of a specific section.

-   **Create a New Section**

    -   **Endpoint:** `POST /sections/new`
    -   **Body:**
        ```json
        {
            "description": "Entrega",
            "code": "002",
            "branchMatrixCode": "0001",
            "ERPcode": null,
            "sectionType": {
                "abreviation": "A",
                "description": "Almoxarifado"
            }
        }
        ```
    -   **Description:** Creates a new section.

-   **Update a Section**

    -   **Endpoint:** `PATCH /sections/{secao_id}/edit`
    -   **Body:**
        ```json
        {
            "description": "Recebimento",
            "code": "001",
            "branchMatrixCode": "0002",
            "ERPcode": null,
            "sectionTypeId": 1
        }
        ```
    -   **Description:** Updates an existing section.

-   **Activate/Deactivate a Section**
    -   **Endpoint:** `PUT /sections/{secao_id}/status`
    -   **Body:**
        ```json
        {
            "active": true
        }
        ```
    -   **Description:** Activates or deactivates a specific section.

### Suppliers

-   **Get Suppliers**

    -   **Endpoint:** `GET /suppliers`
    -   **Description:** Retrieves a list of all suppliers.

-   **Create a New Supplier**

    -   **Endpoint:** `POST /suppliers/new`
    -   **Body:**
        ```json
        {
            "code": "001",
            "ERPcode": "001",
            "name": "Fornecedor A",
            "cnpj": "00.000.000/0001-00"
        }
        ```
    -   **Description:** Creates a new supplier.

-   **Update a Supplier**

    -   **Endpoint:** `PATCH /suppliers/{forn_id}/edit`
    -   **Body:**
        ```json
        {
            "code": "001",
            "ERPcode": null,
            "name": "Fornecedor A",
            "cnpj": "00.000.000/0001-00"
        }
        ```
    -   **Description:** Updates an existing supplier.

-   **Get Supplier Details**

    -   **Endpoint:** `GET /suppliers/{forn_id}`
    -   **Description:** Retrieves details of a specific supplier.

-   **Delete a Supplier**

    -   **Endpoint:** `DELETE /suppliers/{forn_id}/delete`
    -   **Description:** Deletes a specific supplier.

-   **Activate/Deactivate a Supplier**
    -   **Endpoint:** `PUT /suppliers/{forn_id}/status`
    -   **Body:**
        ```json
        {
            "active": true
        }
        ```
    -   **Description:** Activates or deactivates a specific supplier.

### Import/Export

-   **Export Suppliers**

    -   **Endpoint:** `GET /export/suppliers`
    -   **Description:** Exports a list of all suppliers.

-   **Import Suppliers**
    -   **Endpoint:** `POST /import/suppliers`
    -   **Description:** Imports suppliers from a CSV file.

### Authentication

-   **Login**

    -   **Endpoint:** `POST /login`
    -   **Body:**
        ```json
        {
            "email": "kanban@email.com",
            "password": "123457"
        }
        ```
    -   **Description:** Authenticates a user and returns a token.

-   **Password Recovery**
    -   **Endpoint:** `POST reset-password/{token_passord}`
    -   **Body:**
        ```json
        {
            "password": "123456"
        }
        ```
    -   **Description:** Resets the password for a user.

## License

This project is licensed under the MIT License - see the [LICENSE](https://img.shields.io/github/license/andreflor21/kb-api) file for details.
