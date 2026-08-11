# Dish Directory
 
A recipe browsing web app built with **Next.js**, **TypeScript**, and **Material UI**. Browse recipes, view detailed ingredients and instructions, search and filter, manage a personal profile, save favorites, and add your own recipes — all backed by the [DummyJSON](https://dummyjson.com) API.
 
> **Note:** This project uses DummyJSON as a mock backend and has no real database. Any recipe you "add" is sent to the API but will **not** actually persist — DummyJSON simulates a successful response without storing the data.
 
---
 
## ✨ Features
 
- **Home Page** — landing page introducing the app and highlighting recipes.
- **Recipes Page** — browse all recipes with:
  - 🔍 **Search** by name/keyword
  - 🎚️ **Filters** (e.g. cuisine, meal type, difficulty, tags)
- **Recipe Details Page** — full detail view for a single recipe, including ingredients list, step-by-step instructions, and the ability to save/unsave the recipe.
- **Add Recipe Page/Form** — a form to submit a new recipe (name, difficulty, cuisine, tags, meal type, ingredients, instructions, image). Submits to the API, but since there's no real database, nothing is actually persisted.
- **Authentication (Login Page)** — users log in via the DummyJSON auth API.
- **Profile Page** *(protected)* — view your personal info and the recipes you've created.
- **Saved Page** *(protected)* — view recipes you've bookmarked, saved in local storage per logged-in user.
- **Protected Routes** — the Profile and Saved pages require the user to be logged in; unauthenticated users are redirected to the login page.
---
 
## 🛠️ Tech Stack
 
| Category         | Technology |
|-------------------|------------|
| Framework          | [Next.js](https://nextjs.org/) |
| Language           | [TypeScript](https://www.typescriptlang.org/) |
| UI Library         | [Material UI (MUI)](https://mui.com/) |
| Forms              | React Hook Form + Yup (schema validation) |
| Data Source        | [DummyJSON API](https://dummyjson.com) |
| Notifications      | react-toastify |
 
---
 
## 📁 Project Structure (high level)
