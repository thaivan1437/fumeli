import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"


// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions = {
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  secret: "94d25574656a8ee61f1adb9d18435c36",
}

export default NextAuth(authOptions)
