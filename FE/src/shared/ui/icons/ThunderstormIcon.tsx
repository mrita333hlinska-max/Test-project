import { CLOUD_PATH } from "./cloudPath";
import { Icon, type IconProps } from "./Icon";

export function ThunderstormIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d={CLOUD_PATH} />
      <path d="M13.2 18.6l-2.6 3.1h3l-2.2 2.2" />
    </Icon>
  );
}
