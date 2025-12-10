// Copyright (c) 2024, Renegade Code and contributors
// For license information, please see license.txt

frappe.ui.form.on('Renegade Core Settings', {
	refresh: function(frm) {
		frm.set_intro(__('Configure your ERP system branding, UI customization, and system behavior settings.'));
	},
	
	application_logo: function(frm) {
		if (frm.doc.application_logo) {
			frm.set_df_property('application_logo', 'description', 
				'Upload logo as public file for navbar and login page<br>' +
				`<img src="${frm.doc.application_logo}" style="max-height: 50px; max-width: 200px; margin-top: 5px;">`
			);
		}
	}
});