# Starwars Frontend

Frontend web application to represent and process information consumed from the backend API which comunicates with the public SWAPI API.

## Main Technologies

- Angular 19
- Angular Material

## Installation & Execution

### Requirements

- Node 18+
- Angular CLI
- Docker (optional)

### Local Execution
Execute cmd console from the directory of the frontend project: ../starwars-app/starwars-frontend

```bash
npm install
ng serve
```
Application will be available at http://localhost:4200/

### Docker Execution
Execute cmd console from the directory of the backend project: ../starwars-app/starwars-frontend
```bash
docker build -t starwars-frontend .
docker run -p 6969:8080 starwars-frontend
```
Application will be available at http://localhost:6969/

### Docker Compose Execution
Execute cmd console from the root directory of the web app project: ../starwars-app
```bash
docker compose up --build frontend
```
Application will be available at http://localhost:6969/

## Configuration

Main configuration is in `src/environments/environment.ts`:

- `apiBaseUrl`: Base URL for backend API (default: http://localhost:8080)

## Main Views

> You can check the application at `http://localhost:6969` or `http://localhost:4200` (depending on the followed execution path) once the application is running.

Example views (complete according to implementation):

- `/people`: List characters with filters and pagination
- `/planets`: List planets with filters and pagination

## Project Structure

- `components/`: General reusable components
- `config/`: Application configuration
- `models/`: Data models
- `pages/`: Main pages

## Additional Notes

- Async procesing and concurrency control are not implemented yet since they are not required for the project and is not
  supposed to receive high number of requests.

## Contribution

Contributions are welcome! Please open an issue or pull request for suggestions or improvements.

## GitHub

You can find the project on GitHub: https://github.com/xoanross/starwars-frontend

## Contact

You can contact me at xoanross@gmail.com
