export enum GenderEnum {
  MALE = 'Nam',
  FEMALE = 'Nữ',
  OTHER = 'Khác',
}

export const genderOptions = Object.entries(GenderEnum).map(([value, label]) => ({
  label,
  value,
}));