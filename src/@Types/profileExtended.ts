import { Profile, User, Routes } from '@prisma/client';

export interface ProfileExtended extends Profile {
    users: Partial<User>[];
    routes: Partial<Routes>[];
}
