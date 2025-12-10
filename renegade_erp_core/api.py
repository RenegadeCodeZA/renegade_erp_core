# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import frappe
import json
from frappe.utils import floor, flt, today, cint
from frappe import _

def renegade_core_patch():
	"""Delete ERPNext welcome page and update branding"""
	# Delete ERPNext welcome page
	frappe.delete_doc_if_exists('Page', 'welcome-to-erpnext', force=1)
	
	# Update Welcome Blog Post
	if frappe.db.exists("Blog Post", "Welcome"):
		frappe.db.set_value("Blog Post", "Welcome", "content", "")
	
	update_field_labels()
	set_default_branding()
	
	if cint(get_frappe_version()) >= 13 and not frappe.db.get_single_value('Renegade Core Settings', 'disable_onboarding'):
		update_onboard_details()

def set_default_branding():
	"""Set default rounded logo and background image automatically"""
	from frappe.installer import update_site_config
	
	# Set rounded logo as default
	rounded_logo = "/assets/renegade_erp_core/images/renegade_logo_rounded.svg"
	background_image = "/assets/renegade_erp_core/images/renegade_background.svg"
	
	# Update Website Settings
	website_settings = frappe.get_doc("Website Settings", "Website Settings")
	website_settings.app_logo = rounded_logo
	website_settings.splash_image = rounded_logo  
	website_settings.favicon = rounded_logo
	website_settings.save(ignore_permissions=True)
	
	# Update Navbar Settings
	navbar_settings = frappe.get_doc("Navbar Settings", "Navbar Settings")
	navbar_settings.app_logo = rounded_logo
	navbar_settings.save(ignore_permissions=True)
	
	# Update site config
	update_site_config("app_logo_url", rounded_logo)
	update_site_config("background_image_url", background_image)
	
	# Clear cache to apply changes
	frappe.clear_cache()
	from frappe.website.utils import clear_cache
	clear_cache()

def update_field_labels():
	"""Update label of section break in employee doctype"""
	frappe.db.sql("""Update `tabDocField` set label='ERP' where fieldname='erpnext_user' and parent='Employee'""")

def get_frappe_version():
	"""Get the major version of Frappe"""
	return frappe.db.get_value("Installed Application", {"app_name": "frappe"}, "app_version").split('.')[0]

def update_onboard_details():
	"""Update onboarding module details"""
	update_onboard_module()
	update_onboarding_steps()

def update_onboard_module():
	"""Clear documentation URLs from onboarding modules"""
	onboard_modules = frappe.get_all("Module Onboarding", filters={}, fields=["name"])
	for row in onboard_modules:
		doc = frappe.get_doc("Module Onboarding", row.name)
		doc.documentation_url = ""
		doc.flags.ignore_mandatory = True
		doc.save(ignore_permissions=True)

def update_onboarding_steps():
	"""Clear video URLs and descriptions from onboarding steps"""
	onboard_steps = frappe.get_all("Onboarding Step", filters={}, fields=["name"])
	for row in onboard_steps:
		doc = frappe.get_doc("Onboarding Step", row.name)
		doc.intro_video_url = ""
		doc.description = ""
		doc.flags.ignore_mandatory = True
		doc.save(ignore_permissions=True)

def boot_session(bootinfo):
	"""Boot session - send core settings if user is logged in"""
	if frappe.session['user'] != 'Guest':
		try:
			bootinfo.renegade_core_settings = frappe.get_doc("Renegade Core Settings", "Renegade Core Settings")
		except frappe.DoesNotExistError:
			# Create default settings if they don't exist
			bootinfo.renegade_core_settings = frappe._dict({
				'show_help_menu': 1,
				'application_name': 'ERPNext'
			})

@frappe.whitelist()
def ignore_update_popup():
	"""Check if update popup should be ignored"""
	if not frappe.db.get_single_value('Renegade Core Settings', 'disable_system_notifications'):
		show_update_popup_update()

@frappe.whitelist() 
def show_update_popup_update():
	"""Show update popup if not disabled"""
	cache = frappe.cache()
	user = frappe.session.user
	update_info = cache.get_value("update-info")
	if not update_info:
		return

	updates = json.loads(update_info)

	# Check if user is in the set of users to send update message to
	update_message = ""
	if cache.sismember("update-user-set", user):
		for update_type in updates:
			release_links = ""
			for app in updates[update_type]:
				app = frappe._dict(app)
				release_links += "<b>{title}</b>: <a href='https://github.com/{org_name}/{app_name}/releases/tag/v{available_version}'>v{available_version}</a><br>".format(
					available_version=app.available_version,
					org_name=app.org_name,
					app_name=app.app_name,
					title=app.title
				)
			if release_links:
				message = _("New {} releases for the following apps are available").format(_(update_type))
				update_message += "<div class='new-version-log'>{0}<div class='new-version-links'>{1}</div></div>".format(message, release_links)

	if update_message:
		frappe.msgprint(update_message, title=_("New updates are available"), indicator='green')
		cache.srem("update-user-set", user)