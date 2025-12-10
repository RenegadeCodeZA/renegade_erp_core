# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import frappe

__version__ = '1.0.0'

# Dynamic logo configuration
if frappe.conf and frappe.conf.get("app_logo_url"):
    __logo__ = frappe.conf.get("app_logo_url") or '/assets/renegade_erp_core/images/renegade_logo_default.svg'
else:
    __logo__ = '/assets/renegade_erp_core/images/renegade_logo_default.svg'