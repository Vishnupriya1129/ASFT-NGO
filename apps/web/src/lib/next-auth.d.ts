import 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
    role: 'ADMIN' | 'EDITOR' | 'VOLUNTEER';
  }

  interface Session {
    user: User & {
      email?: string | null;
      name?: string | null;
      image?: string | null;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: 'ADMIN' | 'EDITOR' | 'VOLUNTEER';
  }
}
