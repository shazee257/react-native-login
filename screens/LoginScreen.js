import {
    View,
    Text,
    StatusBar,
    ImageBackground,
    TextInput,
    Image,
    TouchableOpacity,
} from '../components';
import bgImage from '../src/assets/images/bg-login.png';
import { FONTS } from '../src/assets/fonts';
import { UserIcon, KeyIcon } from "react-native-heroicons/outline";
// import axios from 'axios';
import { useEffect, useState } from 'react';
import { BaseURL } from '../src/constant';

const LoginScreen = () => {

    const userObj = {
        email: "",
        password: ""
    };

    const [user, setUser] = useState(userObj);
    const [errors, setErrors] = useState({});

    // const loginHandler = async () => {
    // const { data } = await axios.post('http://54.145.81.48:5000/users/login', userObject);
    // console.log(data);
    // console.log("Login: ", email, password);
    // }


    const onChange = ({ name, value }) => {
        setUser({ ...user, [name]: value });

        if (value !== "") {
            if (name === "password") {
                if (value.length < 6) {
                    setErrors({ ...errors, [name]: "Password must be at least 6 characters long" });
                } else {
                    setErrors({ ...errors, [name]: null });
                }
            } if (name === "email") {
                if (!value.includes("@")) {
                    setErrors({ ...errors, [name]: "Please enter a valid email address" });
                } else {
                    setErrors({ ...errors, [name]: null });
                }
            }
        }
    }


    useEffect(() => {
        console.log("BaseURL: ", BaseURL);
    }, [])



    return (
        <ImageBackground source={bgImage} className="w-full h-full">
            <StatusBar animated={true} backgroundColor="#61dafb" barStyle="dark-content" hidden={false} />

            <View className='flex-1 justify-center items-center'>
                <View className='space-y-3'>
                    <View className='mb-4'>
                        <Text className={`text-4xl text-green-200 font-['${FONTS.bold}']`}>Login</Text>
                        <Text className="text-lg text-gray-300">Please sign in to continue.</Text>
                    </View>

                    <View>
                        <View className='flex flex-row items-center w-80 h-10 border-2 border-gray-300 px-2 space-x-2 rounded-lg'>
                            <UserIcon color="gray" size={24} />
                            <TextInput
                                placeholderTextColor='gray'
                                className="w-60 h-10 text-white placeholder-white"
                                maxLength={25}
                                placeholder="Email"
                                value={user.email}
                                onChangeText={(text) => onChange({ name: "email", value: text })}
                            />
                            {/* {errors.email && <Text className='text-red-500 ml-8 text-xs'>*</Text>} */}
                        </View>
                        {errors.email && <Text className='text-red-500 text-xs ml-20'>{errors.email}</Text>}
                    </View>

                    <View>
                        <View className='flex flex-row items-center w-80 h-10 border-2 border-gray-300 rounded-lg'>
                            <View className='flex-1 flex-row items-center px-2 space-x-2'>
                                <KeyIcon color="gray" size={24} />
                                <TextInput
                                    placeholderTextColor='gray'
                                    className="w-60 h-10 text-white placeholder-white"
                                    placeholder="Password" secureTextEntry={true}
                                    maxLength={15}
                                    value={user.password}
                                    onChangeText={(text) => onChange({ name: "password", value: text })}
                                />
                            </View>
                            <Text className='text-white text-xs pr-3'>FORGOT</Text>
                        </View>
                        {errors.password && <Text className='text-red-500 text-xs ml-12'>{errors.password}</Text>}
                    </View>

                    <TouchableOpacity
                        className='bg-green-100 w-80 h-10 rounded-lg items-center justify-center'>
                        <Text className='text-green-700 font-["Poppins-SemiBold"] text-lg'>LOGIN</Text>
                    </TouchableOpacity>

                    <View className='flex flex-row items-center justify-center'>
                        <Text className='text-white text-sm'>Don't have an account?</Text>
                        <TouchableOpacity>
                            <Text className='text-green-100 text-sm font-["Poppins-SemiBold"]'> Sign up</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        </ImageBackground>
    )
}

export default LoginScreen