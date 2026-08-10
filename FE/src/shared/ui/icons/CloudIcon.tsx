import { CLOUD_PATH } from "./cloudPath";
import { Icon, type IconProps } from "./Icon";

export function CloudIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d={CLOUD_PATH} />
    </Icon>
  );
}
