# Email Notification Setup Guide

## How to Get Notified When Users Submit Early Access Emails

### Option 1: EmailJS (Recommended - No Backend Required)

#### Step 1: Sign up for EmailJS
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Create a free account
3. Verify your email

#### Step 2: Set up Email Service
1. In EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions
5. Copy your **Service ID**

#### Step 3: Create Email Template
1. Go to "Email Templates"
2. Click "Create New Template"
3. Use this template:

```html
Subject: New Early Access Signup - Refactron

New early access signup received!

Email: {{user_email}}
Date: {{signup_date}}
User Agent: {{user_agent}}

This user has joined the Refactron early access program.
```

4. Copy your **Template ID**

#### Step 4: Get Public Key
1. Go to "Account" → "API Keys"
2. Copy your **Public Key**

#### Step 5: Configure Environment Variables
1. Create a `.env` file in your project root
2. Add these variables:

```env
REACT_APP_EMAILJS_SERVICE_ID=your_service_id_here
REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id_here
REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key_here
REACT_APP_NOTIFICATION_EMAIL=hello@refactron.ai
```

3. Replace the placeholder values with your actual EmailJS credentials

#### Step 6: Test the Setup
1. Start your development server: `npm start`
2. Submit a test email through the form
3. Check your email for the notification

### Option 2: Backend API (Advanced)

If you prefer a custom backend solution:

#### Step 1: Create a simple backend API
```javascript
// Example with Express.js
app.post('/api/early-access', async (req, res) => {
  const { email } = req.body;
  
  // Send email notification
  await sendEmail({
    to: 'hello@refactron.ai',
    subject: 'New Early Access Signup',
    text: `New signup: ${email}`
  });
  
  // Store in database
  await saveToDatabase(email);
  
  res.json({ success: true });
});
```

#### Step 2: Update the form to call your API
```javascript
const response = await fetch('/api/early-access', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email })
});
```

### Option 3: Google Forms (Simple Alternative)

1. Create a Google Form
2. Set up email notifications in Google Forms
3. Use the form URL in an iframe or redirect

### Option 4: Zapier Integration

1. Connect your form to Zapier
2. Set up email notifications through Zapier
3. Can also integrate with CRM systems

## Current Implementation

The form is now configured to:
- ✅ Send real emails via EmailJS
- ✅ Log submissions to console for development
- ✅ Handle errors gracefully
- ✅ Show loading states
- ✅ Provide user feedback

## Testing

To test the email functionality:
1. Set up EmailJS credentials
2. Submit a test email
3. Check your email inbox
4. Verify console logs

## Security Notes

- EmailJS public key is safe to expose in frontend
- Service and template IDs are also public
- For additional security, consider rate limiting
- Always validate emails on both frontend and backend

## Troubleshooting

### Common Issues:
1. **Emails not sending**: Check EmailJS credentials
2. **Template errors**: Verify template variables match
3. **CORS issues**: EmailJS handles this automatically
4. **Rate limiting**: Free tier has limits

### Debug Steps:
1. Check browser console for errors
2. Verify environment variables are loaded
3. Test EmailJS dashboard directly
4. Check spam folder for notifications 