# Quick Start Guide for Contributors

Welcome to Refactron! This guide will help you get started with contributing.

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ installed
- Git installed
- A GitHub account

### 1. Fork and Clone

```bash
# Fork the repository on GitHub (click the Fork button)

# Clone your fork
git clone https://github.com/YOUR_USERNAME/Refactron_Website.git
cd Refactron_Website

# Add upstream remote
git remote add upstream https://github.com/Refactron-ai/Refactron_Website.git
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create a Branch

```bash
# Make sure you're on main and up to date
git checkout main
git pull upstream main

# Create a new branch
git checkout -b feature/your-feature-name
```

Branch naming conventions:
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `refactor/` - Code refactoring
- `test/` - Test additions/changes

### 4. Make Your Changes

Edit the code, following the project structure:
```
src/
├── components/     # React components
├── hooks/          # Custom React hooks
└── ...
```

### 5. Test Your Changes

```bash
# Run the development server
npm start

# In another terminal, run lint and format checks
npm run lint
npm run format:check

# Run tests
npm test

# Build the project
npm run build
```

**Fix formatting issues:**
```bash
# Auto-fix ESLint issues
npm run lint:fix

# Auto-format code with Prettier
npm run format
```

### 6. Commit Your Changes

Use semantic commit messages:

```bash
# Format: type: description

git add .
git commit -m "feat: add new hero animation"
git commit -m "fix: resolve mobile responsive issue"
git commit -m "docs: update README with setup instructions"
```

**Commit Types:**
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation only
- `style` - Code style/formatting
- `refactor` - Code refactoring
- `test` - Adding tests
- `chore` - Maintenance tasks

### 7. Push and Create PR

```bash
# Push to your fork
git push origin feature/your-feature-name
```

Then go to GitHub and click "Compare & pull request"

## 📝 Pull Request Checklist

Before submitting your PR, make sure:

- [ ] Code follows the project style (run `npm run lint` and `npm run format:check`)
- [ ] No linting errors (`npm run lint`)
- [ ] Code is properly formatted (`npm run format:check`)
- [ ] Tests pass locally (`npm test`)
- [ ] Build succeeds (`npm run build`)
- [ ] PR title follows semantic format: `type: description`
- [ ] PR description clearly explains the changes
- [ ] Related issue is linked (if applicable)
- [ ] Documentation is updated (if needed)
- [ ] No console errors or warnings
- [ ] Tested on multiple browsers (for UI changes)

## 🤖 What Happens After You Submit

### Automated Checks

When you open a PR, several automated checks will run:

1. **CI Workflow** - Tests, linting, formatting checks, and builds your code
2. **PR Validation** - Checks PR title format
3. **CodeQL** - Security scanning
4. **Dependency Review** - Checks for vulnerable dependencies
5. **Auto Label** - Automatically labels your PR

These must pass before your PR can be merged.

### Review Process

1. A maintainer will review your PR
2. They may request changes or ask questions
3. Address feedback by pushing new commits
4. Once approved, a maintainer will merge your PR

## 💡 Tips for Success

### First Time Contributors

Look for issues labeled `good first issue` - these are beginner-friendly!

### Asking for Help

- Comment on the issue you want to work on
- Ask questions in your PR if something is unclear
- Join discussions in the issue comments

### Keeping Your Fork Updated

```bash
# Fetch upstream changes
git fetch upstream

# Merge upstream main into your main
git checkout main
git merge upstream/main

# Push to your fork
git push origin main
```

### Rebasing Your Branch

If your branch is behind main:

```bash
git checkout feature/your-feature-name
git rebase main
git push --force-with-lease origin feature/your-feature-name
```

## 🐛 Found a Bug?

1. Check if an issue already exists
2. If not, create a bug report using the template
3. Include:
   - Clear description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Your environment (browser, OS, Node version)

## 💡 Have an Idea?

1. Check if a similar feature request exists
2. If not, create a feature request using the template
3. Explain:
   - The problem it solves
   - Your proposed solution
   - Why it would be useful

## 🎨 Code Style

### TypeScript

```typescript
// Use TypeScript for new files
interface Props {
  title: string;
  count?: number;
}

const MyComponent: React.FC<Props> = ({ title, count = 0 }) => {
  return <div>{title}: {count}</div>;
};
```

### Tailwind CSS

```tsx
// Use Tailwind classes for styling
<div className="flex items-center justify-center p-4 bg-gray-900">
  <h1 className="text-3xl font-bold text-white">Hello</h1>
</div>
```

### Component Structure

```tsx
// 1. Imports
import React from 'react';
import { motion } from 'framer-motion';

// 2. Types/Interfaces
interface Props {
  // ...
}

// 3. Component
export const MyComponent: React.FC<Props> = ({ prop1, prop2 }) => {
  // Hooks
  const [state, setState] = useState(false);

  // Handlers
  const handleClick = () => {
    // ...
  };

  // Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
};
```

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run in watch mode
npm test -- --watch

# Run with coverage
npm test -- --coverage
```

### Writing Tests

```typescript
import { render, screen } from '@testing-library/react';
import { MyComponent } from './MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent title="Test" />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
```

## 🔍 Common Issues

### npm install fails

```bash
# Clear cache and retry
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### Build fails

```bash
# Check for TypeScript errors
npx tsc --noEmit

# Check for linting errors
npm run build
```

### Tests fail

```bash
# Run tests with verbose output
npm test -- --verbose
```

## 📚 Resources

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)

## 🎯 What to Contribute

### High Priority

- Bug fixes
- Performance improvements
- Accessibility improvements
- Test coverage

### Always Welcome

- Documentation improvements
- Code comments
- Examples and tutorials
- Bug reports

### Need Ideas?

Check the issues page for:
- `good first issue` - Beginner friendly
- `help wanted` - Need community help
- `enhancement` - New features

## 🤝 Code of Conduct

By participating, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md).

Be respectful, inclusive, and professional in all interactions.

## 📞 Questions?

- **Issues:** Use issue templates for bugs/features
- **Discussions:** For general questions
- **Email:** hello@refactron.ai

---

**Thank you for contributing to Refactron! 🚀**

Every contribution, no matter how small, makes a difference!
