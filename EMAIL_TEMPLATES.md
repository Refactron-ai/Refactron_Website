# EmailJS Templates for Refactron

## Template 1: Welcome Email (Sent to User)
**Template ID:** `welcome_template`
**Subject:** 🚀 Welcome to Refactron! You're part of the future of code refactoring

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Refactron</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    
    <!-- Header -->
    <div style="text-align: center; margin-bottom: 30px;">
        <img src="https://refactron.us.kg/Refactron-logo-TM.png" alt="Refactron" style="height: 60px; margin-bottom: 20px;">
        <h1 style="color: #20B2AA; margin: 0;">Welcome to Refactron!</h1>
        <p style="color: #666; font-size: 18px; margin: 10px 0 0 0;">You're now part of the future of code refactoring</p>
    </div>

    <!-- Main Content -->
    <div style="background: #f8f9fa; padding: 30px; border-radius: 10px; margin-bottom: 30px;">
        <h2 style="color: #20B2AA; margin-top: 0;">Hi {{user_name}},</h2>
        
        <p>Welcome to the Refactron community! 🎉</p>
        
        <p>You've just joined an exclusive group of developers who will be the first to experience AI-powered code refactoring and optimization.</p>
        
        <h3 style="color: #20B2AA;">What happens next:</h3>
        <ul style="padding-left: 20px;">
            <li>✅ You're on our <strong>early access list</strong></li>
            <li>✅ We'll send you <strong>exclusive updates</strong> on our progress</li>
            <li>✅ You'll get <strong>priority beta access</strong> when we launch</li>
            <li>✅ Join our <strong>developer community</strong> on Discord</li>
        </ul>
    </div>

    <!-- Community Links -->
    <div style="text-align: center; margin-bottom: 30px;">
        <h3 style="color: #20B2AA;">Join Our Community</h3>
        <div style="margin: 20px 0;">
            <a href="https://github.com/refactron-ai" style="display: inline-block; background: #20B2AA; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 5px;">🔗 GitHub</a>
            <a href="https://discord.gg/refactron" style="display: inline-block; background: #7289da; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 5px;">💬 Discord</a>
            <a href="https://twitter.com/refactron" style="display: inline-block; background: #1da1f2; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 5px;">🐦 Twitter</a>
        </div>
    </div>

    <!-- Timeline -->
    <div style="background: #e8f5e8; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
        <h3 style="color: #20B2AA; margin-top: 0;">Timeline</h3>
        <p><strong>Q2 2024:</strong> Beta access for early adopters</p>
        <p><strong>Q3 2024:</strong> Public launch with full features</p>
        <p><strong>Ongoing:</strong> Regular updates and new features</p>
    </div>

    <!-- Footer -->
    <div style="text-align: center; border-top: 1px solid #eee; padding-top: 20px; color: #666; font-size: 14px;">
        <p>Questions? Reach out to us at <a href="mailto:hello@refactron.us.kg" style="color: #20B2AA;">hello@refactron.us.kg</a></p>
        <p>© 2024 Refactron. All rights reserved.</p>
        <p style="font-size: 12px; margin-top: 20px;">
            <a href="{{unsubscribe_url}}" style="color: #999;">Unsubscribe</a> | 
            <a href="https://refactron.us.kg/privacy-policy" style="color: #999;">Privacy Policy</a>
        </p>
    </div>
</body>
</html>
```

## Template 2: Notification Email (Sent to You)
**Template ID:** `notification_template`
**Subject:** 📧 New Early Access Signup - {{user_email}}

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Signup Notification</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    
    <h2 style="color: #20B2AA;">New Early Access Signup</h2>
    
    <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p><strong>Email:</strong> {{user_email}}</p>
        <p><strong>Name:</strong> {{user_name}}</p>
        <p><strong>Signup Date:</strong> {{signup_date}}</p>
        <p><strong>User Agent:</strong> {{user_agent}}</p>
        <p><strong>IP Address:</strong> {{user_ip}}</p>
    </div>
    
    <p>This user has joined the Refactron early access program.</p>
    
    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666;">
        <p>Refactron Early Access System</p>
        <p>Generated on {{timestamp}}</p>
    </div>
</body>
</html>
```

## Environment Variables Setup

Create a `.env` file in your project root:

```env
# EmailJS Configuration
REACT_APP_EMAILJS_SERVICE_ID=your_service_id_here
REACT_APP_EMAILJS_WELCOME_TEMPLATE_ID=welcome_template_id_here
REACT_APP_EMAILJS_NOTIFICATION_TEMPLATE_ID=notification_template_id_here
REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key_here

# Email Configuration
REACT_APP_FROM_EMAIL=hello@refactron.us.kg
REACT_APP_NOTIFICATION_EMAIL=hello@refactron.us.kg
```

## Template Variables

### Welcome Email Variables:
- `{{user_email}}` - User's email address
- `{{user_name}}` - User's name (if provided)
- `{{signup_date}}` - Date of signup
- `{{unsubscribe_url}}` - Unsubscribe link

### Notification Email Variables:
- `{{user_email}}` - User's email address
- `{{user_name}}` - User's name
- `{{signup_date}}` - Date of signup
- `{{user_agent}}` - Browser information
- `{{user_ip}}` - User's IP address
- `{{timestamp}}` - Current timestamp
