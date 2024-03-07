# secure-development

# DEPLOYMENT INSTRUCTIONS

1. Create mySQL database, and import the schema provided.
2. Inside the `server` folder, create a .env containing these values.

```
STATUS=dev
DEV_PORT=5555
PROD_PORT=5556

# DB CONFIGURATION
DB_CONNECTION_STRING=mysql://root:admin@localhost:3306/secure_development_schema
SESSION_SECRET=d!ynZJp#@+XRSmWts6s6sNBSeNn5cNBZj@%Ww9PjSpOT$6c6C=
```

3. Update the connection string to the corresponding user, password, and database name that you set.
4. Run `npm install` inside of the `client` and `server` folders
5. Run `npm install` in the root folder
6. Call `npm run start` in the root folder to run both client and server concurrently
7. Access the application in localhost:3000
