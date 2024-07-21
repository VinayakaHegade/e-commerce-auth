import { cn } from "~/lib/utils";
import { Icons } from "./icons";

type LoadingSpinnerProps = React.HTMLAttributes<SVGElement>;

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ className }) => {
  return (
    <div className="flex h-[calc(100dvh-133.25px)] w-full items-center justify-center text-sm text-muted-foreground">
      <Icons.spinner className={cn("mr-2 h-4 w-4 animate-spin", className)} />
      Loading...
    </div>
  );
};

export default LoadingSpinner;
