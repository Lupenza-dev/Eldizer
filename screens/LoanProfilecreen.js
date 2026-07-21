import { View, Text, SafeAreaView, StyleSheet, ScrollView, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderTab from '../components/HeaderTab'
import { Icon } from 'react-native-elements'
import { useRoute } from '@react-navigation/native'

const { width } = Dimensions.get('window');

const LoanProfilecreen = () => {
    const [loan, setLoan] = useState({});
    const route = useRoute();
    const { contract } = route.params;

    useEffect(() => {
        setLoan(contract);
    }, [contract]);

    return (
        <>
            <HeaderTab title="Loan Profile" />
            <SafeAreaView style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {/* Loan Summary Card */}
                    <View style={styles.card}>
                        <View style={styles.cardHeader}>
                            <Icon
                                name="account-balance"
                                type="material"
                                size={24}
                                color="#1f2937"
                            />
                            <Text style={styles.cardTitle}>Loan Summary</Text>
                        </View>
                        <View style={styles.cardContent}>
                            <DetailRow label="Loan Code" value={loan.contract_code} />
                            <DetailRow label="Loan Type" value="Cash Loan" />
                            <DetailRow label="Start Date" value={loan.loan_start_date} />
                            <DetailRow label="Expected End Date" value={loan.loan_end_date} />
                            <DetailRow label="Request Amount" value={loan.request_amount} />
                            <DetailRow label="Total Loan Repayment" value={loan.loan_amount} />
                            <DetailRow label="Plan" value={loan.plan} />
                            <DetailRow label="Single Installment At Maturity" value={loan.installment_amount} />
                            <DetailRow label="Interest Rate" value={loan.interest_rate} />
                            <DetailRow label="Fees and Charges" value={loan.fee_charges} />
                            <DetailRow label="Late Payment" value={loan.late_charges} />
                        </View>
                    </View>

                    {/* Payment Status Cards */}
                    <View style={styles.paymentContainer}>
                        <View style={styles.paymentCard}>
                            <View style={styles.paymentIcon}>
                                <Icon
                                    name="check-circle"
                                    type="material"
                                    size={28}
                                    color="#059669"
                                />
                            </View>
                            <View style={styles.paymentContent}>
                                <Text style={styles.paymentLabel}>Total Paid</Text>
                                <Text style={styles.paymentAmount}>{loan.current_balance}</Text>
                            </View>
                        </View>
                        <View style={styles.paymentCard}>
                            <View style={styles.paymentIcon}>
                                <Icon
                                    name="warning"
                                    type="material"
                                    size={28}
                                    color="#dc2626"
                                />
                            </View>
                            <View style={styles.paymentContent}>
                                <Text style={styles.paymentLabel}>Outstanding Amount</Text>
                                <Text style={styles.paymentAmount}>{loan.outstanding_amount}</Text>
                            </View>
                        </View>
                    </View>

                    {/* Agent Details Card */}
                    <View style={styles.card}>
                        <View style={styles.cardHeader}>
                            <Icon
                                name="person"
                                type="material"
                                size={24}
                                color="#1f2937"
                            />
                            <Text style={styles.cardTitle}>Agent Details</Text>
                        </View>
                        <View style={styles.cardContent}>
                            <DetailRow label="Agent Name" value={loan.agent_name ?? "N/A"} />
                            <DetailRow label="Agent College" value={loan.college ?? "N/A"} />
                            <DetailRow label="Agent Phone" value={loan.agent_phone ?? "N/A"} />
                            <DetailRow label="Attended Date" value={loan.attended_date ?? "N/A"} />
                        </View>
                    </View>

                    {/* Guarantor Details Card */}
                    <View style={styles.card}>
                        <View style={styles.cardHeader}>
                            <Icon
                                name="shield"
                                type="material"
                                size={24}
                                color="#1f2937"
                            />
                            <Text style={styles.cardTitle}>Guarantor Details</Text>
                        </View>
                        <View style={styles.cardContent}>
                            <DetailRow label="Full Name" value={loan.guarantor_name ?? "N/A"} />
                            <DetailRow label="Phone Number" value={loan.guarantor_phone ?? "N/A"} />
                            <DetailRow label="Relationship" value={loan.guarantor_relation ?? "N/A"} />
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    )
}

const DetailRow = ({ label, value }) => (
    <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>{label}</Text>
        <Text style={styles.detailValue}>{value}</Text>
    </View>
);

export default LoanProfilecreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    card: {
        margin: 16,
        marginTop: 20,
        backgroundColor: '#ffffff',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 4,
        borderWidth: 1,
        borderColor: '#f3f4f6',
        overflow: 'hidden',
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        paddingBottom: 12,
        backgroundColor: '#fafbfc',
        borderBottomWidth: 1,
        borderBottomColor: '#f3f4f6',
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111827',
        marginLeft: 12,
    },
    cardContent: {
        padding: 16,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f8fafc',
    },
    detailLabel: {
        fontSize: 15,
        fontWeight: '500',
        color: '#374151',
        flex: 1,
        marginRight: 16,
    },
    detailValue: {
        fontSize: 15,
        fontWeight: '600',
        color: '#111827',
        textAlign: 'right',
        flex: 1,
    },
    paymentContainer: {
        flexDirection: 'row',
        marginHorizontal: 16,
        marginTop: 8,
        gap: 12,
    },
    paymentCard: {
        flex: 1,
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 4,
        borderWidth: 1,
        borderColor: '#f3f4f6',
        flexDirection: 'row',
        alignItems: 'center',
    },
    paymentIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#f8fafc',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    paymentContent: {
        flex: 1,
    },
    paymentLabel: {
        fontSize: 13,
        fontWeight: '500',
        color: '#6b7280',
        marginBottom: 4,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    paymentAmount: {
        fontSize: 16,
        fontWeight: '700',
        color: '#111827',
    },
})