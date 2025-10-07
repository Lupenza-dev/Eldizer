import React, { useContext } from 'react';
import { SafeAreaView, StyleSheet, Text, View, ScrollView, RefreshControl } from 'react-native';
import Footer from '../components/Footer';
import HeaderTab from '../components/HeaderTab';
import AssignmentCard from '../components/AssignmentCard';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { BASE_URL } from '../utils/config';
import Spinner from 'react-native-loading-spinner-overlay';
import { useLanguage } from '../utils/LanguageContext';
import { useQuery } from '@tanstack/react-query';

const AssignMentScreen = () => {
  const { userToken } = useContext(AuthContext);
  const { t } = useLanguage();

  // ✅ Function to fetch assignments
  const fetchAssignments = async () => {
    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${BASE_URL}/get-assignments`,
      headers: {
        'Authorization': `Bearer ${userToken}`,
      },
    };
    const response = await axios.request(config);
    return response.data.data;
  };

  // ✅ Use React Query for fetching and caching
  const { data: assignments = [], isLoading, error, refetch } = useQuery({
    queryKey: ['assignments'],
    queryFn: fetchAssignments,
  });

  // ✅ Handle refresh manually
  const onRefresh = () => {
    refetch();
  };

  // ✅ Optional: handle error display
  if (error) {
    console.log('Error fetching assignments:', error.message);
  }

  return (
    <>
      <HeaderTab title={t('Assighn_money')} />

      <SafeAreaView style={{ backgroundColor: '#fff', flex: 1 }}>
        <Spinner
          visible={isLoading}
          textContent={'Loading...'}
          textStyle={{ color: '#FFF' }}
        />

        <ScrollView
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
          }
        >
          <View style={{ paddingHorizontal: 10 }}>
            <View>
              <Text style={styles.title}>{t('all_assignment')}</Text>
            </View>

            <View>
              {assignments.length > 0 ? (
                assignments.map((data, i) => (
                  <AssignmentCard key={i} data={data} />
                ))
              ) : (
                !isLoading && (
                  <Text style={styles.noData}>{t('no_assignment_found')}</Text>
                )
              )}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>

      <Footer />
    </>
  );
};

export default AssignMentScreen;

const styles = StyleSheet.create({
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  noData: {
    textAlign: 'center',
    marginTop: 20,
    color: '#777',
  },
});
