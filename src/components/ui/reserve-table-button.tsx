import * as React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ReserveTableButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  className?: string;
}

export const ReserveTableButton: React.FC<ReserveTableButtonProps> = ({
  href = "#reserve",
  onClick,
  className,
  children = "RESERVE A TABLE",
  ...props
}) => {
  return (
    <a
      href={href}
      onClick={onClick}
      role="button"
      aria-label="Reserve a Table"
      className={cn(
        "relative inline-flex items-center justify-center box-border h-11 overflow-hidden rounded-full cursor-pointer select-none no-underline whitespace-nowrap",
        "bg-[#A52F19] text-white font-['Plus_Jakarta_Sans','Poppins',sans-serif] font-bold text-[13px] uppercase tracking-[0.08em]",
        "shadow-[0_4px_14px_rgba(165,47,25,0.28)] outline-none",
        "pl-5 pr-[46px] transition-[padding,background-color,box-shadow,transform] duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]",
        "hover:pl-[46px] hover:pr-5 hover:bg-[#932915] hover:-translate-y-px hover:shadow-[0_8px_22px_rgba(165,47,25,0.4)]",
        "active:translate-y-0 active:scale-[0.98] active:shadow-[0_2px_8px_rgba(165,47,25,0.25)]",
        "focus-visible:ring-2 focus-visible:ring-[#FFFDF9] focus-visible:ring-offset-2",
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
          "absolute top-[5px] right-[5px] w-[34px] h-[34px] rounded-full bg-[rgba(90,18,8,0.45)] text-white flex items-center justify-center flex-shrink-0 pointer-events-none",
          "transition-[right,transform,background-color] duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]",
          "group-hover:right-[calc(100%-39px)] group-hover:rotate-45 group-hover:bg-[rgba(90,18,8,0.55)]",
          "motion-reduce:transition-none motion-reduce:transform-none"
        )}
      >
        <ArrowRight className="w-[15px] h-[15px] text-white stroke-[2.2] transition-transform duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none" />
      </span>
    </a>
  );
};

export default ReserveTableButton;
