import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import axios from 'axios';

async function refreshAccessToken(token) {
  try {
    const apiHost = process.env.apiHost;
    const response = await axios.post(`${apiHost}/api/login/google`, {
      access_token: token?.access_token,
    });
    const newData = await response.data.Payload
    return {
      ...token,
      newData
    };
  } catch (error) {
    console.log('show error refresh token: =>>>', error)
    return {
      ...token,
      error: "RefreshAccessTokenError",
    }
  }
}

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({token, user, account}) {
      // Access token has expired, try to update it
      return {...token, ...account};
    },
    async session({session, token}) {
      const abc = await refreshAccessToken(token);
      if (abc) {
        session.user = abc
      }
      return session
    },
    // Các callback khác...
  },
};

export default (req, res) => NextAuth(req, res, authOptions);
