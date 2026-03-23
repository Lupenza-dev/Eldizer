import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { useContext } from 'react'
import { colors } from '../utils/GlobalStyles'
import { Icon } from 'react-native-elements'
import { AuthContext } from '../context/AuthContext'
import { useLanguage } from '../utils/LanguageContext'

const { width } = Dimensions.get('window')

const CoinCard = () => {
    const { customerName, email, outstandingAmount } = useContext(AuthContext)
    const { t } = useLanguage()
    
    return (
        <View style={styles.container}>
            <View style={styles.card}>
                {/* Header with user info */}
                <View style={styles.header}>
                    <View style={styles.userInfo}>
                        <View style={styles.userRow}>
                            <View style={styles.iconWrapper}>
                                <Icon name='user' type='antdesign' color={colors.white} size={16}/>
                            </View>
                            <Text style={styles.userName}>{customerName}</Text>
                        </View>
                        <View style={styles.emailRow}>
                            <View style={styles.iconWrapper}>
                                <Icon name='mail' type='antdesign' color={colors.white} size={14}/>
                            </View>
                            <Text style={styles.userEmail}>{email}</Text>
                        </View>
                    </View>
                    
                    {/* Decorative element */}
                    {/* <View style={styles.decorativeCircle} /> */}
                </View>
                
                {/* Outstanding amount section */}
                <View style={styles.amountSection}>
                    <View style={styles.amountContainer}>
                        <Text style={styles.amountLabel}>{t('outstanding_amount')}</Text>
                        <Text style={styles.amountValue}>{outstandingAmount}</Text>
                    </View>
                    
                    {/* Gradient overlay effect */}
                    <View style={styles.gradientOverlay} />
                </View>
            </View>
        </View>
    )
}

export default CoinCard

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    card: {
        backgroundColor: colors.primary,
        borderRadius: 16,
        padding: 20,
        minHeight: 140,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 6,
        position: 'relative',
        overflow: 'hidden',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    userInfo: {
        flex: 1,
        zIndex: 2,
    },
    userRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    emailRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconWrapper: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    userName: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '700',
        flex: 1,
    },
    userEmail: {
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: 14,
        fontWeight: '400',
        flex: 1,
    },
    decorativeCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        position: 'absolute',
        right: -20,
        top: -20,
    },
    amountSection: {
        position: 'relative',
        zIndex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    amountContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        borderRadius: 12,
        padding: 16,
        backdropFilter: 'blur(10)',
        alignItems: 'center',
        minWidth: '80%',
    },
    amountLabel: {
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: 12,
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginBottom: 4,
    },
    amountValue: {
        color: '#ffffff',
        fontSize: 28,
        fontWeight: '800',
        letterSpacing: -0.5,
    },
    gradientOverlay: {
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        width: '40%',
        backgroundGradient: {
            colors: ['transparent', 'rgba(0, 0, 0, 0.1)'],
            start: { x: 0, y: 0 },
            end: { x: 1, y: 0 },
        },
    },
})