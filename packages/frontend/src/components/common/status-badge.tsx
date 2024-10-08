import { Badge, type BadgeProps } from "../ui/badge";
import { Status } from "./extras";

type ExtendedBadgeProps = BadgeProps & { status: Status };

const statusVariantMap: Record<Status, string> = {
  [Status.Completed]: "primary",
  [Status.Ongoing]: "secondary",
  [Status.Upcoming]: "destructive",
};

const getStatusVariant = (status: Status): string => {
  return statusVariantMap[status] ?? "default";
};

const StatusBadge = ({ className, status, ...props }: ExtendedBadgeProps) => {
  const statusVariant = getStatusVariant(status) as BadgeProps["variant"];
  return (
    <Badge variant={statusVariant} className={className} {...props}>
      {status}
    </Badge>
  );
};
export default StatusBadge;
