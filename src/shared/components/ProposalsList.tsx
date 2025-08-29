import React from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';
import { Proposal } from '../types/proposal';
import ProposalCard from './ProposalCard';

type ProposalsListProps = {
  proposals: Proposal[];
  emptyMessage?: string;
  onProposalPress?: (proposal: Proposal) => void;
};

export default function ProposalsList({ 
  proposals, 
  emptyMessage = 'Aucune proposition pour le moment', 
  onProposalPress 
}: ProposalsListProps) {
  if (proposals.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>{emptyMessage}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={proposals}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ProposalCard 
          proposal={item} 
          onPress={() => onProposalPress?.(item)}
        />
      )}
      contentContainerStyle={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingVertical: 8,
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: '#9aa',
    fontStyle: 'italic',
    textAlign: 'center',
  },
});