import { GraduationCap } from "lucide-react";

interface StudHubLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "gradient" | "white";
}

export const StudHubLogo = ({ className = "", size = "md", variant = "gradient" }: StudHubLogoProps) => {
  const sizeClasses = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-4xl"
  };

  const iconSizes = {
    sm: 20,
    md: 28,
    lg: 40
  };

  const textClasses = variant === "white" 
    ? "text-white" 
    : "text-gradient-hero";

  const iconClasses = variant === "white"
    ? "text-white animate-pulse"
    : "text-primary animate-pulse";

  return (
    <div className={`flex items-center gap-2 font-bold ${textClasses} ${sizeClasses[size]} ${className}`}>
      <GraduationCap 
        size={iconSizes[size]} 
        className={iconClasses}
      />
      <span>StudHub</span>
    </div>
  );
};