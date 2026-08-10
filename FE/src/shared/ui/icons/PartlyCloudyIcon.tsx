import { CLOUD_PATH } from "./cloudPath";
import { Icon, type IconProps } from "./Icon";

export function PartlyCloudyIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="8.5" cy="7.5" r="2.6" />
      <path d="M8.5 2.4v1.4M3.4 7.5h1.4M4.9 3.9l1 1M12.1 3.9l-1 1" />
      <path d={CLOUD_PATH} />
    </Icon>
  );
}
