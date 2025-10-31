"""
WSGI config for evolvium_backend project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.2/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application

if 'RENDER_EXTERNAL_HOSTNAME' in os.environ:
    settings_module = 'auth_boilerplate.deployment_settings'
else:
    settings_module = os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'auth_boilerplate.settings')

os.environ.setdefault('DJANGO_SETTINGS_MODULE', settings_module)

application = get_wsgi_application()