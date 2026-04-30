import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as ImagePicker from 'expo-image-picker';
import { OnboardingStackParamList } from '../../navigation/OnboardingNavigator';
import { Button } from '../../components/ui';
import { Colors, TextStyles, Spacing, Radius } from '../../theme';
import { supabase } from '../../lib/supabase';
import StepProgress from './components/StepProgress';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'ProfilePhoto'>;

export default function ProfilePhotoScreen({ navigation }: Props) {
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const pickPhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission needed',
        'Please allow access to your photo library in Settings.',
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setPhotoUri(result.assets[0].uri);
    }
  };

  const handleNext = async () => {
    if (photoUri) {
      setUploading(true);
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          // Fetch image as blob and upload to Supabase Storage
          const response = await fetch(photoUri);
          const blob = await response.blob();
          const path = `${user.id}/avatar.jpg`;

          const { error: uploadError } = await supabase.storage
            .from('avatars')
            .upload(path, blob, { contentType: 'image/jpeg', upsert: true });

          if (!uploadError) {
            const { data: urlData } = supabase.storage
              .from('avatars')
              .getPublicUrl(path);

            await supabase
              .from('users')
              .update({ avatar_url: urlData.publicUrl } as never)
              .eq('id', user.id);
          }
        }
      } catch {
        // Non-fatal — user can still continue
      } finally {
        setUploading(false);
      }
    }
    navigation.navigate('HealthKit');
  };

  const initials = 'ME';

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.content}>
        <StepProgress current={2} total={5} />

        <Text style={styles.title}>ADD YOUR{'\n'}PHOTO</Text>
        <Text style={styles.subtitle}>
          Help your pack recognize you
        </Text>

        {/* Avatar preview */}
        <View style={styles.avatarSection}>
          <TouchableOpacity
            onPress={pickPhoto}
            style={styles.avatarContainer}
            activeOpacity={0.8}
          >
            {photoUri ? (
              <Image source={{ uri: photoUri }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarInitials}>{initials}</Text>
              </View>
            )}
            <View style={styles.avatarBadge}>
              <Text style={styles.avatarBadgeText}>+</Text>
            </View>
          </TouchableOpacity>

          <Text style={styles.tapHint}>Tap to choose a photo</Text>
        </View>

        <View style={styles.actions}>
          {uploading ? (
            <View style={styles.uploadingRow}>
              <ActivityIndicator size="small" color={Colors.lime} />
              <Text style={styles.uploadingText}>Uploading…</Text>
            </View>
          ) : (
            <Button
              label={photoUri ? 'SAVE & CONTINUE' : 'CHOOSE PHOTO'}
              onPress={photoUri ? handleNext : pickPhoto}
              size="lg"
              style={styles.primaryBtn}
            />
          )}

          <TouchableOpacity onPress={() => navigation.navigate('HealthKit')} style={styles.skipBtn}>
            <Text style={styles.skipText}>Skip for now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const AVATAR_SIZE = 140;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.base,
    paddingBottom: Spacing.xl,
  },
  title: {
    ...TextStyles.displayM,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: Spacing.xxxl,
  },
  avatarSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: Spacing.base,
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    borderWidth: 3,
    borderColor: Colors.lime,
  },
  avatarPlaceholder: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    backgroundColor: Colors.surfaceElevated,
    borderWidth: 2,
    borderColor: Colors.border,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitials: {
    fontFamily: 'BarlowCondensed_700Bold',
    fontSize: 48,
    color: Colors.textMuted,
  },
  avatarBadge: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.lime,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: Colors.background,
  },
  avatarBadgeText: {
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
    color: Colors.background,
    lineHeight: 24,
  },
  tapHint: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    color: Colors.textMuted,
  },
  actions: {
    gap: Spacing.md,
  },
  primaryBtn: {
    width: '100%',
  },
  uploadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    minHeight: 56,
  },
  uploadingText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 15,
    color: Colors.textSecondary,
  },
  skipBtn: {
    alignItems: 'center',
    paddingVertical: Spacing.md,
  },
  skipText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 15,
    color: Colors.textSecondary,
  },
});
