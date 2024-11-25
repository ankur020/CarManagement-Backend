# Car Management System 🚗

The **Car Management System** allows users to create, view, edit, and delete car listings. Each car listing includes up to 10 images, a title, a description, and tags such as car type, company, and dealer. This system includes secure user authentication and only allows users to manage their own car listings. Users can also search for cars based on attributes such as title, tags, and more.

---

## Features 📋

- **User Authentication**: Users can register, log in, and manage their own car listings.
- **Car Listing Management**:
  - **Create**: Add a new car listing with up to 10 images, title, description, and tags (e.g., car type, company, dealer).
  - **View**: View car listings with detailed information.
  - **Edit**: Edit existing car listings to update details.
  - **Delete**: Remove car listings when no longer needed.
- **Tags**: Tag car listings with attributes 
- **Search Functionality**: Search for cars based on title, tags, or other attributes.

---

## Technologies Used 🛠️

- **Backend**: Node.js, Express Js
- **Database**: MongoDB
- **Authentication & Authorization**: JWT (JSON Web Tokens) & Bcrypt
- **Cloud Storage**: Cloudinary & Multer
---

## Environment Variables ⚙️

To run this project locally, create a `.env` file in the root directory and add the following environment variables:

```bash
PORT=8000
MONGODB_URI=<your_mongodb_connection_uri>
ACCESS_TOKEN_SECRET=<your_jwt_secret_key>
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=<your_refresh_token_secret_key>
REFRESH_TOKEN_EXPIRY=7d
CLOUDINARY_CLOUD_NAME=<your_cloudinary_cloud_name>
CLOUDINARY_API_KEY=<your_cloudinary_api_key>
CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>


## Run Locally


Clone the project


```bash
  git clone https://github.com/ankur020/CarManagement-Backend.git
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```


## API Reference

Find out related api endpoints on the given link.

```bash
  https://documenter.getpostman.com/view/32441415/2sAY55bJa5
```
## Frontend Repo

```bash
  https://github.com/ankur020/cams-frontend
```
