import { Image, ScrollView, StyleSheet, Text, View, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import { Link } from "expo-router";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { signIn, getCurrentUser } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/globalProvider";

const SignIn = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if (!form.email || !form.password) {
      Alert.alert("Error", "Please fill in all the fields");
    }
    setIsSubmitting(true);
    try {
      await signIn(form.email, form.password);
      const result = await getCurrentUser();
      setUser(result);
      setIsLoggedIn(true);
      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <SafeAreaView className={"bg-primary h-full"}>
      <ScrollView>
        <View
          className={
            "w-full min-h-[83vh] justify-center items-center px-4 my-6"
          }
        >
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[130px] h-[35px]"
          />
          <Text
            className={"text-2xl text-white  font-psemibold text-center mt-10"}
          >
            Log in to Aora
          </Text>
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7 w-full"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7 w-full"
          />
          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles={"mt-7 w-full"}
            isLoading={isSubmitting}
          />
          <View className="flex-row justify-center pt-5 gap-2">
            <Text
              className={"text-lg text-gray-100 font-pregular"}
              style={{ color: "white" }}
            >
              Dont't have an account?
            </Text>
            <Link
              href={"/sign-up"}
              className="text-secondary text-lg font-psemibold"
            >
              Sign up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
