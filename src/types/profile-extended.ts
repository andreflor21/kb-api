import type { Profile, Routes, User } from "@prisma/client"

export type ProfileExtended = {
	users: Partial<User>[]
	routes: Partial<Routes>[]
} & Profile
