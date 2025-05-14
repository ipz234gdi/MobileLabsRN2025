import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from 'react-native-paper';

export default function Breadcrumb({ path, base, onPress }) {
  const { colors } = useTheme();
  const segments = path.replace(base, '').split('/').filter(Boolean);
  const crumbs = [{ name: 'AppData', uri: base }, ...segments.map((n,i,arr)=>({
    name: n,
    uri: base + arr.slice(0,i+1).join('/') + '/'
  }))];

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
      {crumbs.map((c,i)=>(
        <TouchableOpacity key={c.uri} onPress={()=>onPress(c.uri)} style={[styles.bread, { backgroundColor: colors.accent }]}>
          <Text style={{ color:'#fff', fontSize:12 }}>{c.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    marginVertical: 8,
    maxHeight: 30,
   },
  bread: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
  },
});
