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
                h4.style.color = '#2596be';
                h4.style.fontWeight = '600';
                h4.style.fontSize = '24px';
                console.log("Changed h4 text");
            }
        });
        
        // Force logo scaling
        const logos = document.querySelectorAll('img.app-logo, .app-logo img, img[src*="renegade_logo"]');
        logos.forEach(function(logo) {
            logo.style.transform = 'scale(1.3)';
            logo.style.transformOrigin = 'center';
            logo.style.width = '260px';
            logo.style.height = 'auto';
            console.log("Scaled logo");
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