# -*- coding: utf-8 -*-
from setuptools import setup, find_packages

with open('requirements.txt') as f:
	install_requires = f.read().strip().split('\n')

# get version from __version__ variable in renegade_erp_core/__init__.py
from renegade_erp_core import __version__ as version

setup(
	name='renegade_erp_core',
	version=version,
	description='Renegade ERP Core - Comprehensive ERPNext Extension',
	author='Renegade Code',
	author_email='support@renegadecode.co.za',
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)