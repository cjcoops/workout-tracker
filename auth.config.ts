import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnTracker = nextUrl.pathname.startsWith("/tracker");
      if (isOnTracker) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/tracker", nextUrl));
      }
      return true;
    },
    session: async ({ session, token }) => {
      if (session?.user && token?.sub) {
        session.user.id = token.sub; // token.uid or token.sub both work
      }
      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.sub = user.id; // token.uid or token.sub both work
      }
      return token;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
