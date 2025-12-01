# Google reCAPTCHA v3 Setup Instructions

Google reCAPTCHA v3 has been integrated into the contact form to protect against spam and abuse.

## Setup Steps

### 1. Get Your reCAPTCHA Keys

1. Go to https://www.google.com/recaptcha/admin
2. Register a new site with the following settings:
   - **Label**: VISIBI Contact Form (or any name you prefer)
   - **reCAPTCHA type**: Select "reCAPTCHA v3"
   - **Domains**: Add your domains:
     - `govisibi.ai`
     - `www.govisibi.ai`
     - `localhost` (for local development)
3. Accept the reCAPTCHA Terms of Service
4. Click **Submit**
5. You'll receive two keys:
   - **Site Key** (public key - used in frontend)
   - **Secret Key** (private key - used in backend)

### 2. Configure Frontend

#### Local Development:
1. Open `frontend/.env`
2. Replace `YOUR_RECAPTCHA_SITE_KEY_HERE` with your actual **Site Key**

#### Production (Vercel):
1. Go to your Vercel project dashboard
2. Navigate to **Settings** > **Environment Variables**
3. Add a new environment variable:
   - **Name**: `VITE_RECAPTCHA_SITE_KEY`
   - **Value**: Your reCAPTCHA **Site Key**
   - **Environments**: Select all (Production, Preview, Development)
4. Click **Save**
5. Redeploy your site for changes to take effect

### 3. Configure Backend (API)

You'll need to verify the reCAPTCHA token on your backend when processing the contact form submission.

Update your `/api/send-email` endpoint to:

```python
import requests

def verify_recaptcha(token, secret_key):
    """Verify reCAPTCHA token with Google"""
    response = requests.post(
        'https://www.google.com/recaptcha/api/siteverify',
        data={
            'secret': secret_key,
            'response': token
        }
    )
    result = response.json()
    return result.get('success', False) and result.get('score', 0) >= 0.5

@app.post("/api/send-email")
async def send_email(request: ContactRequest):
    # Verify reCAPTCHA token
    recaptcha_secret = os.getenv('RECAPTCHA_SECRET_KEY')
    if not verify_recaptcha(request.recaptchaToken, recaptcha_secret):
        raise HTTPException(status_code=400, detail="reCAPTCHA verification failed")
    
    # Process email sending...
```

Add your **Secret Key** to your backend environment variables (Railway):
- **Name**: `RECAPTCHA_SECRET_KEY`
- **Value**: Your reCAPTCHA **Secret Key**

### 4. Understanding reCAPTCHA v3 Scores

- reCAPTCHA v3 returns a score from 0.0 to 1.0
- **1.0**: Very likely a good interaction
- **0.0**: Very likely a bot
- **Recommended threshold**: 0.5 (you can adjust based on your needs)

### 5. Monitor reCAPTCHA Performance

1. Go to https://www.google.com/recaptcha/admin
2. Click on your site
3. View analytics and adjust thresholds as needed

## How It Works

1. When a user submits the contact form, reCAPTCHA v3 runs in the background
2. A token is generated with the action name "submit"
3. The token is sent to your backend along with the form data
4. Your backend verifies the token with Google's API
5. If the score is above your threshold (0.5), the form is processed
6. If the score is too low, the submission is rejected

## Privacy Notice

The contact form includes a privacy notice informing users:
"This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply."

This notice is required by Google's reCAPTCHA Terms of Service.

## Testing

### Local Testing:
1. Make sure you've added `localhost` to your reCAPTCHA domains
2. Start your development server
3. Submit the contact form
4. Check browser console for any errors

### Production Testing:
1. Deploy your site with the environment variables configured
2. Submit the contact form on your live site
3. Verify the submission goes through successfully

## Troubleshooting

**Issue**: "reCAPTCHA not loaded" error
- **Solution**: Make sure the reCAPTCHA script is loading. Check browser console for errors.

**Issue**: Token verification fails
- **Solution**: 
  - Verify your domain is added to reCAPTCHA admin console
  - Check that both frontend and backend keys are correct
  - Ensure your backend is properly verifying the token

**Issue**: Score is too low
- **Solution**: 
  - Adjust the threshold in your backend code
  - Check reCAPTCHA admin console for patterns
  - Consider adding more context to help reCAPTCHA learn (more pages with reCAPTCHA)

## Additional Resources

- [reCAPTCHA v3 Documentation](https://developers.google.com/recaptcha/docs/v3)
- [reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
- [Best Practices Guide](https://developers.google.com/recaptcha/docs/v3#best_practices)
