import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Icon from './Icon';
import { colors } from '../utils/GlobalStyles'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'
import { BASE_URL } from '../utils/config'
import { useNavigation } from '@react-navigation/native'

const DashStatistics = () => {
  const navigation = useNavigation();
  const { userToken } = useContext(AuthContext);
  const [dashboard, setDashboard] = useState({
    pending_applications: 0,
    approved_applications: 0,
    outstanding_loans: 0,
    total_paid_amount: 0,
  });

  const getDashboard = () => {
    axios.get(`${BASE_URL}/dashboard`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`,
      }
    }).then(response => {
      if (response.data.success) {
        setDashboard(response.data.data);
      }
    }).catch(error => {
      console.log(error.response);
    });
  };

  useEffect(() => {
    getDashboard();
  }, []);

  const stats = [
    {
      label: 'Pending Application',
      value: dashboard.pending_applications,
      icon: 'clockcircle',
      color: colors.warning,
      background: '#FDF6E3',
      route: 'LoanScreen',
      filter: 1,
    },
    {
      label: 'Approved Application',
      value: dashboard.approved_applications,
      icon: 'checkcircle',
      color: '#0faf9a',
      background: '#E6F7F5',
      route: 'LoanScreen',
      filter: 2,
    },
    {
      label: 'Outstanding',
      value: dashboard.outstanding_loans,
      icon: 'exclamationcircle',
      color: colors.secondary,
      background: '#FFEFEB',
      route: 'LoanScreen',
      filter: 3,
    },
    {
      label: 'Total Paid',
      value: dashboard.total_paid_amount,
      icon: 'wallet',
      color: colors.primary,
      background: '#EAEFF4',
      route: 'PaymentScreen',
    },
  ];

  return (
    <View style={styles.container}>
      {stats.map((item, i) => (
        <TouchableOpacity
          key={i}
          activeOpacity={0.8}
          style={styles.card}
          onPress={() => navigation.navigate(item.route, { filter: item.filter })}
        >
          <View style={styles.topRow}>
            <View style={[styles.iconCircle, { backgroundColor: item.background }]}>
              <Icon name={item.icon} type='antdesign' size={20} color={item.color} />
            </View>
            <Text style={styles.value}>{item.value}</Text>
          </View>
          <Text style={styles.label}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

export default DashStatistics

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  card: {
    width: '48.5%',
    backgroundColor: '#fff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#EBECEF',
    padding: 14,
    marginBottom: 10,
    shadowColor: '#272F3B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  value: {
    fontSize: 20,
    fontWeight: '700',
    color: '#272F3B',
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.accent,
  },
})