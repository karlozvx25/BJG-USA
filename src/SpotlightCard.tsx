import React, { useRef } from "react";
import "./SpotlightCard.css";

export interface SpotlightCardProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  as?: React.ElementType;
  to?: string;
  [key: string]: any;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = "",
  spotlightColor = "rgba(255, 255, 255, 0.25)",
  as: Component = "div",
  ...props
}) => {
  const divRef = useRef<HTMLElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    divRef.current.style.setProperty("--mouse-x", `${x}px`);
    divRef.current.style.setProperty("--mouse-y", `${y}px`);
    divRef.current.style.setProperty("--spotlight-color", spotlightColor);
  };

  return (
    <Component
      ref={divRef}
      onMouseMove={handleMouseMove}
      className={`card-spotlight ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};

export default SpotlightCard;
