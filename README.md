
### Notes
- **UI Tests**: Cypress tests cover login (valid/invalid), item CRUD, and visual snapshots. Selectors use placeholders (e.g., `placeholder="Title"`) for robustness, but you may need to adjust if the UI changes.
- **API Tests**: Supertest covers all specified endpoints with positive and negative cases, using the admin user for authentication.
- **Test Plan**: The LaTeX document is concise (1–2 pages) and can be converted to DOCX using Pandoc or an online tool.
- **CI/CD**: The GitHub Actions workflow runs tests, generates coverage, and uploads artifacts. Percy snapshots require a token.
- **Coverage**: NYC is used for backend coverage; Cypress includes code coverage via `@cypress/code-coverage`.
- **Vite Fix**: Assumes the previous `index.js` and `styles.css` issues are resolved with the provided updates.

### Running the Tests
1. **Start the App**:
   ```bash
   docker-compose up --build