# Pokédex

A full-stack web application that allows users to browse Pokémon, search for Pokémon by name, and manage their favorite Pokémon.

The application uses a custom REST API to retrieve Pokémon data from the [PokéAPI](https://pokeapi.co/), while MongoDB stores the user's favorite Pokémon.

## Features

* **Pokémon Listing:** Browse Pokémon with their names and images.
* **Pokémon Search:** Search for a Pokémon by name.
* **Favorites:** Add and remove Pokémon from favorites.
* **Persistent Favorites:** Favorite selections are stored in MongoDB and retrieved when the application loads.
* **REST API:** A custom backend handles communication with the PokéAPI and manages favorites.

## Tech Stack

### Frontend

* React
* TypeScript
* Vite
* Material UI (MUI)

### Backend

* Node.js
* Express.js
* TypeScript
* Axios
* Mongoose

### Database and External API

* MongoDB
* [PokéAPI](https://pokeapi.co/)

## Project Structure

The repository contains both the frontend and backend applications.

```text
pokedex/
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
├── backend/
│   ├── src/
│   ├── .env.example
│   ├── package.json
│   └── ...
├── .gitignore
├── AI_USAGE.md
└── README.md
```

## Prerequisites

Before running the application, ensure you have the following installed:

* **Node.js and npm:** Required to install dependencies and run both applications.
* **MongoDB:** A local MongoDB instance must be running before starting the backend.
* **Git:** Required to clone the repository.

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd pokedex
```

Replace `<repository-url>` with the URL of this repository.

### 2. Configure and Run the Backend

Navigate to the backend directory:

```bash
cd backend
```

Install the dependencies:

```bash
npm install
```

Create your local environment file from the provided example.

**Windows (Command Prompt):**

```cmd
copy .env.example .env
```

**macOS / Linux:**

```bash
cp .env.example .env
```

Review the `.env` file and ensure the configuration matches your local environment.

The default configuration is:

```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/pokedex
POKEAPI_BASE_URL=https://pokeapi.co/api/v2
```

Make sure MongoDB is running locally before starting the backend.

Start the backend in development mode:

```bash
npm run dev
```

The API will be available at:

```text
http://localhost:3000
```

This assumes the default port is configured.

### 3. Configure and Run the Frontend

Open a second terminal and navigate to the frontend directory from the repository root:

```bash
cd frontend
```

Install the dependencies:

```bash
npm install
```

Start the frontend development server:

```bash
npm run dev
```

Vite will display the local URL where the application is available. Open that URL in your browser to use the Pokédex.

## API Endpoints

The backend exposes the following REST endpoints:

| Method | Endpoint                          | Description                                   |
| ------ | --------------------------------- | --------------------------------------------- |
| GET    | `/api/pokemon`                    | Retrieve a paginated list of Pokémon.         |
| GET    | `/api/pokemon/search?name={name}` | Search for a Pokémon by name.                 |
| GET    | `/api/pokemon/:id`                | Retrieve Pokémon details by ID.               |
| GET    | `/api/favorites`                  | Retrieve the current user's favorite Pokémon. |
| POST   | `/api/favorites/:pokemonId`       | Add a Pokémon to favorites.                   |
| DELETE | `/api/favorites/:pokemonId`       | Remove a Pokémon from favorites.              |

Favorite endpoints use the `X-User-Id` request header to identify the user.

## Data Storage

Pokémon information is retrieved from the PokéAPI through the custom backend API. The frontend does not communicate directly with the public PokéAPI.

MongoDB stores favorite selections associated with a user identifier. Pokémon details are retrieved from the external API rather than stored locally.

## AI Usage Disclosure

This project includes an [`AI_USAGE.md`](./AI_USAGE.md) file documenting the AI tools used, relevant prompts, technical decisions, and the verification process.

## License

This project was developed as a technical assessment.
