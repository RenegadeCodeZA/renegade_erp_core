// Renegade ERP Core Web JavaScript - for login page

// Simple immediate execution for login page
(function() {
    function customizeLoginPage() {
        console.log("Customizing login page");
        
        // Force text change
        const h4Elements = document.querySelectorAll('h4');
        h4Elements.forEach(function(h4) {
            if (h4.textContent.includes('Frappe')) {
                h4.textContent = 'Login to Renegade';
                h4.style.color = '#b12025';
                h4.style.fontWeight = '600';
                h4.style.fontSize = '24px';
                console.log("Changed h4 text");
            }
        });
        
        // Handle different logo contexts separately
        
        // Login page logos - use bordered logo, original size
        const loginLogos = document.querySelectorAll('.login-page img.app-logo, .login-content img.app-logo, .login-page .app-logo img, .login-content .app-logo img');
        loginLogos.forEach(function(logo) {
            logo.src = '/assets/renegade_erp_core/images/renegade_logo_border.svg';
            logo.style.width = '160px';
            logo.style.height = '160px';
            logo.style.transform = 'none';
            console.log("Set login page logo to bordered, original size");
        });
        
        // Loading screen logos - use bordered logo, larger size
        const loadingLogos = document.querySelectorAll('.splash-image img, .loading-image img, .frappe-loader img, [data-splash-image] img, .loading-screen img, .splash-screen img, .frappe-loading img');
        loadingLogos.forEach(function(logo) {
            if (logo.src.includes('renegade_logo')) {
                logo.src = '/assets/renegade_erp_core/images/renegade_logo_border.svg';
                logo.style.width = '280px';
                logo.style.height = '280px';
                console.log("Set loading screen logo to bordered, large size");
            }
        });
        
        // DO NOT TOUCH navbar logos - they should use rounded version and normal size
        
        // Hide social logins section completely
        const socialLogins = document.querySelectorAll('.social-logins, div.social-logins, .social-logins.text-center');
        socialLogins.forEach(function(element) {
            element.style.display = 'none';
            console.log("Hidden social logins section");
        });
    }
    
    // Run immediately
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', customizeLoginPage);
    } else {
        customizeLoginPage();
    }
    
    // Also run after page load
    window.addEventListener('load', customizeLoginPage);
    
    // Keep trying for dynamic content
    let attempts = 0;
    const interval = setInterval(function() {
        attempts++;
        customizeLoginPage();
        
        if (attempts > 10) { // Stop after 5 seconds
            clearInterval(interval);
        }
    }, 500);
    
})();