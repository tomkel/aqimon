'use client'
// https://github.com/maplibre/maplibre-react-native/blob/main/packages/examples/src/examples/common/Bubble.tsx
import React, { ReactNode } from 'react'
import { StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native'
import { GestureResponderEvent } from 'react-native/Libraries/Types/CoreEventTypes'

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 30,
    bottom: 16,
    justifyContent: 'center',
    left: 48,
    minHeight: 60,
    paddingVertical: 16,
    position: 'absolute',
    right: 48,
  },
})

interface BubbleProps {
  children: ReactNode
  style?: StyleProp<ViewStyle>
  onPress?: (event: GestureResponderEvent) => void
}

export default function Bubble({ children, style, onPress }: BubbleProps) {
  return (
    <View style={[styles.container, style]}>
      {onPress ? <TouchableOpacity onPress={onPress}>{children}</TouchableOpacity> : children}
    </View>
  )
}
