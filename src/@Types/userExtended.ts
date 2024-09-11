import { User, Profile, Routes } from '@prisma/client';

export type UserExtended = {
    profile?: {
        routes?: Partial<Routes>[];
    } & Partial<Profile>;
} & Partial<User>;
