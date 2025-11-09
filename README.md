# Invoice Billing Application

This is a full-stack invoice billing application with a React frontend and a Node.js backend.

## Features

*   User authentication (Register and Login)
*   Client management (Create, Read, Update, Delete)
*   Invoice management (Create, Read, Update, Delete)
*   Generate PDF invoices
*   Dashboard with an overview of invoices and clients

## Technologies Used

### Frontend

*   React
*   React Router
*   Axios
*   Bootstrap
*   html2pdf.js

### Backend

*   Node.js
*   Express
*   Sequelize (with MySQL2)
*   JSON Web Token (JWT) for authentication
*   Bcrypt for password hashing
*   PDFKit for PDF generation

## Getting Started

### Prerequisites

*   Node.js and npm
*   MySQL

### Backend Setup

1.  Navigate to the `backend` directory:
    ```sh
    cd backend
    ```
2.  Install the dependencies:
    ```sh
    npm install
    ```
3.  Create a `.env` file and add your database credentials:
    ```
    DB_HOST=localhost
    DB_USER=your_db_user
    DB_PASSWORD=your_db_password
    DB_NAME=your_db_name
    JWT_SECRET=your_jwt_secret
    ```
4.  Start the backend server:
    ```sh
    npm start
    ```

### Frontend Setup

1.  Navigate to the `frontend` directory:
    ```sh
    cd frontend
    ```
2.  Install the dependencies:
    ```sh
    npm install
    ```
3.  Start the frontend development server:
    ```sh
    npm start
    ```

The application will be available at `http://localhost:3000`.

## Folder Structure

```
├── backend
│   ├── app.js
│   ├── config
│   │   └── db.js
│   ├── middleware
│   │   └── authMiddleware.js
│   ├── models
│   │   ├── Client.js
│   │   ├── index.js
│   │   ├── Invoice.js
│   │   ├── InvoiceItem.js
│   │   ├── Payment.js
│   │   └── User.js
│   ├── routes
│   │   ├── auth.js
│   │   ├── client.js
│   │   └── invoice.js
│   └── utils
│       └── generateInvoicePDF.js
└── frontend
    ├── public
    └── src
        ├── components
        │   └── Sidebar.js
        ├── context
        │   ├── clientContext.js
        │   ├── clientState.js
        │   ├── invoiceContext.js
        │   └── InvoiceState.js
        ├── pages
        │   ├── Clients.js
        │   ├── Dashboard.js
        │   ├── InvoiceDetails.js
        │   ├── Invoices.js
        │   ├── Login.js
        │   └── Register.js
        └── styles
            ├── Clients.css
            ├── Dashboard.css
            ├── Login.css
            ├── Register.css
            └── Sidebar.css
```
