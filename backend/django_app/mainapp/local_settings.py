
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'predictiondb',
        'USER': 'postgres',
        'PASSWORD': '12345678',
        'HOST': '127.0.0.1',
        'PORT': '5451',
    }
}


##  (CORS) Cross-Origin Resource Sharing Settings ##
CORS_ORIGIN_ALLOW_ALL = True