# Contributing to Refactron Website

Thank you for your interest in contributing to Refactron! We welcome contributions from the community and are excited to have you here.

## 🤝 How to Contribute

### Reporting Issues

Before creating an issue, please check if a similar issue already exists. When creating a new issue:

- Use a clear and descriptive title
- Describe the issue in detail
- Include steps to reproduce (for bugs)
- Add screenshots if applicable
- Specify your environment (browser, OS, Node.js version)

### Suggesting Enhancements

We love to hear your ideas! When suggesting enhancements:

- Use a clear and descriptive title
- Provide a detailed description of the suggested enhancement
- Explain why this enhancement would be useful
- Include mockups or examples if applicable

### Pull Requests

1. **Fork the repository** and create your branch from `main`
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow the existing code style
   - Write clear, commented code when necessary
   - Ensure your code lints without errors

3. **Test your changes**
   ```bash
   npm test
   npm run build
   ```

4. **Commit your changes**
   - Write clear, concise commit messages
   - Follow the format: `type: description`
   - Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`
   
   Example:
   ```bash
   git commit -m "feat: add new animation to hero section"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Open a Pull Request**
   - Provide a clear description of the changes
   - Reference any related issues
   - Wait for review and address any feedback

## 📋 Development Setup

1. **Prerequisites**
   - Node.js (v16 or higher)
   - npm or yarn

2. **Clone and Install**
   ```bash
   git clone https://github.com/Refactron-ai/Refactron_Website.git
   cd Refactron_Website
   npm install
   ```

3. **Environment Variables**
   - Copy `.env.example` to `.env`
   - Fill in the required values (see README for details)

4. **Start Development Server**
   ```bash
   npm start
   ```

## 🎨 Code Style

- Use TypeScript for all new files
- Follow the existing code structure
- Use meaningful variable and function names
- Keep components small and focused
- Use Tailwind CSS for styling
- Follow React best practices

## 🧪 Testing

- Write tests for new features
- Ensure all tests pass before submitting PR
- Maintain or improve code coverage

## 📝 Documentation

- Update README.md if you change functionality
- Comment complex logic
- Update relevant markdown files if needed

## 🔍 Code Review Process

1. At least one maintainer will review your PR
2. Address any requested changes
3. Once approved, a maintainer will merge your PR

## 🎯 Good First Issues

Look for issues labeled `good first issue` to get started!

## 💬 Questions?

Feel free to reach out:
- Open a discussion on GitHub
- Email: hello@refactron.dev

## 📜 Code of Conduct

Please read and follow our [Code of Conduct](CODE_OF_CONDUCT.md) to keep our community welcoming and respectful.

---

Thank you for contributing to Refactron! 🚀
