# -*- coding: utf-8 -*-
# Copyright (c) 2024, Renegade Code and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document
from frappe.installer import update_site_config

class RenegadeCoreSettings(Document):
	def validate(self):
		system_settings_doc = frappe.get_doc("System Settings", "System Settings")
		navbar_settings_doc = frappe.get_doc("Navbar Settings", "Navbar Settings") 
		website_doc = frappe.get_doc("Website Settings", "Website Settings")
		
		self.set_app_name(system_settings_doc)
		self.set_theme_attr(navbar_settings_doc, website_doc)
		self.disable_onboarding_settings(system_settings_doc)
		self.set_notification_settings(system_settings_doc)
		self.set_email_footer(system_settings_doc)
		
		system_settings_doc.save(ignore_permissions=True)
		navbar_settings_doc.save(ignore_permissions=True)
		website_doc.save(ignore_permissions=True)

	def set_app_name(self, system_settings_doc):
		if self.application_name:
			system_settings_doc.app_name = self.application_name
		else:
			if "erpnext" in frappe.get_installed_apps():
				system_settings_doc.app_name = "ERPNext"
			else:
				system_settings_doc.app_name = "Frappe"

	def set_theme_attr(self, navbar_settings_doc, website_doc):
		if self.application_logo:
			navbar_settings_doc.app_logo = self.application_logo
			website_doc.app_logo = self.application_logo
			website_doc.splash_image = self.application_logo
			update_site_config("app_logo_url", self.application_logo)
			frappe.clear_cache()
		else:
			navbar_settings_doc.app_logo = ""
			website_doc.app_logo = ""
			website_doc.splash_image = ""
			update_site_config("app_logo_url", False)
			frappe.clear_cache()

	def disable_onboarding_settings(self, system_settings_doc):
		if self.disable_onboarding == 1:
			system_settings_doc.enable_onboarding = 0
		else:
			system_settings_doc.enable_onboarding = 1

	def set_notification_settings(self, system_settings_doc):
		system_settings_doc.disable_system_update_notification = self.disable_system_notifications
		system_settings_doc.disable_change_log_notification = self.disable_change_log_notifications

	def set_email_footer(self, system_settings_doc):
		if self.email_footer_address:
			system_settings_doc.email_footer_address = self.email_footer_address
		system_settings_doc.disable_standard_email_footer = self.disable_standard_email_footer
		system_settings_doc.hide_footer_in_auto_email_reports = self.disable_standard_email_footer