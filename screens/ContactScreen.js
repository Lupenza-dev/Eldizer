import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Linking, ScrollView } from 'react-native'
import React from 'react'
import HeaderTab from '../components/HeaderTab'
import { Icon } from 'react-native-elements'
import { colors } from '../utils/GlobalStyles'

const ContactScreen = () => {
  const contactInfo = [
    {
      id: 1,
      title: 'Office Location',
      description: 'Dodoma, Tanzania',
      icon: 'location-pin',
      type: 'entypo',
      action: () => {
        // Open maps with the office location
        const url = 'https://maps.google.com';
        Linking.openURL(url);
      }
    },
    {
      id: 2,
      title: 'Call Us',
      description: '+255 787 971 971',
      icon: 'phone',
      type: 'font-awesome',
      action: () => {
        // Initiate phone call
        const phoneNumber = 'tel:+255787971971';
        Linking.openURL(phoneNumber);
      }
    },
    {
      id: 3,
      title: 'Email Us',
      description: 'info@eldizerfinance.co.tz',
      icon: 'email',
      type: 'material-community',
      action: () => {
        // Open email client
        const email = 'mailto:info@eldizerfinance.co.tz';
        Linking.openURL(email);
      }
    },
    {
      id: 4,
      title: 'Working Hours',
      description: 'Monday - Friday: 8:00 AM - 5:00 PM\nSaturday: 9:00 AM - 1:00 PM\nSunday: Closed',
      icon: 'clock-time-four-outline',
      type: 'material-community',
      action: null
    }
  ];

  return (
    <>
      <HeaderTab title="Contact Us" />
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Get in Touch</Text>
            <Text style={styles.subHeaderText}>We'd love to hear from you. Here's how you can reach us.</Text>
          </View>

          <View style={styles.contactContainer}>
            {contactInfo.map((item) => (
              <TouchableOpacity 
                key={item.id} 
                style={styles.contactCard}
                onPress={item.action}
                activeOpacity={item.action ? 0.7 : 1}
              >
                <View style={styles.iconContainer}>
                  <Icon 
                    name={item.icon}
                    type={item.type}
                    size={30}
                    color={colors.primary}
                  />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.contactTitle}>{item.title}</Text>
                  <Text style={styles.contactDescription}>
                    {item.description.split('\n').map((line, i) => (
                      <Text key={i}>
                        {line}
                        {i < item.description.split('\n').length - 1 ? '\n' : ''}
                      </Text>
                    ))}
                  </Text>
                </View>
                {item.action && (
                  <Icon 
                    name="chevron-right"
                    type="feather"
                    size={20}
                    color="#888"
                    style={styles.arrowIcon}
                  />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    padding: 20,
    paddingBottom: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 8,
  },
  subHeaderText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  contactContainer: {
    padding: 15,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    backgroundColor: 'rgba(44, 62, 80, 0.1)',
    borderRadius: 12,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: 4,
  },
  contactDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  arrowIcon: {
    marginLeft: 10,
  },
});

export default ContactScreen