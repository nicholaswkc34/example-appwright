export const NambarOption = {
  Home: 'Home',
  About: 'About',
  Contact: 'Contact',
  Perfil: 'Perfil',
} as const;

export type NambarOption = typeof NambarOption[keyof typeof NambarOption];