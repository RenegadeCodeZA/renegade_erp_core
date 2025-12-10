# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from frappe import _

def get_data():
	return [
		{
			"module_name": "Renegade ERP Core",
			"color": "#2d5aa0",
			"icon": "octicon octicon-package",
			"type": "module",
			"label": _("Renegade ERP Core"),
			"description": _("Core business functionality and system configuration")
		}
	]