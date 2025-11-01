# Security Policy

## Supported Versions

We release patches for security vulnerabilities in the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |

## Reporting a Vulnerability

The Refactron team takes security bugs seriously. We appreciate your efforts to responsibly disclose your findings and will make every effort to acknowledge your contributions.

### How to Report a Security Vulnerability

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please report them via email to:

**hello@refactron.ai**

Include the following information in your report:

- Type of issue (e.g., buffer overflow, SQL injection, cross-site scripting, etc.)
- Full paths of source file(s) related to the manifestation of the issue
- The location of the affected source code (tag/branch/commit or direct URL)
- Any special configuration required to reproduce the issue
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the issue, including how an attacker might exploit the issue

### What to Expect

After submitting a vulnerability report, you can expect:

1. **Acknowledgment**: We will acknowledge receipt of your report within 48 hours
2. **Assessment**: We will assess the vulnerability and determine its impact and severity
3. **Updates**: We will keep you informed about our progress throughout the process
4. **Resolution**: We will work on a fix and release it as soon as possible
5. **Credit**: With your permission, we will credit you for the discovery in our release notes

### Security Update Process

1. The security report is received and assigned to a primary handler
2. The problem is confirmed and a list of affected versions is determined
3. Code is audited to find any similar problems
4. Fixes are prepared for all supported releases
5. New versions are released and announcements are made

## Security Best Practices

When using this project:

1. **Environment Variables**: Never commit `.env` files or expose API keys
2. **Dependencies**: Keep dependencies up to date with `npm audit` and `npm update`
3. **HTTPS**: Always use HTTPS in production
4. **Input Validation**: Validate all user inputs on the client and server side
5. **API Keys**: Rotate API keys regularly and use environment-specific keys

## Disclosure Policy

When we receive a security bug report, we will:

- Confirm the problem and determine affected versions
- Audit code to find any similar problems
- Prepare fixes for all supported releases
- Release new versions as soon as possible

## Comments on this Policy

If you have suggestions on how this process could be improved, please submit a pull request.

---

Thank you for helping keep Refactron and our users safe! 🔒
