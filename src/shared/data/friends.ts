import type { Mood } from '../types/mood';

export type Friend = {
  id: string;
  name: string;
  mood?: Mood; // undefined => n'a pas choisi ce soir
};

export const FRIENDS: Friend[] = [
  { id: '1', name: 'Mehdi', mood: 'eat' },
  { id: '2', name: 'Sarah', mood: 'gaming' },
  { id: '3', name: 'Alex', mood: 'drive' },
  { id: '4', name: 'Lina', mood: 'eat' },
  { id: '5', name: 'Yanis', mood: 'busy' },
];
