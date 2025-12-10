// Renegade ERP Core JavaScript

frappe.provide("renegade_core");

renegade_core = {
    version: "1.0.0",
    
    init: function() {
        console.log("Renegade ERP Core initialized");
        this.setup_custom_ui();
    },
    
    setup_custom_ui: function() {
        // Apply custom branding after frappe is loaded
        frappe.after_ajax(() => {
            this.apply_branding_settings();
        });
    },
    
    apply_branding_settings: function() {
        if (!frappe.boot.renegade_core_settings) return;
        
        const settings = frappe.boot.renegade_core_settings;
        
        // Show/hide help menu
        if (settings.show_help_menu) {
            $('.dropdown-help').attr('style', 'display: block !important');
        } else {
            $('.dropdown-help').css('display', 'none');
        }
        
        // Apply logo dimensions
        if (settings.logo_width) {
            $('.app-logo').css('width', settings.logo_width + 'px');
        }
        if (settings.logo_height) {
            $('.app-logo').css('height', settings.logo_height + 'px');
        }
        
        // Apply navbar background color
        if (settings.navbar_background_color) {
            $('.navbar').css('background-color', settings.navbar_background_color);
        } else {
            // Default semi-transparent navbar to show background
            $('.navbar').css('background', 'rgba(255, 255, 255, 0.95)');
        }
        
        // Apply background image dynamically if set
        if (settings.background_image) {
            this.apply_background_image(settings.background_image);
        }
        
        // Add custom navbar title
        if (settings.custom_navbar_title && settings.navbar_title_style) {
            const titleStyle = settings.navbar_title_style.replace('\n', '');
            $(`<span style="${titleStyle}" class="hidden-xs hidden-sm">${settings.custom_navbar_title}</span>`)
                .insertAfter("#navbar-breadcrumbs");
        }
        
        console.log("Renegade Core branding applied");
    },
    
    apply_background_image: function(background_url) {
        // Apply background to body and all loading elements
        const backgroundStyle = `url('${background_url}') center center`;
        
        $('body').css({
            'background': backgroundStyle,
            'background-size': 'cover',
            'background-repeat': 'no-repeat',
            'background-attachment': 'fixed'
        });
        
        // Apply to loading overlays
        $('.loading-overlay, .frappe-loading, .page-loading, .loading-screen, .splash-container').css({
            'background': backgroundStyle + ' !important',
            'background-size': 'cover !important',
            'background-repeat': 'no-repeat !important',
            'background-attachment': 'fixed !important'
        });
        
        // Ensure content areas are transparent
        $('.main-section, .page-wrapper, .container').css('background', 'transparent');
        
        console.log("Background image applied:", background_url);
    },
    
    customize_login_page: function() {
        // Change login title text
        setTimeout(function() {
            // Target the specific h4 element you found
            const loginTitles = document.querySelectorAll('h4, .login-content h4, .page-card-header h4, .login-page .page-title, .login-page h1, .login-page h4');
            loginTitles.forEach(function(title) {
                if (title.textContent.includes('Frappe') || title.textContent.includes('Login to Frappe')) {
                    title.textContent = 'Login to Renegade';
                    title.style.color = '#2596be';
                    title.style.fontWeight = '600';
                }
            });
            
            // Also hide the navbar
            const navbars = document.querySelectorAll('nav.navbar.navbar-light.navbar-expand-lg');
            navbars.forEach(function(navbar) {
                navbar.style.display = 'none';
            });
            
            console.log("Login page customized");
        }, 100);
    }
};

$(window).on('load', function() {
    renegade_core.init();
    renegade_core.customize_login_page();
});

// True visual freeze functionality
renegade_core.create_visual_freeze = function() {
    // Remove any existing freeze overlay
    const existingOverlay = document.querySelector('.visual-freeze-overlay');
    if (existingOverlay) {
        existingOverlay.remove();
    }
    
    // Capture current screen state by cloning the current body content
    const bodyClone = document.body.cloneNode(true);
    
    // Create freeze overlay
    const freezeOverlay = document.createElement('div');
    freezeOverlay.className = 'visual-freeze-overlay';
    
    // Set the background to match what's currently showing
    const currentBackground = window.getComputedStyle(document.body).background;
    freezeOverlay.style.background = currentBackground;
    
    // Add the cloned content to the freeze overlay
    freezeOverlay.appendChild(bodyClone);
    
    // Make the cloned content non-interactive
    freezeOverlay.style.pointerEvents = 'none';
    
    // Inject freeze overlay on top of everything
    document.body.appendChild(freezeOverlay);
    
    console.log("Visual freeze overlay created - screen frozen for 3 seconds");
};

// Monitor for SECOND/problematic loading screens only
renegade_core.monitor_loading_screens = function() {
    let firstLoadingScreenSeen = false;
    
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        // Check if a loading screen was added
                        const isLoadingScreen = node.classList && (
                            node.classList.contains('loading-overlay') ||
                            node.classList.contains('frappe-loading') ||
                            node.classList.contains('page-loading') ||
                            node.classList.contains('loading-screen') ||
                            node.classList.contains('splash-container') ||
                            node.classList.contains('centered') ||
                            node.querySelector('.loading-overlay, .frappe-loading, .page-loading, .loading-screen, .splash-container, .centered.splash')
                        );
                        
                        if (isLoadingScreen) {
                            if (!firstLoadingScreenSeen) {
                                // This is the first loading screen - let it work normally
                                console.log("First loading screen detected - letting it work normally");
                                firstLoadingScreenSeen = true;
                            } else {
                                // This is a subsequent loading screen - freeze the current visual!
                                console.log("Second/problematic loading screen detected - freezing current visual");
                                renegade_core.create_visual_freeze();
                            }
                        }
                    }
                });
            }
        });
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    
    // Check if any loading screen already exists when we start monitoring
    if (document.querySelector('.loading-overlay, .frappe-loading, .page-loading, .loading-screen, .splash-container, .centered.splash')) {
        console.log("Loading screen already exists - marking as first screen");
        firstLoadingScreenSeen = true;
    }
};

// Run immediately and repeatedly to catch dynamic content
$(document).ready(function() {
    renegade_core.customize_login_page();
    renegade_core.monitor_loading_screens();
    
    // Keep trying every 500ms for 10 seconds
    let attempts = 0;
    const interval = setInterval(function() {
        attempts++;
        
        // Force text change
        const h4Elements = document.querySelectorAll('h4');
        h4Elements.forEach(function(h4) {
            if (h4.textContent.includes('Frappe')) {
                h4.textContent = 'Login to Renegade';
                h4.style.color = '#2596be';
                h4.style.fontWeight = '600';
                h4.style.fontSize = '24px';
            }
        });
        
        // Force logo scaling
        const logos = document.querySelectorAll('img.app-logo, .app-logo img, img[src*="renegade_logo"]');
        logos.forEach(function(logo) {
            logo.style.transform = 'scale(1.3)';
            logo.style.transformOrigin = 'center';
            logo.style.width = '260px';
            logo.style.height = 'auto';
        });
        
        if (attempts > 20) { // Stop after 10 seconds
            clearInterval(interval);
        }
    }, 500);
});