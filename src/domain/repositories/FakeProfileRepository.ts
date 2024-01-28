import { IProfileRepository } from './IProfileRepository'
import { Profile } from '../entities/Profile'
import { v4 as uuid } from 'uuid'
import { AuthService } from '../../app/services/AuthService'

class FakeProfileRepository implements IProfileRepository {
  private profiles: Profile[] = []

  public async deleteProfile(id: string): Promise<void> {
    this.profiles = this.profiles.filter((profile) => profile.id != id)
  }

  public async getProfiles(): Promise<Profile[]> {
    return this.profiles
  }

  public async getProfileById(id: string): Promise<Profile | null> {
    const profile = this.profiles.find((profile) => profile.id == id)

    return profile ? profile : null
  }

  public async updateProfile(
    id: string,
    profile: Profile
  ): Promise<Profile | null> {
    const findProfile = this.profiles.find((profile) => profile.id == id)

    if (findProfile) {
      findProfile.descricao = profile.descricao
        ? profile.descricao
        : findProfile.descricao

      this.profiles[this.profiles.map((x) => x.id).indexOf(id)] = findProfile
      return findProfile
    } else {
      return null
    }
  }

  public async createProfile(profile: Profile): Promise<Profile> {
    const newProfile = new Profile()
    Object.assign(newProfile, {
      id: uuid(),
      descricao: profile.descricao,
    })

    this.profiles.push(profile)

    return newProfile
  }

  public async duplicateProfile(
    id: string,
    descricao: string
  ): Promise<Profile | null> {
    const originProfile = this.profiles.find((profile) => profile.id == id)

    if (originProfile) {
      originProfile.descricao = descricao
      const newProfile = this.createProfile(originProfile)

      return newProfile
    } else {
      return null
    }
  }
}
