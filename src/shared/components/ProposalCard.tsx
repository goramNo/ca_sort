import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Proposal } from '../types/proposal';
import { MOOD_EMOJI } from '../types/mood';

type ProposalCardProps = {
  proposal: Proposal;
  onPress?: () => void;
};

export default function ProposalCard({ proposal, onPress }: ProposalCardProps) {
  const { text, mood, createdBy, taggedFriends } = proposal;
  
  return (
    <Pressable 
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed
      ]}
    >
      <View style={styles.header}>
        <Text style={styles.emoji}>{mood ? MOOD_EMOJI[mood] : '🎯'}</Text>
        <Text style={styles.title}>{text}</Text>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.author}>Par {createdBy}</Text>
        {taggedFriends.length > 0 && (
          <Text style={styles.tagged}>
            avec {taggedFriends.join(', ')}
          </Text>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#121214',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#222',
  },
  pressed: {
    opacity: 0.8,
    backgroundColor: '#1a1a1c',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  emoji: {
    fontSize: 24,
    marginRight: 10,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  author: {
    color: '#9aa',
    fontSize: 12,
  },
  tagged: {
    color: '#9aa',
    fontSize: 12,
    fontStyle: 'italic',
  },
});