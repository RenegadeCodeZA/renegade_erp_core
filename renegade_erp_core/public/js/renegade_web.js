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
        
        // Force logo scaling - 15% bigger with border
        const logos = document.querySelectorAll('img.app-logo, .app-logo img, img[src*="renegade_logo"]');
        logos.forEach(function(logo) {
            logo.style.transform = 'scale(1.15)';
            logo.style.transformOrigin = 'center';
            logo.style.width = '230px';
            logo.style.height = 'auto';
            logo.style.border = '2px solid #e8d7ba';
            logo.style.borderRadius = '50%';
            logo.style.boxShadow = '0 0 8px rgba(232, 215, 186, 0.4)';
            logo.style.padding = '8px';
            console.log("Scaled logo with border");
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