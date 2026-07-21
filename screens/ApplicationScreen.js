import { View, Text, SafeAreaView, ScrollView, StyleSheet, Dimensions } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import HeaderTab from '../components/HeaderTab'
import { Icon } from 'react-native-elements'; 
import { useRoute } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';

const { width } = Dimensions.get('window');

const ApplicationScreen = () => {
    const [data, setData] = useState({});
    const route = useRoute();
    const { loan } = route.params;
    const {customer} =useContext(AuthContext);

    useEffect(() => {
        setData(loan);
    }, [loan]);

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'granted':
                return { backgroundColor: '#f0fdf4', borderColor: '#059669', textColor: '#059669' };
            case 'cancelled':
            case 'rejected by agent':
            case 'rejected by admin':
            case 'default':
                return { backgroundColor: '#fef2f2', borderColor: '#dc2626', textColor: '#dc2626' };
            default:
                return { backgroundColor: '#fef3c7', borderColor: '#d97706', textColor: '#d97706' };
        }
    };

    const statusStyle = getStatusColor(data.level);

    return (
        <>
            <HeaderTab title="Loan Application Progress"/>
            <SafeAreaView style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {/* Status Card */}
                    <View style={styles.statusCard}>
                        <View style={styles.statusHeader}>
                            <Text style={styles.statusTitle}>Application Status</Text>
                            <Icon
                                name="infocirlceo"
                                type="antdesign"
                                size={20}
                                color="#6b7280"
                            />
                        </View>
                        <View style={[styles.statusBadge, { backgroundColor: statusStyle.backgroundColor, borderColor: statusStyle.borderColor }]}>
                            <Text style={[styles.statusText, { color: statusStyle.textColor }]}>
                                {data.level || 'Pending'}
                            </Text>
                        </View>
                    </View>

                    {/* Loan Details Card */}
                    <View style={styles.card}>
                        <View style={styles.cardHeader}>
                            <Icon
                                name="description"
                                type="material"
                                size={24}
                                color="#1f2937"
                            />
                            <Text style={styles.cardTitle}>Loan Details</Text>
                        </View>
                        <View style={styles.cardContent}>
                            <DetailRow label="Request Amount" value={data.amount} />
                            <DetailRow label="Total Loan Repayment" value={data.loan_amount} />
                            <DetailRow label="Plan" value={data.plan} />
                            <DetailRow label="Single Installment At Maturity" value={data.installment_amount} />
                            <DetailRow label="Interest Rate" value={data.interest_rate} />
                            <DetailRow label="Fees and Charges" value={data.fee_charges} />
                            <DetailRow label="Late Payment" value={data.late_charges} />
                            <DetailRow label="Start Date" value={data.application_date} />
                            <DetailRow label="End Date" value={data.loan_end_date} />
                        </View>
                    </View>

                    {/* Agent Details Card */}
                    {
                        customer.customer_type == 1 &&(
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
                            <DetailRow label="Agent Name" value={data.agent ?? "N/A"} />
                            <DetailRow label="Agent Phone" value={data.agent_phone} />
                            <DetailRow label="Attended Date" value={data.agent_attended_date} />
                        </View>
                        <View style={styles.remarkSection}>
                            <Text style={styles.remarkLabel}>Loan Remark</Text>
                            <View style={styles.remarkContainer}>
                                <Text style={styles.remarkText}>
                                    {data.agent_remark ?? "No remarks available"}
                                </Text>
                            </View>
                        </View>
                    </View>
                        )
                    }
                   
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

export default ApplicationScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    statusCard: {
        margin: 16,
        marginTop: 20,
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 20,
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
    },
    statusHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    statusTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111827',
    },
    statusBadge: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 8,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    statusText: {
        fontSize: 16,
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    card: {
        margin: 16,
        marginTop: 8,
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
    remarkSection: {
        padding: 16,
        paddingTop: 0,
    },
    remarkLabel: {
        fontSize: 15,
        fontWeight: '500',
        color: '#374151',
        marginBottom: 8,
    },
    remarkContainer: {
        backgroundColor: '#f8fafc',
        borderRadius: 8,
        padding: 12,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        minHeight: 80,
    },
    remarkText: {
        fontSize: 14,
        color: '#4b5563',
        lineHeight: 20,
    },
})