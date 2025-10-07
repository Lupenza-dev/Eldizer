import axios from 'axios';
import React, { useContext, useState, useCallback } from 'react';
import { SafeAreaView, ScrollView, RefreshControl, View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Footer from '../components/Footer';
import HeaderTab from '../components/HeaderTab';
import LoanCard from '../components/LoanCard';
import Search from '../components/Search';
import { AuthContext } from '../context/AuthContext';
import { BASE_URL } from '../utils/config';
import { useQuery } from '@tanstack/react-query';

const LoanScreen = () => {
  const { userToken } = useContext(AuthContext);
  const [refreshing, setRefreshing] = useState(false);

  const loans = async () => {
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${BASE_URL}/get-loans`,
      headers: { 
        'Authorization': `Bearer ${userToken}`,
      },
    };
    const response = await axios.request(config);
    return response.data.data;
  };

  const { data: loanData = [], isLoading, refetch } = useQuery({
    queryKey: ['loans'],
    queryFn: loans,
  });

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch().finally(() => setRefreshing(false));
  }, [refetch]);

  return (
    <>
      <HeaderTab title="All Loans" />
      <SafeAreaView style={{ backgroundColor: '#fff', flex: 1 }}>
        <ScrollView
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          <Spinner visible={isLoading} textContent={'Loading...'} textStyle={{ color: '#FFF' }} />
          <Search />
          {loanData.map((loan, i) => (
            <LoanCard key={i} iteration={i + 1} data={loan} />
          ))}
        </ScrollView>
        <Footer />
      </SafeAreaView>
    </>
  );
};

export default LoanScreen;
