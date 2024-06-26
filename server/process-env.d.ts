declare global {
    namespace NodeJS {
        interface ProcessEnv {
            STATUS: 'dev' | 'prod';
            DEBUG: 'true' | 'false';
            HTTPS: 'true' | 'false';
            DB_CONNECTION_STRING: string;
            SESSION_SECRET: string;
        }
    }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
