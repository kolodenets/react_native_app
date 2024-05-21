import { Alert, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import { Link, router } from "expo-router";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { createUser } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/globalProvider";

const SignUp = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if (!form.username === "" || !form.email === "" || !form.password === "") {
      Alert.alert("Error", "Please fill in all the fields");
    }
    setIsSubmitting(true);
    try {
      const result = await createUser(form.email, form.password, form.username);
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
            Sign up to Aora
          </Text>
          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-10 w-full"
          />
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
            title="Sign Up"
            handlePress={submit}
            containerStyles={"mt-7 w-full"}
            isLoading={isSubmitting}
          />
          <View className="flex-row justify-center pt-5 gap-2">
            <Text
              className={"text-lg text-gray-100 font-pregular"}
              style={{ color: "white" }}
            >
              Have an account already?
            </Text>
            <Link
              href={"/sign-in"}
              className="text-secondary text-lg font-psemibold"
            >
              Sign in
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
