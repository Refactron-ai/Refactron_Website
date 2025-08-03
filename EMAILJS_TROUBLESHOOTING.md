# EmailJS 400 Error Troubleshooting Guide

## The Problem
You're getting a 400 error when trying to send emails through EmailJS. This usually means there's a configuration issue.

## Quick Fix Steps

### 1. Check Your Environment Variables
Create a `.env` file in your project root (if you haven't already):

```env
REACT_APP_EMAILJS_SERVICE_ID=your_actual_service_id
REACT_APP_EMAILJS_TEMPLATE_ID=your_actual_template_id
REACT_APP_EMAILJS_PUBLIC_KEY=your_actual_public_key
```

### 2. Get Your EmailJS Credentials

#### Service ID:
1. Go to EmailJS Dashboard → Email Services
2. Click on your service (Gmail, Outlook, etc.)
3. Copy the **Service ID** (looks like: `service_abc123`)

#### Template ID:
1. Go to EmailJS Dashboard → Email Templates
2. Click on your "Contact Us" template
3. Copy the **Template ID** from the URL or settings (looks like: `template_xyz789`)

#### Public Key:
1. Go to EmailJS Dashboard → Account → API Keys
2. Copy your **Public Key** (looks like: `user_def456`)

### 3. Restart Your Development Server
After creating/updating the `.env` file:

```bash
npm start
```

### 4. Check Browser Console
Open browser console (F12) and look for:
- EmailJS Config log showing your credentials
- Any specific error messages

## Common Issues & Solutions

### Issue 1: Environment Variables Not Loading
**Symptoms:** Console shows `your_service_id` instead of real ID

**Solution:**
- Make sure `.env` file is in the project root (same folder as `package.json`)
- Restart the development server
- Check that variable names start with `REACT_APP_`

### Issue 2: Template Parameters Mismatch
**Symptoms:** 400 error with template-related messages

**Solution:**
- Make sure your EmailJS template uses these exact variables:
  - `{{user_email}}`
  - `{{signup_date}}`
  - `{{user_agent}}`
  - `{{email}}` (for reply-to)
  - `{{name}}` (for from name)

### Issue 3: Service Not Configured
**Symptoms:** 400 error mentioning service

**Solution:**
- Verify your email service is properly connected
- Check that the service is active in EmailJS dashboard
- Make sure you've verified your email address

### Issue 4: Rate Limiting
**Symptoms:** 400 error after multiple attempts

**Solution:**
- Free tier has 200 emails/month limit
- Wait a few minutes between tests
- Check your usage in EmailJS dashboard

## Testing Your Setup

### Step 1: Verify Configuration
Check browser console for this log:
```javascript
EmailJS Config: {
  serviceId: "service_abc123",
  templateId: "template_xyz789", 
  publicKey: "user_def456...",
  hasServiceId: true,
  hasTemplateId: true,
  hasPublicKey: true
}
```

### Step 2: Test Email Sending
1. Submit a test email through the form
2. Check your email inbox
3. Check EmailJS dashboard → Email History

### Step 3: Check for Errors
Look for specific error messages in console that might indicate:
- Invalid service ID
- Invalid template ID
- Template parameter issues
- Rate limiting

## Alternative: Test Mode

If you want to test without real emails, temporarily modify the form:

```javascript
// Replace the emailjs.send call with:
console.log('Test mode - would send email to:', email);
setIsSubmitted(true);
setEmail('');
```

## Still Having Issues?

1. **Check EmailJS Dashboard** for any error messages
2. **Verify your email service** is working
3. **Test the template** directly in EmailJS dashboard
4. **Check your email quota** hasn't been exceeded
5. **Try a different email service** (Gmail, Outlook, etc.)

## Contact Support

If none of these solutions work:
1. Check EmailJS documentation: https://www.emailjs.com/docs/
2. Contact EmailJS support through their dashboard
3. Check their status page for any service issues 