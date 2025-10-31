"""
ASGI config for auth_boilerplate project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.2/howto/deployment/asgi/
"""

import os

from django.core.asgi import get_asgi_application

if 'RENDER_EXTERNAL_HOSTNAME' in os.environ:
    settings_module = 'auth_boilerplate.deployment_settings'
else:
    settings_module = os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'auth_boilerplate.settings')

os.environ.setdefault('DJANGO_SETTINGS_MODULE', settings_module)

application = get_asgi_application()