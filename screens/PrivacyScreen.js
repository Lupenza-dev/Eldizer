import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Dimensions,
  SafeAreaView
} from 'react-native';
import { Icon } from 'react-native-elements';
import HeaderTab from '../components/HeaderTab';

const { width } = Dimensions.get('window');

const PrivacyScreen = () => {
  const [activeSections, setActiveSections] = useState({});

  const toggleSection = (section) => {
    setActiveSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const openLink = (url) => {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  const openEmail = () => {
    Linking.openURL('mailto:eldizerfinanciallimited@gmail.com');
  };

  const openPhone = () => {
    Linking.openURL('tel:+255787971971');
  };

  const renderSectionHeader = (title, key) => (
    <TouchableOpacity 
      style={styles.sectionHeader} 
      onPress={() => toggleSection(key)}
      activeOpacity={0.7}
    >
      <Text style={styles.sectionHeaderText}>{title}</Text>
      <Icon 
        name={activeSections[key] ? "up" : "down"} 
        type="antdesign" 
        size={16} 
        color="#2c3e50" 
      />
    </TouchableOpacity>
  );

  const renderSectionContent = (content, key) => {
    if (!activeSections[key]) return null;
    
    return (
      <View style={styles.sectionContent}>
        {content}
      </View>
    );
  };

  return (
    <>
    <HeaderTab title="Privacy Policy" />
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>Privacy Policy</Text>
        <Text style={styles.lastUpdated}>Last updated: November 24, 2023</Text>
        
        <Text style={styles.intro}>
          This Privacy Policy describes Our policies and procedures on the collection, 
          use and disclosure of Your information when You use the Service and tells You 
          about Your privacy rights and how the law protects You.
        </Text>

        {/* Interpretation and Definitions */}
        {renderSectionHeader('Interpretation and Definitions', 'definitions')}
        {renderSectionContent(
          <View>
            <Text style={styles.subheading}>Interpretation</Text>
            <Text style={styles.paragraph}>
              The words of which the initial letter is capitalized have meanings defined 
              under the following conditions. The following definitions shall have the 
              same meaning regardless of whether they appear in singular or in plural.
            </Text>
            
            <Text style={styles.subheading}>Definitions</Text>
            <Text style={styles.paragraph}>
              For the purposes of this Privacy Policy:
            </Text>
            <Text style={styles.bullet}><Text style={styles.bold}>Account</Text> means a unique account created for You to access our Service.</Text>
            <Text style={styles.bullet}><Text style={styles.bold}>Affiliate</Text> means an entity that controls, is controlled by or is under common control with a party.</Text>
            <Text style={styles.bullet}><Text style={styles.bold}>Application</Text> refers to the Chuocredit app, owned by El-dizer Financial Service.</Text>
            <Text style={styles.bullet}><Text style={styles.bold}>Company</Text> refers to El-Dizer Financial Services, Head Office, Zahanati Street, Plot no.28 Kikuyu West, Near St. John University of Tanzania, P.O. Box 1249, Dodoma – Tanzania</Text>
            <Text style={styles.bullet}><Text style={styles.bold}>Country</Text> refers to: Tanzania</Text>
            <Text style={styles.bullet}><Text style={styles.bold}>Device</Text> means any device that can access the Service.</Text>
            <Text style={styles.bullet}><Text style={styles.bold}>Personal Data</Text> is any information that relates to an identified or identifiable individual.</Text>
            <Text style={styles.bullet}><Text style={styles.bold}>Service</Text> refers to the Application.</Text>
            <Text style={styles.bullet}><Text style={styles.bold}>Service Provider</Text> means any natural or legal person who processes the data on behalf of the Company.</Text>
            <Text style={styles.bullet}><Text style={styles.bold}>Usage Data</Text> refers to data collected automatically.</Text>
            <Text style={styles.bullet}><Text style={styles.bold}>You</Text> means the individual accessing or using the Service.</Text>
          </View>,
          'definitions'
        )}

        {/* Collecting and Using Your Personal Data */}
        {renderSectionHeader('Collecting and Using Your Personal Data', 'dataCollection')}
        {renderSectionContent(
          <View>
            <Text style={styles.subheading}>Types of Data Collected</Text>
            
            <Text style={styles.subheading}>Personal Data</Text>
            <Text style={styles.paragraph}>
              While using Our Service, We may ask You to provide Us with certain personally 
              identifiable information that can be used to contact, identify, or verify You. 
              Personally identifiable information may include, but is not limited to:
            </Text>
            <Text style={styles.bullet}>Email address</Text>
            <Text style={styles.bullet}>First name and last name</Text>
            <Text style={styles.bullet}>University name</Text>
            <Text style={styles.bullet}>Phone number</Text>
            <Text style={styles.bullet}>Student Identification Number</Text>
            <Text style={styles.bullet}>National Identification Number (NIN)</Text>
            <Text style={styles.bullet}>Bank account details</Text>
            <Text style={styles.bullet}>Guarantors Details</Text>
            <Text style={styles.bullet}>Hospital name</Text>
            
            <Text style={styles.subheading}>Usage Data</Text>
            <Text style={styles.paragraph}>
              Usage Data is collected automatically when using the Service and may include:
            </Text>
            <Text style={styles.bullet}>Your Device's Internet Protocol address (IP address)</Text>
            <Text style={styles.bullet}>Browser type and version</Text>
            <Text style={styles.bullet}>The pages of our Service that You visit</Text>
            <Text style={styles.bullet}>Time and date of Your visit</Text>
            <Text style={styles.bullet}>Time spent on those pages</Text>
            <Text style={styles.bullet}>Unique device identifiers</Text>
            <Text style={styles.bullet}>Other diagnostic data</Text>
            
            <Text style={styles.paragraph}>
              When You access the Service by or through a mobile device, We may collect certain 
              information automatically, including:
            </Text>
            <Text style={styles.bullet}>The type of mobile device You use</Text>
            <Text style={styles.bullet}>Your mobile device's unique ID</Text>
            <Text style={styles.bullet}>The IP address of Your mobile device</Text>
            <Text style={styles.bullet}>Your mobile operating system</Text>
            <Text style={styles.bullet}>The type of mobile Internet browser You use</Text>
            <Text style={styles.bullet}>Unique device identifiers and other diagnostic data</Text>
            
            <Text style={styles.subheading}>Information Collected while Using the Application</Text>
            <Text style={styles.paragraph}>
              While using Our Application, in order to provide features of Our Application, 
              We may collect, with Your prior permission:
            </Text>
            <Text style={styles.bullet}>Information regarding your location (for fraud prevention and agent mapping)</Text>
            <Text style={styles.bullet}>Information from your Device's phone book (contacts list for guarantor and reference purposes)</Text>
            
            <Text style={styles.paragraph}>
              We use this information to provide features of Our Service, to improve and 
              customize Our Service, and to comply with financial regulations.
            </Text>
          </View>,
          'dataCollection'
        )}

        {/* Use of Your Personal Data */}
        {renderSectionHeader('Use of Your Personal Data', 'dataUse')}
        {renderSectionContent(
          <View>
            <Text style={styles.paragraph}>The Company may use Personal Data for the following purposes:</Text>
            <Text style={styles.bullet}>To manage Your Account and registration</Text>
            <Text style={styles.bullet}>For the performance of a contract</Text>
            <Text style={styles.bullet}>To contact You</Text>
            <Text style={styles.bullet}>To provide You with news, special offers and general information</Text>
            <Text style={styles.bullet}>To manage Your requests</Text>
            <Text style={styles.bullet}>For business transfers</Text>
            <Text style={styles.bullet}>For other purposes such as data analysis and improving our Service</Text>
          </View>,
          'dataUse'
        )}

        {/* Sharing Your Personal Data */}
        {renderSectionHeader('Sharing Your Personal Data', 'dataSharing')}
        {renderSectionContent(
          <View>
            <Text style={styles.paragraph}>We may share Your personal information in the following situations:</Text>
            <Text style={styles.bullet}>With Service Providers</Text>
            <Text style={styles.bullet}>For business transfers</Text>
            <Text style={styles.bullet}>With Affiliates</Text>
            <Text style={styles.bullet}>With business partners</Text>
            <Text style={styles.bullet}>With other users when You share information in public areas</Text>
            <Text style={styles.bullet}>With Your consent</Text>
          </View>,
          'dataSharing'
        )}

        {/* Retention of Your Personal Data */}
        {renderSectionHeader('Retention of Your Personal Data', 'dataRetention')}
        {renderSectionContent(
          <View>
            <Text style={styles.paragraph}>
              The Company will retain Your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. 
              We will retain and use Your Personal Data to the extent necessary to comply with our legal obligations, 
              resolve disputes, and enforce our legal agreements and policies.
            </Text>
            <Text style={styles.paragraph}>
              The Company will also retain Usage Data for internal analysis purposes. Usage Data is generally retained 
              for a shorter period of time, except when this data is used to strengthen the security or to improve the 
              functionality of Our Service, or We are legally obligated to retain this data for longer time periods.
            </Text>
          </View>,
          'dataRetention'
        )}

        {/* Transfer of Your Personal Data */}
        {renderSectionHeader('Transfer of Your Personal Data', 'dataTransfer')}
        {renderSectionContent(
          <View>
            <Text style={styles.paragraph}>
              Your information, including Personal Data, is processed at the Company's operating offices and in any other 
              places where the parties involved in the processing are located. It means that this information may be transferred 
              to — and maintained on — computers located outside of Your state, province, country or other governmental jurisdiction 
              where the data protection laws may differ than those from Your jurisdiction.
            </Text>
            <Text style={styles.paragraph}>
              Your consent to this Privacy Policy followed by Your submission of such information represents Your agreement to that transfer.
            </Text>
            <Text style={styles.paragraph}>
              The Company will take all steps reasonably necessary to ensure that Your data is treated securely and in accordance 
              with this Privacy Policy and no transfer of Your Personal Data will take place to an organization or a country unless 
              there are adequate controls in place including the security of Your data and other personal information.
            </Text>
          </View>,
          'dataTransfer'
        )}

        {/* Delete Your Personal Data */}
        {renderSectionHeader('Delete Your Personal Data', 'dataDeletion')}
        {renderSectionContent(
          <View>
            <Text style={styles.paragraph}>
              You have the right to delete or request that We assist in deleting the Personal Data that We have collected about You.
            </Text>
            <Text style={styles.paragraph}>
              Our Service may give You the ability to delete certain information about You from within the Service.
            </Text>
            <Text style={styles.paragraph}>
              You may update, amend, or delete Your information at any time by signing in to Your Account, if you have one, 
              and visiting the account settings section that allows you to manage Your personal information. You may also 
              contact Us to request access to, correct, or delete any personal information that You have provided to Us.
            </Text>
            <Text style={styles.paragraph}>
              Please note, however, that We may need to retain certain information when we have a legal obligation or lawful basis to do so.
            </Text>
          </View>,
          'dataDeletion'
        )}

        {/* Disclosure of Your Personal Data */}
        {renderSectionHeader('Disclosure of Your Personal Data', 'dataDisclosure')}
        {renderSectionContent(
          <View>
            <Text style={styles.subheading}>Business Transactions</Text>
            <Text style={styles.paragraph}>
              If the Company is involved in a merger, acquisition or asset sale, Your Personal Data may be transferred. 
              We will provide notice before Your Personal Data is transferred and becomes subject to a different Privacy Policy.
            </Text>
            
            <Text style={styles.subheading}>Law enforcement</Text>
            <Text style={styles.paragraph}>
              Under certain circumstances, the Company may be required to disclose Your Personal Data if required to do so by law 
              or in response to valid requests by public authorities (e.g. a court or a government agency).
            </Text>
            
            <Text style={styles.subheading}>Other legal requirements</Text>
            <Text style={styles.paragraph}>The Company may disclose Your Personal Data in the good faith belief that such action is necessary to:</Text>
            <Text style={styles.bullet}>Comply with a legal obligation</Text>
            <Text style={styles.bullet}>Protect and defend the rights or property of the Company</Text>
            <Text style={styles.bullet}>Prevent or investigate possible wrongdoing in connection with the Service</Text>
            <Text style={styles.bullet}>Protect the personal safety of Users of the Service or the public</Text>
            <Text style={styles.bullet}>Protect against legal liability</Text>
          </View>,
          'dataDisclosure'
        )}

        {/* Security of Your Personal Data */}
        {renderSectionHeader('Security of Your Personal Data', 'dataSecurity')}
        {renderSectionContent(
          <View>
            <Text style={styles.paragraph}>
              The security of Your Personal Data is important to Us, but remember that no method of transmission over the Internet, 
              or method of electronic storage is 100% secure. While We strive to use commercially acceptable means to protect Your 
              Personal Data, We cannot guarantee its absolute security.
            </Text>
          </View>,
          'dataSecurity'
        )}

        {/* Children's Privacy */}
        {renderSectionHeader("Children's Privacy", 'childrenPrivacy')}
        {renderSectionContent(
          <View>
            <Text style={styles.paragraph}>
              Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable 
              information from anyone under the age of 13. If You are a parent or guardian and You are aware that Your child 
              has provided Us with Personal Data, please contact Us. If We become aware that We have collected Personal Data 
              from anyone under the age of 13 without verification of parental consent, We take steps to remove that information 
              from Our servers.
            </Text>
            <Text style={styles.paragraph}>
              If We need to rely on consent as a legal basis for processing Your information and Your country requires consent 
              from a parent, We may require Your parent's consent before We collect and use that information.
            </Text>
          </View>,
          'childrenPrivacy'
        )}

        {/* Links to Other Websites */}
        {renderSectionHeader('Links to Other Websites', 'externalLinks')}
        {renderSectionContent(
          <View>
            <Text style={styles.paragraph}>
              Our Service may contain links to other websites that are not operated by Us. If You click on a third party link, 
              You will be directed to that third party's site. We strongly advise You to review the Privacy Policy of every site You visit.
            </Text>
            <Text style={styles.paragraph}>
              We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.
            </Text>
          </View>,
          'externalLinks'
        )}

        {/* Changes to this Privacy Policy */}
        {renderSectionHeader('Changes to this Privacy Policy', 'policyChanges')}
        {renderSectionContent(
          <View>
            <Text style={styles.paragraph}>
              We may update Our Privacy Policy from time to time. We will notify You of any changes by posting the new Privacy Policy on this page.
            </Text>
            <Text style={styles.paragraph}>
              We will let You know via email and/or a prominent notice on Our Service, prior to the change becoming effective and 
              update the "Last updated" date at the top of this Privacy Policy.
            </Text>
            <Text style={styles.paragraph}>
              You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are 
              effective when they are posted on this page.
            </Text>
          </View>,
          'policyChanges'
        )}

        {/* Contact Us */}
        {renderSectionHeader('Contact Us', 'contact')}
        {renderSectionContent(
          <View>
            <Text style={styles.paragraph}>
              If you have any questions about this Privacy Policy, You can contact us:
            </Text>
            <TouchableOpacity onPress={openEmail}>
              <Text style={styles.link}>By email: eldizerfinanciallimited@gmail.com</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => openLink('https://website.eldizerfinance.co.tz/')}>
              <Text style={styles.link}>By visiting our website</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={openPhone}>
              <Text style={styles.link}>By phone: +255(0)787971971</Text>
            </TouchableOpacity>
          </View>,
          'contact'
        )}

        {/* <View style={styles.agreeButtonContainer}>
          <TouchableOpacity style={styles.agreeButton} onPress={() => {}}>
            <Text style={styles.agreeButtonText}>I Agree to the Privacy Policy</Text>
          </TouchableOpacity>
        </View> */}
      </ScrollView>
    </SafeAreaView>
    </>
   
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1a1a1a',
    textAlign: 'center',
  },
  lastUpdated: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    textAlign: 'center',
  },
  intro: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
    color: '#333',
    textAlign: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#3498db',
  },
  sectionHeaderText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    flex: 1,
    marginRight: 10,
  },
  sectionContent: {
    padding: 16,
    backgroundColor: '#fafafa',
    borderRadius: 8,
    marginBottom: 16,
    borderLeftWidth: 2,
    borderLeftColor: '#e0e0e0',
  },
  subheading: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 8,
    color: '#2c3e50',
  },
  paragraph: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
    color: '#333',
  },
  bullet: {
    fontSize: 14,
    lineHeight: 20,
    marginLeft: 16,
    marginBottom: 8,
    color: '#333',
  },
  bold: {
    fontWeight: 'bold',
  },
  link: {
    fontSize: 16,
    color: '#3498db',
    marginVertical: 8,
    textDecorationLine: 'underline',
  },
  agreeButtonContainer: {
    marginVertical: 24,
    paddingHorizontal: 20,
  },
  agreeButton: {
    backgroundColor: '#3498db',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  agreeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PrivacyScreen;