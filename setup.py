# -*- coding: utf-8 -*-
from setuptools import setup, find_packages
import re
import ast

# Read version from __init__.py without importing the module
def get_version():
	version_file = 'renegade_erp_core/__init__.py'
	_version_re = re.compile(r'__version__\s+=\s+(.*)')
	with open(version_file, 'rb') as f:
		version_match = _version_re.search(f.read().decode('utf-8'))
		if version_match:
			return str(ast.literal_eval(version_match.group(1)))
	raise RuntimeError('Cannot find version string')

with open('requirements.txt') as f:
	install_requires = f.read().strip().split('\n')

setup(
	name='renegade_erp_core',
	version=get_version(),
	description='Renegade ERP Core - Comprehensive ERPNext Extension',
	author='Renegade Code',
	author_email='support@renegadecode.co.za',
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)