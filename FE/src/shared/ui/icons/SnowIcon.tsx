import { CLOUD_PATH } from "./cloudPath";
import { Icon, type IconProps } from "./Icon";

export function SnowIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d={CLOUD_PATH} />
      <path d="M9 19.4v2.8M7.8 20.1l2.4 1.4M10.2 20.1l-2.4 1.4M15 19.4v2.8M13.8 20.1l2.4 1.4M16.2 20.1l-2.4 1.4" />
    </Icon>
  );
}
