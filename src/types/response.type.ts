import type { GenderEnum } from '@/enum/gender.enum';
import type { LevelEnum } from '@/enum/level.enum';
import type { Timestamp } from 'firebase/firestore';

export interface UserInfo {
  fullname: string;
  email: string;
  level: LevelEnum;
  gender: GenderEnum;
  createdAt?: Timestamp;
}
