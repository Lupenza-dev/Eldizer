import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { colors } from '../utils/GlobalStyles'
import { Icon } from 'react-native-elements'
import { AuthContext } from '../context/AuthContext'
import { useLanguage } from '../utils/LanguageContext'

const CoinCard = () => {
    const {customerName,email} =useContext(AuthContext);
    const {t} =useLanguage();
  return (
    <View style={{ paddingHorizontal: 10}}>
        <View style={styles.topContainer} >
            <View style={styles.iconContainer}>
                <View>
                <View style={styles.nameContainer}>
                    <Icon name='user' type='antdesign' color={colors.white} size={15}/>
                    <Text style={{ color: '#ffff',fontSize: 16, fontWeight: 'bold'}}>{customerName}</Text>
                </View>
                <View style={styles.nameContainer}>
                    <Icon name='mail' type='antdesign' color={colors.white} size={15}/>
                    <Text style={{ color: '#ffff', fontSize: 14, fontWeight: '400'}}>{email}</Text>
                </View>
                </View>
                
                <Text style={{ color: '#ffff'}}>Logo</Text>
            </View>
            <View style={styles.coinTextContainer}>
                <Text style={styles.CardSubText}>{t('outstanding_amount')}</Text>
                <Text style={styles.coinText}>350,000</Text>
            </View>
        </View>
        {/* <View style={styles.coinContainer}>
            <View style={styles.insideContainer}>
            <View style={styles.coinBox}>
                <Text style={styles.coinBoxText}>Nunua{'\n'} Coin</Text>
            </View>
            <View style={styles.coinBox}>
                <Text style={styles.coinBoxText}>Lipia {'\n'} Huduma</Text>
            </View>
            <View style={styles.coinBox}>
                <Text style={styles.coinBoxText}>Toa {'\n'} Pesa</Text>
            </View>
            </View>
            
        </View> */}
    </View>
  )
}

export default CoinCard

const styles = StyleSheet.create({
    topContainer:{
        backgroundColor: colors.primary,
        marginTop: 5,
        paddingHorizontal: 10,
        height: 170,
        borderRadius: 10,
        paddingVertical: 10
    },
    iconContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    coinContainer:{
        flex:1,
        alignItems: 'center',
        marginTop: -40
    },
    coinBox:{
        borderWidth: 1,
        height: 70,
        width: 100,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },
    insideContainer:{
        flexDirection: 'row',
        gap: 5,
        backgroundColor: '#fff',
        padding: 10,
        height: 80,
        borderRadius: 10
    },
    coinText:{
        fontWeight: 'bold',
        fontSize: 30,
        color: colors.white
    },
    coinTextContainer:{
        position: 'absolute',
        bottom: '30%',
        left: 120
    },
    coinBoxText:{
        fontWeight: 'bold',
        fontSize: 15
    },
    nameContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },
    CardSubText:{
        color: '#fff',
        fontSize: 13,
        fontWeight: 'bold'
    }
})