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

    const initials = (customerName ?? '')
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map(word => word[0].toUpperCase())
        .join('')

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                {/* Decorative background circles */}
                <View style={styles.decorativeCircle} />
                <View style={styles.decorativeCircleSmall} />

                {/* Header with user info */}
                <View style={styles.header}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>{initials || <Icon name='user' type='antdesign' color={colors.white} size={22}/>}</Text>
                    </View>
                    <View style={styles.userInfo}>
                        <Text style={styles.greeting}>Welcome back,</Text>
                        <Text style={styles.userName} numberOfLines={1}>{customerName}</Text>
                        <View style={styles.emailRow}>
                            <Icon name='mail' type='antdesign' color='rgba(255, 255, 255, 0.7)' size={12}/>
                            <Text style={styles.userEmail} numberOfLines={1}>{email}</Text>
                        </View>
                    </View>
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
        borderRadius: 20,
        padding: 20,
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
        alignItems: 'center',
        zIndex: 2,
    },
    avatar: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: 'rgba(255, 255, 255, 0.18)',
        borderWidth: 1.5,
        borderColor: 'rgba(255, 255, 255, 0.35)',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 14,
    },
    avatarText: {
        color: '#ffffff',
        fontSize: 20,
        fontWeight: '700',
        letterSpacing: 1,
    },
    userInfo: {
        flex: 1,
        zIndex: 2,
    },
    greeting: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 12,
        fontWeight: '500',
        textTransform: 'uppercase',
        letterSpacing: 0.8,
        marginBottom: 2,
    },
    emailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginTop: 4,
    },
    userName: {
        color: '#ffffff',
        fontSize: 19,
        fontWeight: '700',
    },
    userEmail: {
        color: 'rgba(255, 255, 255, 0.85)',
        fontSize: 13,
        fontWeight: '400',
        flex: 1,
    },
    decorativeCircle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        position: 'absolute',
        right: -30,
        top: -40,
    },
    decorativeCircleSmall: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: 'rgba(255, 255, 255, 0.06)',
        position: 'absolute',
        right: 40,
        bottom: -30,
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