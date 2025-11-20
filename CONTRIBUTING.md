# Contributing to Git & GitHub Workshop Project

Thank you for your interest in contributing! This document provides guidelines for contributing to this project.

## Getting Started

1. Fork the repository
2. Clone your fork locally
3. Create a new branch for your feature/fix
4. Make your changes
5. Test your changes
6. Submit a pull request

## Development Setup

Follow the instructions in `SETUP_GUIDE.md` to set up your development environment.

## Code Style

### TypeScript

- Use TypeScript for all new code
- Follow existing patterns in the codebase
- Use meaningful variable and function names
- Add comments for complex logic

### Frontend (React)

- Use functional components with hooks
- Keep components small and focused
- Use TypeScript interfaces for props
- Follow React best practices

### Backend (Express)

- Use async/await for asynchronous operations
- Implement proper error handling
- Validate all inputs
- Follow RESTful API conventions

## Commit Messages

Follow the conventional commits format:

```
type(scope): subject

body (optional)

footer (optional)
```

Types:

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

Examples:

```
feat(frontend): add email validation to registration form
fix(backend): correct CSV export date formatting
docs: update API documentation
```

## Pull Request Process

1. **Update Documentation**: Update README if you change functionality
2. **Test Your Changes**: Ensure all features work as expected
3. **Clean Code**: Remove console.logs and debug code
4. **Follow Style Guide**: Match existing code style
5. **Describe Changes**: Provide clear PR description

## Testing

Before submitting a PR:

1. Test the registration flow end-to-end
2. Verify email sending works
3. Test CSV export functionality
4. Check responsive design on mobile
5. Test API endpoints with curl/Postman
6. Verify admin authentication

## Feature Requests

To request a feature:

1. Check if it's already requested in Issues
2. Create a new issue with "Feature Request" label
3. Describe the feature and its use case
4. Explain why it would be beneficial

## Bug Reports

To report a bug:

1. Check if it's already reported
2. Create a new issue with "Bug" label
3. Include:
   - Steps to reproduce
   - Expected behavior
   - Actual behavior
   - Screenshots (if applicable)
   - Environment details

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow
- Follow project guidelines

## Areas for Contribution

### Frontend

- UI/UX improvements
- Accessibility enhancements
- Performance optimization
- Additional form validations
- Mobile responsiveness

### Backend

- API enhancements
- Database optimizations
- Security improvements
- Email templates
- Logging system

### Documentation

- Tutorial improvements
- Code examples
- Troubleshooting guides
- Deployment guides

### DevOps

- Docker improvements
- CI/CD pipeline
- Deployment scripts
- Monitoring setup

## Questions?

Feel free to open an issue for any questions about contributing.

Thank you for contributing! 🎉
