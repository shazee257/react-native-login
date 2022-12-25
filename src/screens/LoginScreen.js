import {
    View,
    Text,
    StatusBar,
    ImageBackground,
    TextInput,
    Image,
    TouchableOpacity,
} from '../components';
import bgImage from '../assets/images/bg-login.png';
import { FONTS } from '../assets/fonts';
import { UserIcon, KeyIcon } from "react-native-heroicons/outline";
// import axios from 'axios';
import { useEffect, useState } from 'react';
import { fetchAPI } from '../constant';


const LoginScreen = () => {
    const userObj = {
        email: "",
        password: ""
    };

    const [user, setUser] = useState(userObj);
    const [errors, setErrors] = useState({});

    const loginHandler = async () => {
        const { data } = await fetchAPI({
            method: "POST",
            endPoint: "/users/login",
            data: user
        });
        console.log("data: ", data);
    }

    const onChange = ({ name, value }) => {
        setErrors({});
        setUser({ ...user, [name]: value });

        if (value.trim() !== "") {
            if (name === "password") {
                if (value.length < 6) {
                    setErrors({ ...errors, [name]: "Password must be at least 6 characters long" });
                } else {
                    setErrors({ ...errors, [name]: null });
                }
            } if (name === "email") {
                // regex for email
                const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (!emailRegex.test(value)) {
                    setErrors({ ...errors, [name]: "Please enter a valid email address" });
                } else {
                    setErrors({ ...errors, [name]: null });
                }
            }
        }
    }

    return (
        <ImageBackground source={bgImage} className="w-full h-full">
            <StatusBar animated={true} backgroundColor="#61dafb" barStyle="dark-content" hidden={false} />

            <View className='flex-1 justify-center items-center'>
                <View className='space-y-3'>
                    <View className='mb-4'>
                        <Text className={`text-4xl font-bold text-green-100 font-['${FONTS.bold}']`}>Login</Text>
                        <Text className="text-lg text-green-100">Please sign in to continue.</Text>
                    </View>

                    <View>
                        <View className='flex flex-row items-center w-80 h-10 border-2 border-gray-300 px-2 space-x-2 rounded-lg'>
                            <UserIcon color="gray" size={24} />
                            <TextInput
                                placeholderTextColor='gray'
                                className="w-60 h-10 text-white"
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

                    <TouchableOpacity onPress={loginHandler}
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