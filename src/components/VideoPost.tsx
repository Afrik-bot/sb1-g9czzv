import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Video } from 'expo-av';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

interface VideoPostProps {
  video: {
    videoUrl: string;
    username: string;
    description: string;
    likes: number;
    comments: number;
    shares: number;
    isVerified: boolean;
  };
  isActive: boolean;
}

export default function VideoPost({ video, isActive }: VideoPostProps) {
  const [isMuted, setIsMuted] = useState(false);

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <View style={styles.container}>
      <Video
        source={{ uri: video.videoUrl }}
        style={styles.video}
        resizeMode="cover"
        shouldPlay={isActive}
        isMuted={isMuted}
        isLooping
      />

      <View style={styles.overlay}>
        <View style={styles.userInfo}>
          <View style={styles.userHeader}>
            <Text style={styles.username}>{video.username}</Text>
            {video.isVerified && (
              <MaterialCommunityIcons name="check-decagram" size={20} color="#A855F7" />
            )}
          </View>
          <Text style={styles.description}>{video.description}</Text>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionButton}>
            <MaterialCommunityIcons name="heart-outline" size={32} color="#fff" />
            <Text style={styles.actionText}>{formatNumber(video.likes)}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <MaterialCommunityIcons name="comment-outline" size={32} color="#fff" />
            <Text style={styles.actionText}>{formatNumber(video.comments)}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <MaterialCommunityIcons name="share-outline" size={32} color="#fff" />
            <Text style={styles.actionText}>{formatNumber(video.shares)}</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => setIsMuted(!isMuted)}
          >
            <MaterialCommunityIcons 
              name={isMuted ? "volume-off" : "volume-high"} 
              size={32} 
              color="#fff" 
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width,
    height,
  },
  video: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  userInfo: {
    flex: 1,
    marginRight: 20,
  },
  userHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  username: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    color: '#fff',
    fontSize: 14,
  },
  actions: {
    alignItems: 'center',
    gap: 16,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
  },
});