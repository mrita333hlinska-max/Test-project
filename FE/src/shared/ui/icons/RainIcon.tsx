import { CLOUD_PATH } from "./cloudPath";
import { Icon, type IconProps } from "./Icon";

export function RainIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d={CLOUD_PATH} />
      <path d="M9.2 19.3l-1 3M12.8 19.3l-1 3M16.4 19.3l-1 3" />
    </Icon>
  );
}
