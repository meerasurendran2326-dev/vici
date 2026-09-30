"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

export function NavHeader() {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  return (
    <ul
      className="relative mx-auto flex w-fit rounded-full border-2 border-emerald-900/20 bg-gradient-to-r from-emerald-950 via-[#0B4A3B] to-emerald-900 p-1 shadow-lg shadow-emerald-950/20 backdrop-blur-md"
      onMouseLeave={() => setPosition((pv) => ({ ...pv, opacity: 0 }))}
    >
      <Tab setPosition={setPosition}>Home</Tab>
      <Tab setPosition={setPosition}>Rings</Tab>
      <Tab setPosition={setPosition}>Necklaces</Tab>
      <Tab setPosition={setPosition}>Earrings</Tab>
      <Tab setPosition={setPosition}>Bracelets</Tab>
      <Tab setPosition={setPosition}>Offers</Tab>

      <Cursor position={position} />
    </ul>
  );
}

const Tab = ({
  children,
  setPosition,
}: {
  children: React.ReactNode;
  setPosition: React.Dispatch<
    React.SetStateAction<{
      left: number;
      width: number;
      opacity: number;
    }>
  >;
}) => {
  const ref = useRef<HTMLLIElement>(null);
  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref.current) return;

        const { width } = ref.current.getBoundingClientRect();
        setPosition({
          width,
          opacity: 1,
          left: ref.current.offsetLeft,
        });
      }}
      className="relative z-10 block cursor-pointer px-3 py-1.5 text-xs uppercase tracking-wider text-emerald-100 font-medium hover:text-white transition-colors md:px-5 md:py-2.5 md:text-sm"
    >
      {children}
    </li>
  );
};

const Cursor = ({
  position,
}: {
  position: { left: number; width: number; opacity: number };
}) => {
  return (
    <motion.li
      animate={position}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className="absolute z-0 h-7 rounded-full bg-gradient-to-r from-emerald-600 to-teal-500 shadow-md md:h-9"
    />
  );
};

export default NavHeader;
