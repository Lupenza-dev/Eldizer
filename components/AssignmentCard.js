import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { colors } from '../utils/GlobalStyles';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { useLanguage } from '../utils/LanguageContext';
import Toast from 'react-native-toast-message';

const AssignmentCard = ({data}) => {
  const navigation = useNavigation();
  const {t} =useLanguage();
  // Map numeric status to string if needed
  const getStatusText = () => {
    if(data.participation_status) return "Participated";
    if (typeof data.status === 'number') {
      switch (data.status) {
        case 1: return 'Active';
        case 0: return 'Inactive';
        default: return 'Unknown';
      }
    }
    return data.status || data.progress || 'Unknown';
  };

  // Map status/progress to color
  const getStatusColor = () => {
    const status = getStatusText();
    switch (status) {
      case 'Completed': return '#4CAF50'; // Green
      case 'Active': return '#2196F3'; // Blue
      case 'In Progress': return '#FFC107'; // Yellow
      case 'Not Started': return '#9E9E9E'; // Grey
      case 'Participated': return '#21B532'; // Grey
      default: return '#9E9E9E';
    }
  };

  // Progress percentage based on progress string
  const getProgressPercentage = () => {
    if (data.participation_status) {
        return (data?.participant?.score_gained / data?.participant?.total_questions) * 100;
    } else {
      return 0;
    }
    // const progress = (data.progress || '').toLowerCase();
    // if (progress === 'completed') return 90;
    // if (progress === 'in progress') return 50;
    // if (progress === 'not started') return 0;
    // return 0;
  };

  // Format date
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr.replace(' ', 'T'));
    return d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const alertUser = () => {
    Toast.show({
      type: 'success',
      text1: "You have already participated on this quiz",
      position: 'top'
    });
  }

  return (
    <TouchableOpacity 
      style={[styles.container, { borderLeftColor: getStatusColor(), borderLeftWidth: 4 }]} 
      onPress={() => data?.participation_status ? alertUser(): navigation.navigate('QuestionScreen', { questions: data.questions, assignmentId: data?.assigment_id })} 
      activeOpacity={0.8}
    >
      <View style={styles.upContainer}>
        <Image 
          source={{ uri: data.image }} 
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.subUpContainer}>
          <View style={styles.HeaderContainer}>
            <Text style={styles.EventHeader} numberOfLines={1} ellipsizeMode="tail">
              {data.name}
            </Text>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor() }]}> 
              <Text style={styles.statusText}>{getStatusText()}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.downContainer}>
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Icon type="material-community" name="clock-time-four-outline" size={16} color={colors.primary} />
            <Text style={styles.infoText}>{t('start')}: {formatDate(data.start_time)}</Text>
          </View>
          <View style={styles.infoItem}>
            <Icon type="material-community" name="calendar-month" size={16} color={colors.primary} />
            <Text style={styles.infoText}>{t('end')}: {formatDate(data.end_time)}</Text>
          </View>
        </View>
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Icon type="material-community" name="help-circle-outline" size={16} color={colors.primary} />
            <Text style={styles.infoText}>{data.total_questions} {t('Questions')}</Text>
          </View>
          {
            data?.participant?.score_gained && (
            <View style={styles.infoItem}>
            <Icon type="material-community" name="target" size={16} color={colors.primary} />
            <Text style={styles.infoText}>{data.participant?.score_gained} {t('score')}</Text>
          </View>)
          }
          
        </View>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${getProgressPercentage()}%` }]} />
          </View>
          <Text style={styles.progressText}>{getProgressPercentage()}% {t('Complete')}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default AssignmentCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  upContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  subUpContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  HeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  EventHeader: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
    marginRight: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  scoreContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginTop: 4,
    marginBottom: 4,
  },
  difficultyContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  difficultyText: {
    color: '#1565C0',
    fontSize: 12,
    fontWeight: '500',
  },
  scoreText: {
    color: '#2E7D32',
    fontSize: 14,
    fontWeight: '500',
  },
  downContainer: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  infoText: {
    fontSize: 13,
    color: '#666',
    marginLeft: 6,
  },
  progressContainer: {
    marginTop: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    marginBottom: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: '#757575',
    textAlign: 'right',
  },
  EventHeader:{
    fontSize: 15,
    fontWeight: 'bold'
  },
  subText:{
    fontSize: 12,
    fontWeight: '500',
    color: colors.accent
  }
});
     