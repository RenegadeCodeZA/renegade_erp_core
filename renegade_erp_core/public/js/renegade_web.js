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
        
        // Replace logo with bordered version and scale for login page
        const logos = document.querySelectorAll('img.app-logo, .app-logo img, img[src*="renegade_logo"]');
        logos.forEach(function(logo) {
            // Only replace on login page - use bordered SVG that includes the border
            logo.src = '/assets/renegade_erp_core/images/renegade_logo_border.svg';
            // Scale 1.75x bigger
            logo.style.transform = 'scale(1.75)';
            logo.style.transformOrigin = 'center';
            console.log("Replaced with bordered logo and scaled 1.75x for login page");
        });
        
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