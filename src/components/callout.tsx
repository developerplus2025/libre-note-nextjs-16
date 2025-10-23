import { CircleCheck, CircleX, Info, TriangleAlert } from 'lucide-react';
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../lib/cn';

type CalloutProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'title' | 'type' | 'icon'
> & {
  title?: ReactNode;
  /**
   * @defaultValue info
   */
  type?: 'info' | 'warn' | 'error' | 'success' | 'warning';

  /**
   * Force an icon
   */
  icon?: ReactNode;
};

export const Callout = forwardRef<HTMLDivElement, CalloutProps>(
  ({ className, children, title, type = 'info', icon, ...props }, ref) => {
    if (type === 'warn') type = 'warning';
    const DefaultIcon = {
      info: Info,
      warning: TriangleAlert,
      error: CircleX,
      success: CircleCheck,
    }[type];

    return (
      <div
        ref={ref}
        className={cn(
          "bg-fd-card text-fd-card-foreground my-4 flex gap-2 rounded-xl border p-3 ps-1 text-sm shadow-md",
          className,
        )}
        {...props}
        style={
          {
            ...(props.style as React.CSSProperties),
            ["--callout-color" as any]: `var(--color-fd-${type})`,
          } as React.CSSProperties
        }
      >
        <div role="none" className="w-0.5 rounded-sm bg-(--callout-color)/50" />
        {icon ?? (
          <DefaultIcon className="text-fd-card -me-0.5 size-5 fill-(--callout-color)" />
        )}
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          {title ? <p className="!my-0 font-medium">{title}</p> : null}
          <div className="text-fd-muted-foreground prose-no-margin empty:hidden">
            {children}
          </div>
        </div>
      </div>
    );
  },
);

Callout.displayName = 'Callout';
