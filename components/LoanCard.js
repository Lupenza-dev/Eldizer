import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import {Icon } from 'react-native-elements'; 
import { useNavigation, useNavigationState, useRoute } from '@react-navigation/native';

const LoanCard = (props) => {
    const loan = props.data;
    const [borderColor, setBorderColor] = useState({});
    const [textColor, setTextColor] = useState({});
    const navigation = useNavigation();

    const handleLoanClick = (has_contract, contract, loan) => {
        if (has_contract == "Yes") {
            navigation.navigate('LoanProfilecreen', { contract: contract, });
        } else {
            navigation.navigate('ApplicationScreen', { loan: loan });
        }
    }

    useEffect(() => {
        const level = loan.level;
        if (level == "GRANTED") {
            setTextColor({ color: '#059669' });
            setBorderColor({ borderColor: "#059669", backgroundColor: '#f0fdf4' });
        }
        if (level == "Cancelled" || level == "Rejected by Agent" || level == "Rejected by Admin" || level == "Default") {
            setTextColor({ color: '#dc2626' });
            setBorderColor({ borderColor: "#dc2626", backgroundColor: '#fef2f2' });
        }
    }, []);

    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.8} onPress={() => handleLoanClick(loan.has_contract, loan.contract, loan)}>
            <View style={styles.card}>
                {/* Header Section */}
                <View style={styles.header}>
                    <View style={styles.iconContainer}>
                        <Icon
                            name="briefcase"
                            type="font-awesome"
                            size={24}
                            color="#1f2937"
                        />
                    </View>
                    <View style={styles.headerContent}>
                        <Text style={styles.loanType}>Personal Loan</Text>
                        <Text style={styles.loanId}>#{loan.loan_code}</Text>
                    </View>
                    <View style={[styles.statusBadge, borderColor]}>
                        <Text style={[styles.statusText, textColor]}>{loan.level}</Text>
                    </View>
                </View>

                {/* Divider */}
                <View style={styles.divider} />

                {/* Details Section */}
                <View style={styles.detailsSection}>
                    <View style={styles.detailRow}>
                        <View style={styles.detailItem}>
                            <Text style={styles.detailLabel}>Amount</Text>
                            <Text style={styles.detailValue}>TZS {loan.amount.toLocaleString()}</Text>
                        </View>
                        <View style={styles.detailItem}>
                            <Text style={styles.detailLabel}>Application Date</Text>
                            <Text style={styles.detailValue}>{loan.application_date}</Text>
                        </View>
                    </View>
                </View>

                {/* Footer Section */}
                <View style={styles.footer}>
                    <View style={styles.totalAmountContainer}>
                        <Text style={styles.totalAmountLabel}>Total Amount</Text>
                        <Text style={styles.totalAmountValue}>TZS {loan.loan_amount.toLocaleString()}</Text>
                    </View>
                    <Icon
                        name="chevron-right"
                        type="font-awesome"
                        size={16}
                        color="#6b7280"
                    />
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default LoanCard

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 16,
        marginVertical: 8,
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 4,
        borderWidth: 1,
        borderColor: '#f3f4f6',
        overflow: 'hidden',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        paddingBottom: 12,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#f8fafc',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    headerContent: {
        flex: 1,
    },
    loanType: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 2,
    },
    loanId: {
        fontSize: 14,
        color: '#6b7280',
        fontWeight: '500',
    },
    statusBadge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 100,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    divider: {
        height: 1,
        backgroundColor: '#f3f4f6',
        marginHorizontal: 16,
    },
    detailsSection: {
        padding: 16,
        paddingTop: 12,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    detailItem: {
        flex: 1,
        alignItems: 'center',
    },
    detailLabel: {
        fontSize: 12,
        color: '#6b7280',
        fontWeight: '500',
        marginBottom: 4,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    detailValue: {
        fontSize: 16,
        color: '#111827',
        fontWeight: '600',
        textAlign: 'center',
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        paddingTop: 12,
        backgroundColor: '#fafbfc',
    },
    totalAmountContainer: {
        flex: 1,
    },
    totalAmountLabel: {
        fontSize: 12,
        color: '#6b7280',
        fontWeight: '500',
        marginBottom: 2,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    totalAmountValue: {
        fontSize: 20,
        color: '#111827',
        fontWeight: '700',
    },
})