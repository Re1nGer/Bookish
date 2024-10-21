import { TouchableOpacity, View } from "react-native"

const Stage = ({ active = false, styles }) => {
  return <TouchableOpacity
            className={`bg-[#D9D9D9] flex-1 rounded-[13px] ${active ? 'bg-[#787878]' : ''}
            w-full h-[8px] ${styles}`}>
          </TouchableOpacity>
}

export default Stage;