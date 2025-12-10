# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from . import __version__ as app_version
from . import __logo__ as app_logo

app_name = "renegade_erp_core"
app_title = "Renegade ERP Core"
app_publisher = "Renegade Code"
app_description = "Comprehensive ERPNext Extension with Core Business Functionality"
app_icon = "octicon octicon-package"
app_color = "#2d5aa0"
app_email = "support@renegadecode.co.za"
app_license = "MIT"
app_logo_url = '/assets/renegade_erp_core/images/renegade_logo_default.svg'

# Includes in <head>
# ------------------

# include js, css files in header of desk.html
app_include_css = "/assets/renegade_erp_core/css/renegade_app.css"
app_include_js = "/assets/renegade_erp_core/js/renegade_core.js"

# include js, css files in header of web template
web_include_css = "/assets/renegade_erp_core/css/renegade_web.css"
# web_include_js = "/assets/renegade_erp_core/js/renegade_web.js"

# Website context
website_context = {
	"favicon": "/assets/renegade_erp_core/images/renegade_logo_rounded.svg",
	"splash_image": app_logo or "/assets/renegade_erp_core/images/renegade_erp_full_logo.svg"
}

# Boot session for dynamic configurations
boot_session = "renegade_erp_core.api.boot_session"

# Post-migration patches
after_migrate = ['renegade_erp_core.api.renegade_core_patch']

# Document Events
# ---------------
# Hook on document methods and events

# doc_events = {
# 	"*": {
# 		"on_update": "method",
# 		"on_cancel": "method",
# 		"on_trash": "method"
#	}
# }

# Scheduled Tasks
# ---------------

# scheduler_events = {
# 	"all": [
# 		"renegade_erp_core.tasks.all"
# 	],
# 	"daily": [
# 		"renegade_erp_core.tasks.daily"
# 	],
# 	"hourly": [
# 		"renegade_erp_core.tasks.hourly"
# 	],
# 	"weekly": [
# 		"renegade_erp_core.tasks.weekly"
# 	],
# 	"monthly": [
# 		"renegade_erp_core.tasks.monthly"
# 	]
# }

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
# 	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
# 	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# Fixtures for automated setup
fixtures = [
    {"dt": "Custom Field", "filters": [["module", "=", "Renegade ERP Core"]]},
]

# Overriding Methods
# ------------------------------
override_whitelisted_methods = {
	"frappe.utils.change_log.show_update_popup": "renegade_erp_core.api.ignore_update_popup"
}

# override_doctype_dashboards = {
# 	"Task": "renegade_erp_core.task.get_dashboard_data"
# }