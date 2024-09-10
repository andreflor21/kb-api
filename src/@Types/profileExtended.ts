import { Profile, User, Routes } from '@prisma/client';

export type ProfileExtended = {
    users: Partial<User>[];
    routes: Partial<Routes>[];
} & Profile;
