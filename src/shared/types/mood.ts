export type Mood = 'eat'|'gaming'|'drive'|'movie'|'chill'|'busy';

export const MOOD_EMOJI: Record<Mood, string> = {
  eat: '🍔',
  gaming: '🎮',
  drive: '🚗',
  movie: '🎬',
  chill: '🥱',
  busy: '📚',
};

export const MOOD_LABEL: Record<Mood, string> = {
  eat: 'Sortir manger',
  gaming: 'Gaming/Discord',
  drive: 'Balade',
  movie: 'Film/Série',
  chill: 'Flemme',
  busy: 'Occupé',
};
