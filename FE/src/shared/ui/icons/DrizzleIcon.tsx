import { CLOUD_PATH } from "./cloudPath";
import { Icon, type IconProps } from "./Icon";

export function DrizzleIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d={CLOUD_PATH} />
      <path d="M9.5 19.5v1.3M13 19.5v1.3M16.5 19.5v1.3" />
    </Icon>
  );
}
