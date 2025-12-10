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
        }
        
        // Add custom navbar title
        if (settings.custom_navbar_title && settings.navbar_title_style) {
            const titleStyle = settings.navbar_title_style.replace('\n', '');
            $(`<span style="${titleStyle}" class="hidden-xs hidden-sm">${settings.custom_navbar_title}</span>`)
                .insertAfter("#navbar-breadcrumbs");
        }
        
        console.log("Renegade Core branding applied");
    }
};

$(window).on('load', function() {
    renegade_core.init();
});