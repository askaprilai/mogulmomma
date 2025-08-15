# EmailJS Setup Guide for MogulMomma Platform

## Step 1: Create EmailJS Account

1. Go to [https://emailjs.com](https://emailjs.com)
2. Click "Sign Up" and create a free account
3. Verify your email address

## Step 2: Create Email Service

1. In EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider:
   - **Gmail** (recommended for testing)
   - **Outlook/Hotmail**
   - **Yahoo**
   - **Custom SMTP** (for business emails)
4. Follow the setup wizard to connect your email
5. **Save your Service ID** (you'll need this)

## Step 3: Create Email Templates

Create these 4 templates in EmailJS:

### Template 1: Connection Request
- **Template Name**: `mogulmomma_connection_request`
- **Subject**: `New Connection Request from {{from_name}} - MogulMomma Community`
- **Content**:
```
Hi {{to_name}},

You have a new connection request from {{from_name}} in the MogulMomma community!

**Message from {{from_name}}:**
{{message}}

**About {{from_name}}:**
{{from_title}}

You can respond to this message by replying to this email or logging into your MogulMomma account.

Best regards,
The MogulMomma Team

---
This message was sent through the MogulMomma platform. 
If you no longer wish to receive connection notifications, please update your preferences in your account settings.
```

### Template 2: Obstacle Support
- **Template Name**: `mogulmomma_obstacle_support`
- **Subject**: `Your Obstacle Breakthrough Action Plan - MogulMomma`
- **Content**:
```
Hi {{user_name}},

Great job taking the step to identify and tackle your obstacles! Here's your personalized action plan:

**Your Identified Obstacles:**
{{obstacles}}

**Your Action Plan:**
{{action_plan}}

**This Week's Challenge:**
{{weekly_challenge}}

**Resources for You:**
{{resources}}

Remember: Every small step counts. You've got this! 💪

Need support? Reply to this email or connect with other members in the community.

Cheering you on,
The MogulMomma Team

---
Login to your account: https://mogulmomma.com/community
```

### Template 3: Weekly Check-in
- **Template Name**: `mogulmomma_weekly_checkin`
- **Subject**: `How's Your Progress This Week? - MogulMomma Check-in`
- **Content**:
```
Hi {{user_name}},

It's been a week since you created your obstacle breakthrough plan. How are you doing?

**Your Commitment Last Week:**
{{commitment}}

**Quick Check-in Questions:**
- Did you complete your committed action?
- What went well this week?
- What challenged you?
- What support do you need?

**This Week's Next Step:**
{{next_step}}

Reply to this email to share your progress - we love celebrating wins and supporting through challenges!

You're doing amazing work!
The MogulMomma Team

---
Community support: https://mogulmomma.com/community
```

### Template 4: General Notification
- **Template Name**: `mogulmomma_notification`
- **Subject**: `{{subject}} - MogulMomma`
- **Content**:
```
Hi {{to_name}},

{{message}}

{{additional_content}}

Best regards,
The MogulMomma Team

---
{{footer_note}}
Login to your account: https://mogulmomma.com/community
```

## Step 4: Get Your Credentials

After creating templates, gather these from your EmailJS dashboard:

1. **Public Key**: Dashboard → Account → General → Public Key
2. **Service ID**: Email Services → Your Service → Service ID  
3. **Template IDs**: Templates → Each template → Template ID

## Step 5: Update Platform Configuration

Replace the placeholder values in the email configuration files:

### Email Test Page
- Update `YOUR_EMAILJS_PUBLIC_KEY`
- Update `YOUR_SERVICE_ID` 
- Update `YOUR_TEMPLATE_ID`

### Community Page Email Features
- Connection requests
- Obstacle support emails
- Follow-up reminders

## Step 6: Test Email Functionality

1. Visit: https://mogulmomma.com/email-test
2. Enter your email address
3. Send a test email
4. Check your inbox (and spam folder)
5. Test connection requests in community
6. Test obstacle breakthrough emails

## EmailJS Free Plan Limits

- **200 emails/month** (free)
- **Upgrade to $20/month** for 2,000 emails
- **$50/month** for 10,000 emails

## Troubleshooting

### Common Issues:
1. **Emails going to spam**: Add no-reply@emailjs.com to contacts
2. **Gmail not working**: Enable 2FA and use App Password
3. **Template not found**: Check Template ID is correct
4. **Service error**: Verify Service ID and email connection

### Testing Tips:
- Always test with your own email first
- Check EmailJS dashboard for delivery logs
- Monitor the browser console for errors
- Verify all template variables are being passed correctly

## Production Recommendations

1. **Use a business email** (not Gmail) for sending
2. **Set up proper SPF/DKIM** records for deliverability
3. **Monitor email metrics** in EmailJS dashboard
4. **Consider upgrading** to paid plan for higher limits
5. **Add unsubscribe handling** for compliance

---

Need help? The EmailJS documentation is excellent: https://emailjs.com/docs/