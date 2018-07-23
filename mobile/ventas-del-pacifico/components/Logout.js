import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
} from 'react-native';
//import Icon from 'react-native-vector-icons/Ionicons';
export default class Logout extends React.Component {
    static navigationOptions = {
        header: null,
    };
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: '',
            paymethod: '',
            email: '',
            password: '',
            password2: '',
            status: false,
            loaded: true,
        };
    }

    render() {
        const {
            navigate
        } = this.props.navigation;
        return ( <
            View style = {
                styles.container
            } >

            <
            Text style = {
                styles.logoText
            } > PacifiK 2018 r < /Text> <
            TextInput style = {
                styles.inputBox
            }
            underlineColorAndroid = "rgba(0,0,0,0)"
            onChangeText = {
                name => this.setState({
                    name
                })
            }
            autoCorrect = {
                false
            }
            placeholder = "Nombre" /
            >
            <
            TextInput style = {
                styles.inputBox
            }
            underlineColorAndroid = "rgba(0,0,0,0)"
            onChangeText = {
                email => this.setState({
                    email
                })
            }
            autoCorrect = {
                false
            }
            placeholder = "Correo" /
            >
            <
            TextInput style = {
                styles.inputBox
            }
            underlineColorAndroid = "rgba(0,0,0,0)"
            onChangeText = {
                password => this.setState({
                    password
                })
            }
            secureTextEntry = {
                true
            }
            autoCorrect = {
                false
            }
            placeholder = "Contraseña" /
            >
            <
            TextInput style = {
                styles.inputBox
            }
            underlineColorAndroid = "rgba(0,0,0,0)"
            onChangeText = {
                password2 => this.setState({
                    password2
                })
            }
            secureTextEntry = {
                true
            }
            autoCorrect = {
                false
            }
            placeholder = "Repetir Contraseña" /
            >
            <
            TouchableOpacity style = {
                styles.button
            }
            onPress = {
                () => this.loginUser(this.state.email, this.state.password)
            } >
            <
            Text style = {
                styles.buttonText
            } > Registrate < /Text> <
            /TouchableOpacity>

            <
            View style = {
                styles.signupTextContent
            } >
            <
            View style = {
                styles.signUpView
            } >
            <
            Text style = {
                styles.signupText
            } >
            <
            /Text><TouchableOpacity onPress={() => navigate('Login')}> <
            Text style = {
                styles.signupText
            } > Ya Tengo cuenta!. < /Text> <
            /TouchableOpacity> <
            /View> <
            /View> <
            /View>
        );
    }
}

//Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0091EA'
    },
    inputBox: {
        width: '75%',
        borderRadius: 5,
        backgroundColor: 'rgba(255,255,255,0.2)',
        height: 40,
        color: '#fff',
        paddingHorizontal: 10,
        fontSize: 15,
        margin: 8,
    },
    button: {
        width: '75%',
        backgroundColor: '#f7c744',
        alignItems: 'center',
        padding: 10,
        marginTop: 10,
        marginBottom: 20,
        borderRadius: 5,
        justifyContent: 'center',
        elevation: 9,
    },
    buttonText: {
        color: '#000',
        fontSize: 15
    },
    signupTextContent: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginTop: 10

    },
    signupText: {
        color: '#fff',
        fontWeight: 'bold'

    },
    logoText: {
        fontSize: 25,
        marginBottom: 60,
        color: '#fff',
        padding: 20,
        fontWeight: 'bold'
    },
    signUpView: {
        flexDirection: 'row',
    }

});