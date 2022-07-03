import NextAuth from "next-auth";
import FacebookProvider from "next-auth/providers/facebook"
import GitHubProvider from "next-auth/providers/github"
import VkProvider from "next-auth/providers/vk"
import GoogleProvider from "next-auth/providers/google"
export default NextAuth({
  providers: [
    FacebookProvider({
      // @ts-ignore
      clientId: process.env.FACEBOOK_CLIENT_ID,
      // @ts-ignore
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    VkProvider({
      clientId: process.env.VK_CLIENT_ID,
      clientSecret: process.env.VK_CLIENT_SECRET,
    }),
    GoogleProvider({
      // @ts-ignore
      clientId: process.env.GOOGLE_CLIENT_ID,
      // @ts-ignore
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    })
    // ...add more providers here
  ],
  // pages: {
  //   signIn: '/auth/signin'
  // },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true
    },
  }
})