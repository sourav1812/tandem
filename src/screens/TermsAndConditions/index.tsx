
import React from 'react'
import RNScreenWrapper from '../../components/RNScreenWrapper'
import RNTextComponent from '../../components/RNTextComponent'
import en from '../../constants/api/lang/en'
import { styles } from './styles'
import themeColor from '../../theme/themeColor'
import { checkIfTablet } from '../../hooks/isTabletHook'
import { TermsAndConditionsProps } from '../../navigation/types'
import { verticalScale } from 'react-native-size-matters'
import { ScrollView, View } from 'react-native'
import RNCheckboxWithText from '../../components/RNCheckboxWithText'
import RNButton from '../../components/RNButton'
import { COMPONENTSNAME } from '../../navigation/ComponentName'


const TermsAndConditions = ({ navigation }: TermsAndConditionsProps) => {
    const isTablet = checkIfTablet()
    return (
        <RNScreenWrapper style={{ backgroundColor: themeColor.white }} >
            <RNTextComponent style={styles.heading} isSemiBold >
                {en.T_AND_C}
            </RNTextComponent>
            <RNTextComponent style={[styles.heading, { marginTop: verticalScale(12) }]} isSemiBold >
                {en.WELCOME_TO_OUR_APP}
            </RNTextComponent>
            <View style={styles.content} >
                <ScrollView showsVerticalScrollIndicator={false} >
                    <RNTextComponent style={[styles.text, { paddingHorizontal: verticalScale(40), textAlign: 'center' }]} >
                        By using our app, you agree
                        to our Terms of Use.{'\n'}
                        Please read them carefully.
                    </RNTextComponent>
                    <RNTextComponent style={styles.text} >
                        User Eligibility: 1.1 The App is intended for use by children aged 13 and under. By using the App, you represent that you are a parent or legal guardian and that you have the authority to consent to this Agreement on behalf of your child. If you are under 13, you may use the App only with the consent and supervision of a parent or legal guardian. {'\n\n'}
                        User Eligibility: 1.2 The App is intended for use by children aged 13 and under. By using the App, you represent that you are a parent or legal guardian and that you have the authority to consent to this Agreement on behalf of your child. If you are under 13, you may use the App only with the consent and supervision of a parent or legal guardian. {'\n\n'}User Eligibility: 1.3 The App is intended for use by children aged 13 and under. By using the App, you represent that you are a parent or legal guardian and that you have the authority to consent to this Agreement on behalf of your child. If you are under 13, you may use the App only with the consent and supervision of a parent or legal guardian. {'\n\n'}
                    </RNTextComponent>
                    <RNCheckboxWithText/>
                    <RNCheckboxWithText/>
                    <RNCheckboxWithText/>
                </ScrollView>
                <View style={[styles.footerButton , isTablet && {paddingHorizontal  : 100} ]} >
                    <RNButton onlyBorder buttonColor={themeColor.themeBlue} onClick={()=>{navigation.goBack()}} title={en.CANCEL} customStyle={styles.button} />
                    <RNButton  onClick={()=>{navigation.navigate(COMPONENTSNAME.HELP_CENTER)}} title={en.ACCEPT} customStyle={styles.button} />
                </View>
            </View>
        </RNScreenWrapper>
    )
}

export default TermsAndConditions;