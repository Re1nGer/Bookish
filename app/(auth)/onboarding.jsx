import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Image, ScrollView } from "react-native";
import { images } from "../../constants";


const Onboarding = () => {

    //gotta figure out text-center problem

    return <SafeAreaView>
        <ScrollView contentContainerStyle={{height: "100%"}}>
            <View className="w-full mt-[57px] relative h-full">
                <View className="px-[73px]">
                    <Text className="font-bold text-center text-[28px] leading-[26px] tracking-wide font-cygrebold my-[23px]">
                        Let’s get to know each other better!
                    </Text>
                </View>
                <View className="px-4 w-full items-center max-w-[350px] self-center">
                    <Text classname="w-full text-[#000000] font-cygreregular text-center">
awdwadjwa;odhaw;dwaiu;dwa udw;a  dwad;wa du;wa duwa; duwai; du iwa a;d w;a diuwa;diu; wu   
                    </Text>
                </View>
                <Image source={images.onboardingMonster} className="w-[261px] self-center h-[261px] mt-[60px] z-10" />
                <Image source={images.onboardingImage} className="bottom-0 absolute" />
            </View>
        </ScrollView>
    </SafeAreaView>

}


export default Onboarding;