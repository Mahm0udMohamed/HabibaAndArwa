export enum Sender {
  USER = 'user',
  BOT = 'bot',
}

export enum GameMode {
  MENU = 'menu',
  PLAY = 'play',
  ADVENTURES = 'adventures',
  CHALLENGE = 'challenge',
  FOCUS = 'focus',
  STUDY = 'study',
  SPEED_CHALLENGE = 'speed_challenge',
}

export enum Character {
  Habiba = 'حبيبة',
  Arwa = 'أروي',
  Both = 'كلاهما',
}

export interface Message {
  id: number;
  text: string;
  sender: Sender;
  character?: Character; // Character is now associated with the USER message
}

export interface DailyChallenge {
  title: string;
  prompt: string;
}

// FIX: Add and export AvatarIcon type.
export type AvatarIcon = 'compass' | 'sword' | 'map' | 'feather';

export interface Theme {
  id: string;
  name: string;
  style: string;
}