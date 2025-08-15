// EmailJS Configuration for MogulMomma Platform
// Replace these with your actual EmailJS credentials

const EMAILJS_CONFIG = {
    // Get these from your EmailJS dashboard
    PUBLIC_KEY: 'SAU17WFhPmeQLrng7',
    SERVICE_ID: 'service_vntq4ai',
    
    // Template IDs for different email types
    TEMPLATES: {
        CONNECTION_REQUEST: 'mogulmomma_connection_request',
        OBSTACLE_SUPPORT: 'template_tcyaiym', 
        WEEKLY_CHECKIN: 'mogulmomma_weekly_checkin',
        GENERAL_NOTIFICATION: 'mogulmomma_notification',
        TEST_EMAIL: 'template_tcyaiym'
    }
};

// Initialize EmailJS when this script loads
(function() {
    if (typeof emailjs !== 'undefined') {
        emailjs.init({
            publicKey: EMAILJS_CONFIG.PUBLIC_KEY,
        });
        console.log('EmailJS initialized with public key');
    } else {
        console.warn('EmailJS library not loaded yet');
    }
})();

// Email sending functions
const MogulMommaEmail = {
    
    // Send connection request email
    sendConnectionRequest: function(params) {
        const templateParams = {
            to_email: params.to_email,
            to_name: params.to_name,
            from_name: params.from_name,
            from_title: params.from_title,
            message: params.message,
            reply_to: params.reply_to || 'community@mogulmomma.com'
        };
        
        return emailjs.send(
            EMAILJS_CONFIG.SERVICE_ID, 
            EMAILJS_CONFIG.TEMPLATES.CONNECTION_REQUEST, 
            templateParams
        );
    },
    
    // Send obstacle support email
    sendObstacleSupport: function(params) {
        const templateParams = {
            to_email: params.to_email,
            user_name: params.user_name,
            obstacles: params.obstacles,
            action_plan: params.action_plan,
            weekly_challenge: params.weekly_challenge,
            resources: params.resources,
            reply_to: 'support@mogulmomma.com'
        };
        
        return emailjs.send(
            EMAILJS_CONFIG.SERVICE_ID, 
            EMAILJS_CONFIG.TEMPLATES.OBSTACLE_SUPPORT, 
            templateParams
        );
    },
    
    // Send weekly check-in email
    sendWeeklyCheckin: function(params) {
        const templateParams = {
            to_email: params.to_email,
            user_name: params.user_name,
            commitment: params.commitment,
            next_step: params.next_step,
            reply_to: 'support@mogulmomma.com'
        };
        
        return emailjs.send(
            EMAILJS_CONFIG.SERVICE_ID, 
            EMAILJS_CONFIG.TEMPLATES.WEEKLY_CHECKIN, 
            templateParams
        );
    },
    
    // Send general notification
    sendNotification: function(params) {
        const templateParams = {
            to_email: params.to_email,
            to_name: params.to_name,
            subject: params.subject,
            message: params.message,
            additional_content: params.additional_content || '',
            footer_note: params.footer_note || '',
            reply_to: params.reply_to || 'hello@mogulmomma.com'
        };
        
        return emailjs.send(
            EMAILJS_CONFIG.SERVICE_ID, 
            EMAILJS_CONFIG.TEMPLATES.GENERAL_NOTIFICATION, 
            templateParams
        );
    },
    
    // Send test email
    sendTestEmail: function(params) {
        const templateParams = {
            to_email: params.to_email,
            subject: params.subject,
            message: params.message,
            from_name: params.from_name || 'MogulMomma Platform',
            reply_to: params.reply_to || 'hello@mogulmomma.com'
        };
        
        return emailjs.send(
            EMAILJS_CONFIG.SERVICE_ID, 
            EMAILJS_CONFIG.TEMPLATES.TEST_EMAIL, 
            templateParams
        );
    },
    
    // Check if EmailJS is properly configured
    isConfigured: function() {
        return EMAILJS_CONFIG.PUBLIC_KEY !== 'YOUR_EMAILJS_PUBLIC_KEY' && 
               EMAILJS_CONFIG.SERVICE_ID !== 'YOUR_SERVICE_ID';
    },
    
    // Get configuration status
    getConfigStatus: function() {
        if (!this.isConfigured()) {
            return {
                configured: false,
                message: 'EmailJS not configured. Please update EMAILJS_CONFIG with your credentials.'
            };
        }
        
        if (typeof emailjs === 'undefined') {
            return {
                configured: false,
                message: 'EmailJS library not loaded. Please include the EmailJS script.'
            };
        }
        
        return {
            configured: true,
            message: 'EmailJS ready to send emails.'
        };
    }
};

// Export for use in other scripts
if (typeof window !== 'undefined') {
    window.MogulMommaEmail = MogulMommaEmail;
    window.EMAILJS_CONFIG = EMAILJS_CONFIG;
}