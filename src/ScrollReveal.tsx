import React, { useEffect, useRef, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ScrollReveal.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface ScrollRevealProps {
  children?: React.ReactNode;
  as?: React.ElementType;
  scrollContainerRef?: React.RefObject<HTMLElement | null>;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
  rotationEnd?: string;
  wordAnimationEnd?: string;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  as: Component = "h2",
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = "",
  textClassName = "",
  rotationEnd = "bottom bottom",
  wordAnimationEnd = "bottom 75%",
}) => {
  const containerRef = useRef<HTMLElement>(null);

  const renderContent = (node: React.ReactNode, keyPrefix = "sr"): React.ReactNode => {
    if (typeof node === "string") {
      return node.split(/(\s+)/).map((word, index) => {
        if (word.match(/^\s+$/)) return word;
        return (
          <span className="word" key={`${keyPrefix}-${index}`}>
            {word}
          </span>
        );
      });
    }

    if (Array.isArray(node)) {
      return node.map((child, i) =>
        typeof child === "string" ? renderContent(child, `${keyPrefix}-${i}`) : child
      );
    }

    return node;
  };

  const splitText = useMemo(() => {
    return renderContent(children);
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const scroller =
        scrollContainerRef && scrollContainerRef.current
          ? scrollContainerRef.current
          : window;

      if (baseRotation !== 0) {
        gsap.fromTo(
          el,
          { transformOrigin: "0% 50%", rotate: baseRotation },
          {
            ease: "none",
            rotate: 0,
            scrollTrigger: {
              trigger: el,
              scroller,
              start: "top bottom",
              end: rotationEnd,
              scrub: true,
            },
          }
        );
      }

      const wordElements = el.querySelectorAll(".word");
      if (wordElements.length > 0) {
        gsap.fromTo(
          wordElements,
          { opacity: baseOpacity, willChange: "opacity, filter" },
          {
            ease: "none",
            opacity: 1,
            stagger: 0.05,
            scrollTrigger: {
              trigger: el,
              scroller,
              start: "top 95%",
              end: wordAnimationEnd,
              scrub: true,
            },
          }
        );

        if (enableBlur) {
          gsap.fromTo(
            wordElements,
            { filter: `blur(${blurStrength}px)` },
            {
              ease: "none",
              filter: "blur(0px)",
              stagger: 0.05,
              scrollTrigger: {
                trigger: el,
                scroller,
                start: "top 95%",
                end: wordAnimationEnd,
                scrub: true,
              },
            }
          );
        }
      } else {
        gsap.fromTo(
          el,
          {
            opacity: baseOpacity,
            filter: enableBlur ? `blur(${blurStrength}px)` : "none",
            y: 20,
            willChange: "opacity, filter, transform",
          },
          {
            ease: "none",
            opacity: 1,
            filter: "blur(0px)",
            y: 0,
            scrollTrigger: {
              trigger: el,
              scroller,
              start: "top 92%",
              end: wordAnimationEnd || "bottom 80%",
              scrub: true,
            },
          }
        );
      }
    }, el);

    return () => ctx.revert();
  }, [
    scrollContainerRef,
    enableBlur,
    baseRotation,
    baseOpacity,
    rotationEnd,
    wordAnimationEnd,
    blurStrength,
  ]);

  const Tag = Component as any;
  return (
    <Tag
      ref={containerRef as any}
      className={`scroll-reveal ${containerClassName}`}
    >
      <span className={`scroll-reveal-text ${textClassName}`}>{splitText}</span>
    </Tag>
  );
};

export default ScrollReveal;
