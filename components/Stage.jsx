import { View } from "react-native"

const Stage = ({ active = false, styles }) => {
  return <View className={`bg-[#D9D9D9] rounded-[13px] ${active ? 'bg-[#787878]' : ''} w-[102px] h-[8px] ${styles}`}></View>
}

export default Stage;