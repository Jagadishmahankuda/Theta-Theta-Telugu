import * as React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ExploreMenuButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  className?: string;
}

export const ExploreMenuButton: React.FC<ExploreMenuButtonProps> = ({
  href = "#menu",
  onClick,
  className,
  children = "EXPLORE MENU",
  ...props
}) => {
  return (
    <a
      href={href}
      onClick={onClick}
      role="button"
      aria-label="Explore Menu"
      className={cn(
        "relative inline-flex items-center justify-center box-border h-14 w-[236px] overflow-hidden rounded-full cursor-pointer select-none no-underline",
        "bg-[#8D2D1C] text-white font-['Poppins',sans-serif] font-bold text-[15.5px] uppercase tracking-[0.05em]",
        "shadow-[0_8px_20px_rgba(141,45,28,0.32)] outline-none",
        "pl-[26px] pr-[58px] transition-[padding,background-color,box-shadow,transform] duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]",
        "hover:pl-[58px] hover:pr-[26px] hover:bg-[#7D2617] hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(141,45,28,0.45)]",
        "active:translate-y-0 active:scale-[0.98] active:shadow-[0_4px_12px_rgba(141,45,28,0.3)]",
        "focus-visible:ring-2 focus-visible:ring-[#D9A83E] focus-visible:ring-offset-2",
        "group motion-reduce:transition-none motion-reduce:transform-none",
        className
      )}
      {...props}
    >
      <span className="relative z-10 leading-none whitespace-nowrap pointer-events-none transition-transform duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none">
        {children}
      </span>
      <span
        aria-hidden="true"
        className={cn(
          "absolute top-[7px] right-[7px] w-[42px] h-[42px] rounded-full bg-[#D9A83E] text-white flex items-center justify-center flex-shrink-0 shadow-[0_2px_6px_rgba(0,0,0,0.15)] pointer-events-none",
          "transition-[right,transform,background-color] duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]",
          "group-hover:right-[calc(100%-49px)] group-hover:rotate-45",
          "motion-reduce:transition-none motion-reduce:transform-none"
        )}
      >
        <ArrowRight className="w-[18px] h-[18px] text-white stroke-[2.5] transition-transform duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none" />
      </span>
    </a>
  );
};

export default ExploreMenuButton;
