import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

const providers = [
    Providers.Auth0({
        clientId: process.env.AUTH0_CLIENT_ID,
        clientSecret: process.env.AUTH0_CLIENT_SECRET,
        domain: process.env.AUTH0_DOMAIN,
    }),
];

const options = {
    // Configure one or more authentication providers
    providers,
    // @link https://next-auth.js.org/configuration/databases
    database: process.env.NEXTAUTH_DATABASE_URL,
};

const Auth = (req: NextApiRequest, res: NextApiResponse) =>
    NextAuth(req, res, options);

export default Auth;
