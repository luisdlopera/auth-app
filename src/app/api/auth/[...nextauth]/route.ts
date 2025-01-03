
import db from '@/lib/prisma';
import bcrypt from 'bcrypt';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const authOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials) {

                if (!credentials || !credentials.email || !credentials.password) {
                    throw new Error('Missing credentials');
                }

                const userFound = await db.user.findUnique({
                    where: {
                        email: credentials!.email
                    }
                });

                if (!userFound) {
                    return null;
                }

                const isPasswordValid = await bcrypt.compare(credentials!.password, userFound.password);
                if (!isPasswordValid) {
                    return null;
                }

                return {
                    id: userFound.id,
                    email: userFound.email,
                    name: userFound.username
                };
            }
        })
    ],
    pages: {
        signIn: '/auth/login',
    }
};

const handlerAuth = NextAuth(authOptions);

export { handlerAuth as GET, handlerAuth as POST };