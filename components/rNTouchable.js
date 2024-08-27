import debounce from "lodash/debounce";
import { TouchableOpacity } from "react-native";

export const RNTouchable = (props) => {
  const onPressMethod = debounce(
    () => {
      props.onPress();
    },
    1500,
    {
      leading: true,
      trailing: false,
    }
  );
  return (
    <TouchableOpacity
      style={props.style}
      activeOpacity={0.8}
      onPress={() => onPressMethod()}
      disabled={props.disabled}
    >
      {props.children}
    </TouchableOpacity>
  );
};
