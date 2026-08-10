import { CLOUD_PATH } from "./cloudPath";
import { Icon, type IconProps } from "./Icon";

export function FogIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d={CLOUD_PATH} />
      <path d="M5.5 20h6M14 20h4.5M8 22.5h9" />
    </Icon>
  );
}
