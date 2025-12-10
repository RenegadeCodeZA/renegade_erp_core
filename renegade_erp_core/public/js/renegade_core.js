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
            const loginTitles = document.querySelectorAll('.login-content h4, .page-card-header h4, .login-page .page-title, .login-page h1, .login-page h4');
            loginTitles.forEach(function(title) {
                if (title.textContent.includes('Frappe') || title.textContent.includes('Login')) {
                    title.textContent = 'Login to Renegade';
                    title.style.color = '#2596be';
                    title.style.fontWeight = '600';
                }
            });
            
            console.log("Login page customized");
        }, 100);
    }
};

$(window).on('load', function() {
    renegade_core.init();
    renegade_core.customize_login_page();
});

// Also run on DOM ready for faster execution
$(document).ready(function() {
    renegade_core.customize_login_page();
});