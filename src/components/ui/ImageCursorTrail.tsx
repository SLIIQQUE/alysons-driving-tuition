"use client";

import React, { createRef, useRef, type ReactNode } from "react";
import { motion } from "motion/react";

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

interface ImageMouseTrailProps {
  items: string[];
  imgClass?: string;
  distance?: number;
  className?: string;
  children?: ReactNode;
  fadeAnimation?: boolean;
  maxNumberOfImages?: number;
}

export function ImageCursorTrail({
  items,
  children,
  className,
  maxNumberOfImages = 5,
  imgClass = "w-40 h-48",
  distance = 20,
  fadeAnimation = false,
}: ImageMouseTrailProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const refs = useRef(items.map(() => createRef<HTMLImageElement>()));
  const currentZIndexRef = useRef(1);

  let globalIndex = 0;
  let last = { x: 0, y: 0 };

  const activate = (image: HTMLImageElement, x: number, y: number) => {
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return;
    const relativeX = x - containerRect.left;
    const relativeY = y - containerRect.top;
    image.style.left = `${relativeX}px`;
    image.style.top = `${relativeY}px`;

    if (currentZIndexRef.current > 40) {
      currentZIndexRef.current = 1;
    }
    image.style.zIndex = String(currentZIndexRef.current);
    currentZIndexRef.current++;

    image.dataset.status = "active";
    if (fadeAnimation) {
      setTimeout(() => {
        image.dataset.status = "inactive";
      }, 1500);
    }
    last = { x, y };
  };

  const distanceFromLast = (x: number, y: number) =>
    Math.hypot(x - last.x, y - last.y);

  const deactivate = (image: HTMLImageElement) => {
    image.dataset.status = "inactive";
  };

  const handleOnMove = (
    e: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>,
  ) => {
    const clientX = "clientX" in e ? e.clientX : e.touches[0].clientX;
    const clientY = "clientY" in e ? e.clientY : e.touches[0].clientY;

    if (distanceFromLast(clientX, clientY) > window.innerWidth / distance) {
      const lead = refs.current[globalIndex % refs.current.length].current;
      const tail =
        refs.current[(globalIndex - maxNumberOfImages) % refs.current.length]
          ?.current;
      if (lead) activate(lead, clientX, clientY);
      if (tail) deactivate(tail);
      globalIndex++;
    }
  };

  return (
    <section
      onMouseMove={(e) => handleOnMove(e)}
      onTouchMove={(e) => handleOnMove(e)}
      ref={containerRef}
      className={cn(
        "relative grid h-[600px] w-full place-content-center overflow-hidden rounded-lg",
        className,
      )}
    >
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1920&h=1080&fit=crop')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-linear-to-r from-[#0a0a0a] via-[#0a0a0a]/90 to-[#0a0a0a]" />
      <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]" />

      <div className="relative z-10">{children}</div>
      {items.map((item, index) => (
        <img
          key={index}
          className={cn(
            "opacity-0 data-[status='active']:ease-out-expo absolute -translate-x-[50%] -translate-y-[50%] scale-0 rounded-2xl object-cover transition-transform duration-300 data-[status='active']:scale-100 data-[status='active']:opacity-100 data-[status='active']:duration-500",
            imgClass,
          )}
          data-index={index}
          data-status="inactive"
          src={item}
          alt={`image-${index}`}
          ref={refs.current[index]}
        />
      ))}
    </section>
  );
}
