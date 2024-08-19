import { Profile } from '../entities/Profile';

export interface IProfileRepository {
    createProfile(profile: Profile): Promise<Profile>;
    getProfileById(id: string): Promise<Profile | null>;
    getProfiles(): Promise<Profile[]>;
    updateProfile(id: string, profile: Profile): Promise<Profile | null>;
    deleteProfile(id: string): Promise<void>;
    duplicateProfile(id: string, descricao: string): Promise<Profile | null>;
    // Adicione outros métodos necessários aqui
}
