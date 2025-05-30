import type { LevelEnum } from '@/enum/level.enum';

export type LoginParams = {
  email?: string;
  password?: string;
};

export type RegisterParams = {
  fullname: string;
  email: string;
  level: LevelEnum;
  password: string;
};
