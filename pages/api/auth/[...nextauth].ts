import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

const options = {
    // Configure one or more authentication providers
    providers: [
        Providers.Email({
            server: {
                host: process.env.NEXTAUTH_EMAIL_SERVER_HOST,
                // @ts-ignore
                port: process.env.NEXTAUTH_EMAIL_SERVER_PORT,
                auth: {
                    user: process.env.NEXTAUTH_EMAIL_SERVER_USER,
                    pass: process.env.NEXTAUTH_EMAIL_SERVER_PASSWORD,
                },
            },
            from: process.env.NEXTAUTH_EMAIL_FROM,
        }),
        Providers.Google({
            clientId: process.env.NEXTAUTH_GOOGLE_CLIENT_ID,
            clientSecret: process.env.NEXTAUTH_GOOGLE_CLIENT_SECRET,
        }),
    ],
    // @link https://next-auth.js.org/configuration/databases
    database: process.env.NEXTAUTH_DATABASE_URL,
};

const Auth = (req: NextApiRequest, res: NextApiResponse) =>
    NextAuth(req, res, options);

export default Auth;
