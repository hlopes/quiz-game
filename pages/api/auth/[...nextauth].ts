import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

const providers = [
    Providers.Google({
        clientId: process.env.NEXTAUTH_GOOGLE_CLIENT_ID,
        clientSecret: process.env.NEXTAUTH_GOOGLE_CLIENT_SECRET,
    }),
];

if (process.env.FACEBOOK_CLIENT_ID) {
    providers.push(
        Providers.Facebook({
            clientId: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        })
    );
}

const options = {
    // Configure one or more authentication providers
    providers,
    // @link https://next-auth.js.org/configuration/databases
    database: process.env.NEXTAUTH_DATABASE_URL,
};

const Auth = (req: NextApiRequest, res: NextApiResponse) =>
    NextAuth(req, res, options);

export default Auth;
