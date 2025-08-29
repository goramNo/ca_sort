import type { Mood } from './mood';

export type Proposal = {
  id: string;
  text: string;
  mood?: Mood;
  createdAt: Date;
  createdBy: string;
  taggedFriends: string[];
};

// Données fictives pour le MVP
export const PROPOSALS: Proposal[] = [
  {
    id: '1',
    text: 'Tacos à Argenteuil 20h',
    mood: 'eat',
    createdAt: new Date(),
    createdBy: 'Mehdi',
    taggedFriends: ['Lina']
  },
  {
    id: '2',
    text: 'Valorant 21h',
    mood: 'gaming',
    createdAt: new Date(),
    createdBy: 'Sarah',
    taggedFriends: []
  },
  {
    id: '3',
    text: 'Balade nocturne Paris',
    mood: 'drive',
    createdAt: new Date(),
    createdBy: 'Alex',
    taggedFriends: []
  }
];