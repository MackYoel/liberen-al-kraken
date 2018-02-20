import dj_database_url

from .base import *

DEBUG = False

db_from_env = dj_database_url.config(conn_max_age=500)
DATABASES['default'].update(db_from_env)


STATICFILES_STORAGE = 'whitenoise.django.GzipManifestStaticFilesStorage'

WHITENOISE_STATIC_PREFIX = STATIC_URL

STATIC_URL = os.environ.get('DJANGO_STATIC_HOST', STATIC_URL)

STATIC_ROOT = os.path.join(BASE_DIR, 'static')
