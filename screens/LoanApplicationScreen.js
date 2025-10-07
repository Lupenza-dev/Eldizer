import React, { useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import { BottomSheet } from 'react-native-btr';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import HeaderTab from '../components/HeaderTab';
import Footer from '../components/Footer';
import FormInput from '../components/FormInput';
import IconButton from '../components/IconButton';
import { AuthContext } from '../context/AuthContext';
import { BASE_URL } from '../utils/config';
import { useLanguage } from '../utils/LanguageContext';

const LoanApplicationScreen = ({ route }) => {
  const navigation = useNavigation();
  const { t } = useLanguage();
  const { userToken } = useContext(AuthContext);

  const screenHeight = Dimensions.get('window').height;
  const { request_amount, plan_applied, loan_type, device_name, device_id, initial_deposit } = route.params;

  // ------------------ STATE ------------------
  const [totalAmount, setTotalAmount] = useState(0);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [plan, setPlan] = useState(null);
  const [interest, setInterest] = useState('');
  const [latePayment, setLatePayment] = useState('');
  const [charges, setCharges] = useState('');
  const [initialDeposit, setInitialDeposit] = useState(null);

  const [agents, setAgents] = useState([]);
  const [agentValue, setAgentValue] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [visibleGuarantor1, setVisibleGuarantor1] = useState(false);
  const [visibleGuarantor2, setVisibleGuarantor2] = useState(false);
  const [guarantor1, setGuarantor1] = useState({ fs: null, rs: null, pn: null, status: false });
  const [guarantor2, setGuarantor2] = useState({ fs: null, rs: null, pn: null, status: false });

  // ------------------ API CALLS ------------------
  const getAgents = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/get-agents`, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      setAgents(data.data);
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  const loanCalculator = async () => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/loan-calculator`,
        { amount: request_amount, plan: plan_applied, loan_type, device_name, device_id },
        { headers: { Authorization: `Bearer ${userToken}` } }
      );

      const info = data.data;
      setTotalAmount(info.total_amount);
      setStartDate(info.start_date);
      setEndDate(info.end_date);
      setPlan(info.plan);
      setInitialDeposit(info.initial_deposit);
      setInterest(info.interest_charge);
      setLatePayment(info.late_payment);
      setCharges(info.fees_and_charges);
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  const loanApplication = async () => {
    if (!agentValue) return notification(t('select_agent'));
    if (
      !guarantor1.fs ||
      !guarantor1.rs ||
      !guarantor1.pn ||
      !guarantor2.fs ||
      !guarantor2.rs ||
      !guarantor2.pn
    )
      return notification(t('fill_guarantor_details'));

    setIsLoading(true);
    try {
      const { data } = await axios.post(
        `${BASE_URL}/loan-application`,
        {
          amount: request_amount,
          plan: plan_applied ?? 1,
          agent_id: agentValue,
          guarantor1fs: guarantor1.fs,
          guarantor1rs: guarantor1.rs,
          guarantor1pn: guarantor1.pn,
          guarantor2fs: guarantor2.fs,
          guarantor2rs: guarantor2.rs,
          guarantor2pn: guarantor2.pn,
          loan_type,
          device_id: device_id ?? null,
          initial_deposit: initial_deposit ?? 0,
        },
        { headers: { Authorization: `Bearer ${userToken}` } }
      );

      Toast.show({ type: 'success', text1: data.message, position: 'top' });
      navigation.navigate('HomeScreen');
    } catch (error) {
      notification(error.response?.data?.errors || 'Application failed');
    } finally {
      setIsLoading(false);
    }
  };

  // ------------------ EFFECTS ------------------
  useEffect(() => {
    loanCalculator();
    getAgents();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loanCalculator();
    }, [])
  );

  // ------------------ HELPERS ------------------
  const notification = (message) =>
    Toast.show({ type: 'error', text1: message, position: 'top' });

  const toggleGuarantor1 = () => setVisibleGuarantor1((prev) => !prev);
  const toggleGuarantor2 = () => setVisibleGuarantor2((prev) => !prev);

  const submitGuarantor = (index) => {
    const g = index === 1 ? guarantor1 : guarantor2;
    if (!g.fs) return notification(t('guarantor_fullname_required'));
    if (!g.rs) return notification(t('guarantor_relationship_required'));
    if (!g.pn) return notification(t('guarantor_phone_required'));

    index === 1
      ? setGuarantor1({ ...g, status: true }) || setVisibleGuarantor1(false)
      : setGuarantor2({ ...g, status: true }) || setVisibleGuarantor2(false);
  };

  const dropdownData = useMemo(
    () => agents.map((a) => ({ label: a.name, value: a.id.toString() })),
    [agents]
  );

  // ------------------ RENDER ------------------
  return (
    <>
      <HeaderTab title={t('loan_application')} />
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <Spinner visible={isLoading} textContent="Loading..." textStyle={{ color: '#FFF' }} />

        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.container}>
            {/* ---- TOP SECTION ---- */}
            <View style={styles.topView}>
              <Text style={styles.amountText}>{totalAmount.toLocaleString()} TZS</Text>
              <Text style={styles.amountSubText}>{t('total_loan_amount')}</Text>
            </View>

            {/* ---- LOAN DETAILS ---- */}
            <View style={styles.middleView}>
              <Text style={styles.headerMiddleView}>{t('loan_detail')}</Text>

              <DetailRow label={loan_type == 2 ? t('request_loan') : t('request_amount')} value={`${request_amount.toLocaleString()} TZS`} />
              {loan_type == 2 && (
                <DetailRow label={t('initial_deposit')} value={`${initial_deposit.toLocaleString()} TZS`} />
              )}
              <DetailRow label={t('plan')} value={`${plan} ${t('month')}`} />
              <DetailRow label={t('start_date')} value={startDate} />
              <DetailRow label={t('expected_date')} value={endDate} />
              <DetailRow label={t('interest')} value={interest} />
              <DetailRow label={t('fee_charges')} value={charges} />
              <DetailRow label={t('late_payment')} value={latePayment} />

              {device_name && loan_type == 2 && (
                <DetailRow label={t('device')} value={device_name} />
              )}
            </View>

            {/* ---- GUARANTORS ---- */}
            <Text style={styles.guarantorHeader}>{t('guarantors')}</Text>
            <GuarantorButton
              added={guarantor1.status}
              label={t('add_guarantor')}
              onPress={toggleGuarantor1}
            />
            <GuarantorButton
              added={guarantor2.status}
              label={`${t('add_guarantor')} 2`}
              onPress={toggleGuarantor2}
              marginTop={30}
            />

            {/* ---- AGENT ---- */}
            <View style={{ margin: 10 }}>
              <Text style={styles.guarantorHeader}>{t('college_agent')}</Text>
              <Dropdown
                style={styles.dropdown}
                data={dropdownData}
                search
                labelField="label"
                valueField="value"
                placeholder={t('select_agent')}
                searchPlaceholder="Search..."
                value={agentValue}
                onChange={(item) => setAgentValue(item.value)}
                renderRightIcon={() => <AntDesign color="black" name="down" size={12} />}
              />
            </View>

            {/* ---- SUBMIT BUTTON ---- */}
            <View style={{ paddingHorizontal: 10, marginTop: 15 }}>
              <IconButton icon="arrow-circle-right" name={t('confirm_loan_application')} onPress={loanApplication} />
            </View>
          </View>

          {/* ---- GUARANTOR MODALS ---- */}
          <GuarantorBottomSheet
            visible={visibleGuarantor1}
            onClose={toggleGuarantor1}
            title={t('loan_guarantor')}
            guarantor={guarantor1}
            setGuarantor={setGuarantor1}
            onSubmit={() => submitGuarantor(1)}
          />
          <GuarantorBottomSheet
            visible={visibleGuarantor2}
            onClose={toggleGuarantor2}
            title={`${t('loan_guarantor')} 2`}
            guarantor={guarantor2}
            setGuarantor={setGuarantor2}
            onSubmit={() => submitGuarantor(2)}
          />
        </ScrollView>
      </SafeAreaView>
      <Footer />
    </>
  );
};

// ------------------ SUB COMPONENTS ------------------

const DetailRow = ({ label, value }) => (
  <View style={styles.subMiddleView}>
    <Text style={styles.leftSubMiddleText}>{label}</Text>
    <Text style={styles.leftSubtitle}>{value}</Text>
  </View>
);

const GuarantorButton = ({ added, label, onPress, marginTop = 0 }) => (
  <TouchableOpacity activeOpacity={0.9} style={[styles.guarantorView, { marginTop }]} onPress={onPress}>
    <View style={styles.guarantorSubView}>
      <Text style={styles.headerGuarantorView}>{added ? 'Added' : label}</Text>
      <Icon
        name={added ? 'check' : 'plus-circle'}
        type="font-awesome"
        size={added ? 25 : 20}
        color={added ? '#198754' : '#272F3B'}
      />
    </View>
  </TouchableOpacity>
);

const GuarantorBottomSheet = ({ visible, onClose, title, guarantor, setGuarantor, onSubmit }) => (
  <BottomSheet visible={visible} onBackButtonPress={onClose} onBackdropPress={onClose}>
    <View style={styles.bottomNavigationView}>
      <View style={{ margin: 10 }}>
        <Text style={styles.bottomSheetTitle}>{title}</Text>
        <FormInput label="Full Name" value={guarantor.fs} onChangeText={(text) => setGuarantor({ ...guarantor, fs: text })} />
        <FormInput label="Relationship" value={guarantor.rs} onChangeText={(text) => setGuarantor({ ...guarantor, rs: text })} />
        <FormInput label="Phone Number" value={guarantor.pn} onChangeText={(text) => setGuarantor({ ...guarantor, pn: text })} />
        <View style={{ marginTop: 20 }}>
          <IconButton icon="arrow-circle-right" name="Submit Guarantor" onPress={onSubmit} />
        </View>
      </View>
    </View>
  </BottomSheet>
);

// ------------------ STYLES ------------------

const styles = StyleSheet.create({
  scrollViewContent: { flexGrow: 1 },
  container: { flex: 1 },
  topView: {
    backgroundColor: '#272F3B',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -60,
    height: Dimensions.get('window').height * 0.35,
  },
  amountText: { fontSize: 40, fontWeight: 'bold', color: '#fff' },
  amountSubText: { fontSize: 18, fontWeight: '500', color: '#fff', textAlign: 'center' },
  middleView: {
    backgroundColor: '#fff',
    borderWidth: 0.3,
    marginHorizontal: 10,
    marginTop: -80,
    padding: 10,
    borderRadius: 10,
    borderColor: 'grey',
  },
  headerMiddleView: { fontSize: 18, fontWeight: '500', textAlign: 'center' },
  subMiddleView: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 2 },
  leftSubMiddleText: { fontSize: 13, fontWeight: '500', color: '#000' },
  leftSubtitle: { fontSize: 11, fontWeight: '400' },
  guarantorView: { backgroundColor: 'rgba(7,133,134,0.1)', alignItems: 'center', height: 60, justifyContent: 'center' },
  guarantorSubView: { flexDirection: 'row', gap: 10, alignItems: 'center' },
  headerGuarantorView: { fontSize: 14, fontWeight: 'bold', color: '#272F3B' },
  guarantorHeader: { marginTop: 10, marginLeft: 10, fontSize: 16, fontWeight: 'bold', color: '#272F3B' },
  dropdown: { height: 50, borderWidth: 1, borderColor: '#272F3B', borderRadius: 10, padding: 10, marginTop: 10 },
  bottomNavigationView: {
    backgroundColor: '#fff',
    height: Dimensions.get('window').height * 0.6,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  bottomSheetTitle: { textAlign: 'center', padding: 10, fontSize: 20, fontWeight: 'bold', color: '#272F3B' },
});

export default LoanApplicationScreen;
