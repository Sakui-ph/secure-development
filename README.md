# secure-development

# DEPLOYMENT INSTRUCTIONS

1. Create mySQL database, and import the schemas provided. (Announcements go **before** comments)
2. Inside the `server` folder, create a .env containing these values.

```
STATUS='prod'
DEBUG='true'
HTTPS='true'
DEV_PORT=5555
PROD_PORT=5555

# DB CONFIGURATION
DB_CONNECTION_STRING=mysql://root:admin@localhost:3306/secure_development_schema
SESSION_SECRET=d!ynZJp#@+XRSmWts6s6sNBSeNn5cNBZj@%Ww9PjSpOT$6c6C=

```

_Set STATUS to 'dev' if you want to use HTTP, update HTTPS accordingly_
_Set DEBUG to 'true' if you want long logs_

3. Inside the `client` folder, create a .env containing these values.

```
REACT_APP_DEBUG='false'
REACT_APP_HTTPS=true

HTTPS=true
SSL_CRT_FILE="./certificate/localhost.pem"
SSL_KEY_FILE="./certificate/localhost-key.pem"
```

4. Update the connection string to the corresponding user, password, and database name that you set.
5. Run `npm install` inside of the `client` and `server` folders
6. Run `npm install` in the root folder
7. Call `npm run start` in the root folder to run both client and server concurrently
8. Access the application in localhost:3000

NOTE: SSL certs provided might not work for you
