import type { GenderEnum } from '@/enum/gender.enum';
import type { LevelEnum } from '@/enum/level.enum';

export type LoginParams = {
  email?: string;
  password?: string;
};

export type RegisterParams = {
  fullname: string;
  email: string;
  level: LevelEnum;
  gender: GenderEnum;
  password: string;
};
