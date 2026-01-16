'use client';
import * as React from 'react';
import { cn } from '../../utils/cn';

const Label = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn(
      'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-black dark:text-white',
      className
    )}
    {...props}
  />
));
Label.displayName = 'Label';

export { Label };
