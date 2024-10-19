import type { Profile, Routes, User } from "@prisma/client"

export type UserExtended = {
	profile?: {
		routes?: Partial<Routes>[]
	} & Partial<Profile>
} & Partial<User>
