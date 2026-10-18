import React, { useContext, useEffect, useState } from 'react';
import {
  ActivityIndicator, Image, KeyboardAvoidingView, Platform,
  ScrollView, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import HeaderTab from '../components/HeaderTab';
import Footer from '../components/Footer';
import NewForm from '../components/NewForm';
import { AuthContext } from '../context/AuthContext';
import { BASE_URL } from '../utils/config';
import { useLanguage } from '../utils/LanguageContext';

const BANKS = [
  { label: 'CRDB', value: 'CRDB' },
  { label: 'NMB', value: 'NMB' },
];

export default function EcoWaterServiceScreen() {
  const { userToken } = useContext(AuthContext);
  const { t } = useLanguage();
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const [campuses, setCampuses] = useState([]);
  const [campusId, setCampusId] = useState(null);
  const [bankName, setBankName] = useState(null);
  const [accountNumber, setAccountNumber] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const loanApplicationMutation = useMutation({
    mutationFn: async (application) => {
      const { data } = await axios.post(`${BASE_URL}/loan-application`, application, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      return data;
    },
    onSuccess: (data) => {
      Toast.show({ type: 'success', text1: data?.message || t('ecowater_subscribed'), position: 'top' });
      queryClient.invalidateQueries({ queryKey: ['loans'] });
      navigation.navigate('LoanScreen');
    },
    onError: (error) => {
      const response = error.response?.data;
      const validationMessages = Object.values(response?.errors || {}).flat().filter(message => typeof message === 'string');
      const message = validationMessages[0] || response?.message || error.message || t('ecowater_subscription_failed');
      Toast.show({ type: 'error', text1: message, position: 'top' });
    },
  });

  const subscribe = () => {
    if (loanApplicationMutation.isPending) return;
    const error = !campusId ? t('ecowater_campus_required')
      : !bankName ? t('ecowater_bank_required')
      : !accountNumber.trim() ? t('ecowater_account_required') : null;
    if (error) {
      Toast.show({ type: 'error', text1: error, position: 'top' });
      return;
    }
    loanApplicationMutation.mutate({
      amount: 12000,
      plan: 1,
      agent_id: 1,
      bank_name: bankName,
      account_number: accountNumber.trim(),
      loan_type: 3,
      eco_water_campus_id: campusId,
      device_id: null,
      initial_deposit: 0,
    });
  };

  useEffect(() => {
    const controller = new AbortController();
    const loadCampuses = async () => {
      setLoading(true);
      setLoadError(false);
      setCampuses([]);
      setCampusId(null);
      try {
        const { data } = await axios.get(`${BASE_URL}/get-eco-water-campuses`, {
          headers: { Authorization: `Bearer ${userToken}` },
          signal: controller.signal,
        });
        const items = Array.isArray(data) ? data : data.data;
        if (!Array.isArray(items)) throw new Error('Invalid campus response');
        if (!controller.signal.aborted) setCampuses(items);
      } catch (error) {
        if (!controller.signal.aborted) setLoadError(true);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };
    loadCampuses();
    return () => controller.abort();
  }, [userToken, retryCount]);

  return (
    <View style={styles.screen}>
      <HeaderTab title={t('ecowater_title')} />
      <KeyboardAvoidingView style={styles.body} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <View style={styles.intro}>
            {/* <Image source={require('../assets/ecowater.png')} style={styles.image} /> */}
            <Text style={styles.title}>{t('ecowater_title')}</Text>
            <Text style={styles.description}>{t('ecowater_description')}</Text>
            <View style={styles.costRow}>
              <Text style={styles.costLabel}>{t('ecowater_cost')}</Text>
              <Text style={styles.cost}>TZS 15,000</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>{t('ecowater_details')}</Text>
          <Text style={styles.label}>{t('campus')}</Text>
          {loading && (
            <View style={styles.status}>
              <ActivityIndicator color="#078586" />
              <Text style={styles.statusText}>{t('loading_campuses')}</Text>
            </View>
          )}
          <Dropdown
            style={styles.dropdown}
            data={campuses}
            labelField="campus_name"
            valueField="id"
            search
            searchPlaceholder={t('search_campus')}
            placeholder={t('select_campus')}
            value={campusId}
            onChange={item => setCampusId(item.id)}
            disable={loading || loadError || campuses.length === 0}
            maxHeight={280}
            accessibilityLabel={t('select_campus')}
          />
          {!loading && (loadError || campuses.length === 0) && (
            <View style={styles.feedback}>
              <Text style={styles.statusText} accessibilityLiveRegion="polite">
                {t(loadError ? 'campuses_error' : 'campuses_empty')}
              </Text>
              <TouchableOpacity accessibilityRole="button" onPress={() => setRetryCount(count => count + 1)} style={styles.retry}>
                <Text style={styles.retryText}>{t('try_again')}</Text>
              </TouchableOpacity>
            </View>
          )}

          <Text style={styles.label}>{t('your_bank')}</Text>
          <Dropdown
            style={styles.dropdown}
            data={BANKS}
            labelField="label"
            valueField="value"
            search
            searchPlaceholder={t('search_bank')}
            placeholder={t('bank_name')}
            value={bankName}
            onChange={item => setBankName(item.value)}
            accessibilityLabel={t('your_bank')}
          />
          <Text style={styles.label}>{t('account_number')}</Text>
          <NewForm
            label={t('enter_account_number')}
            icon_name="idcard"
            icon_type="antdesign"
            value={accountNumber}
            keyboardType="number-pad"
            onChangeText={setAccountNumber}
          />
          <TouchableOpacity
            style={[styles.subscribeButton, (loading || loadError || campuses.length === 0 || loanApplicationMutation.isPending) && styles.disabledButton]}
            accessibilityRole="button"
            accessibilityState={{ disabled: loading || loadError || campuses.length === 0 || loanApplicationMutation.isPending, busy: loanApplicationMutation.isPending }}
            disabled={loading || loadError || campuses.length === 0 || loanApplicationMutation.isPending}
            onPress={subscribe}
            activeOpacity={0.8}
          >
            {loanApplicationMutation.isPending && <ActivityIndicator color="#fff" />}
            <Text style={styles.subscribeText}>{t(loanApplicationMutation.isPending ? 'ecowater_subscribing' : 'ecowater_subscribe')}</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#fff' },
  body: { flex: 1 },
  content: { padding: 20, paddingBottom: 32 },
  intro: { backgroundColor: '#eef9f8', borderRadius: 16, padding: 20 },
  image: { width: 64, height: 64, resizeMode: 'contain', marginBottom: 12 },
  title: { fontSize: 24, fontWeight: '700', color: '#272F3B' },
  description: { fontSize: 15, lineHeight: 23, color: '#475569', marginTop: 8 },
  costRow: { borderTopWidth: 1, borderTopColor: '#cce6e3', marginTop: 20, paddingTop: 16, gap: 6 },
  costLabel: { fontSize: 13, color: '#475569' },
  cost: { fontSize: 26, fontWeight: '700', color: '#078586' },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#272F3B', marginTop: 28, marginBottom: 4 },
  label: { fontSize: 15, fontWeight: '600', color: '#272F3B', marginTop: 18, marginBottom: 8 },
  dropdown: { minHeight: 54, borderWidth: 1, borderColor: '#272F3B', borderRadius: 10, paddingHorizontal: 12 },
  status: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  statusText: { fontSize: 14, lineHeight: 21, color: '#475569' },
  feedback: { marginTop: 10 },
  retry: { alignSelf: 'flex-start', paddingVertical: 12, paddingRight: 20 },
  retryText: { fontSize: 14, fontWeight: '700', color: '#078586' },
  subscribeButton: { minHeight: 54, backgroundColor: '#272F3B', borderRadius: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, padding: 14 },
  disabledButton: { opacity: 0.5 },
  subscribeText: { color: '#fff', fontSize: 17, fontWeight: '600' },
});
