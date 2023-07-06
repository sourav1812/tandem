import { KeyboardAvoidingView, Platform, Pressable, ScrollView, View } from 'react-native'
import React, { useState } from 'react'
import RNScreenWrapper from '../../components/RNScreenWrapper'
import RNTextComponent from '../../components/RNTextComponent'
import en from '../../constants/api/lang/en'
import { styles } from './styles'
import themeColor from '../../theme/themeColor'
import { checkIfTablet } from '../../hooks/isTabletHook'
import { SignUpProps } from '../../navigation/types'
import RNButton from '../../components/RNButton'
import RNLogoHeader from '../../components/RNLogoHeader'
import RNTextInputWithLabel from '../../components/RNTextInputWithLabel'
import RNSecureTextInput from '../../components/RNSecureTextInput'
import Google from '../../assets/svg/GoogleLogo'
import Apple from '../../assets/svg/AppleLogo'
import FB from '../../assets/svg/FBlogo'
import { COMPONENTSNAME } from '../../navigation/ComponentName'
import { stateObject } from './interface'
import { verticalScale } from 'react-native-size-matters'



const SignUp = ({ navigation }: SignUpProps) => {
    const isTablet = checkIfTablet()

    const [state, setState] = useState<stateObject>({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const { name, email, password, confirmPassword } = state;

    const updateState = (date: any) => {
        setState((previouState: any) => {
            return { ...previouState, ...date };
        });
    };

    return (
        <RNScreenWrapper style={{ backgroundColor: themeColor.white }} >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ height: '100%', width: '100%' }}>
                <ScrollView style={{ height: '100%', width: '100%' }}>
                    <RNLogoHeader customStyle={styles.header} />
                    <RNTextComponent style={styles.heading} isSemiBold >
                        {en.CREATE_AN_ACCOUNT}
                    </RNTextComponent>
                    <View style={[styles.form , isTablet && {paddingHorizontal  : verticalScale(100)}  ]} >
                        <RNTextInputWithLabel
                            label={en.NAME}
                            showLabel backgroundColor={themeColor.lightGray}
                            containerStyle={styles.input}
                            value={name}
                            updateText={(e) => {
                                updateState({ name: e })
                            }}
                            hint={en.ENTER_NAME}
                            inputStyle={styles.inputText}
                        />
                        <RNTextInputWithLabel
                            label={en.EMAIL}
                            showLabel backgroundColor={themeColor.lightGray}
                            containerStyle={styles.input2}
                            value={email}
                            updateText={(e) => {
                                updateState({ email: e })
                            }}
                            hint={en.ENTER_YOUR_EMAIL}
                            inputStyle={styles.inputText}
                        />
                        <RNSecureTextInput
                            title={en.PASSWORD}
                            label={en.EMAIL}
                            customStyle={styles.input2}
                            value={password}
                            updateText={(e) => {
                                updateState({ password: e })
                            }}
                            hint={en.ENTER_PASSWORD}
                            inputStyle={styles.inputText}
                        />
                        <RNSecureTextInput
                            title={en.CONFIRM_PASSWORD}
                            label={en.EMAIL}
                            customStyle={styles.input2}
                            inputStyle={styles.inputText}
                            value={confirmPassword}
                            updateText={(e) => {
                                updateState({ confirmPassword: e })
                            }}
                            hint={en.CONFIRM_PASSWORD}
                        />
                        <RNButton title={en.SIGN_UP} customStyle={styles.button} onClick={() => {navigation.navigate(COMPONENTSNAME.TERMS_AND_CONDITIONS)}} />
                        <View style={styles.continueDesign} >
                            <View style={styles.line} />
                                <RNTextComponent style={[styles.text , isTablet && {fontSize  : 14}]} >
                                    {en.OR_CONTINUE_WITH}
                                </RNTextComponent>
                            <View style={styles.line} />
                        </View>
                        <View style={styles.bottomOptions} >
                            <View style={[styles.option , isTablet && {paddingHorizontal:  36 , paddingVertical : 17}]} >
                                <Google />
                            </View>
                            <View style={[styles.option , isTablet && {paddingHorizontal:  36 , paddingVertical : 17}]} >
                                <FB />
                            </View>
                            <View style={[styles.option , isTablet && {paddingHorizontal:  36 , paddingVertical : 17}]} >
                                <Apple />
                            </View>
                        </View>
                        <RNTextComponent style={[styles.buttonText , isTablet && {fontSize  :16} ]} >
                            {en.ALREADY_HAVE_AN_ACCOUNT}{' '}
                            <RNTextComponent isSemiBold style={[styles.signup, isTablet && {fontSize  :16}]} handleOnPress={() => navigation.navigate(COMPONENTSNAME.SIGN_IN)} >
                                {en.SIGN_IN}
                            </RNTextComponent>
                        </RNTextComponent>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </RNScreenWrapper>
    )
}

export default SignUp