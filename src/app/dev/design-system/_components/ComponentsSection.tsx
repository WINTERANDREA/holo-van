'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';

function MagneticLinkDemo() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPosition({ x: x * 0.3, y: y * 0.3 });
  };

  return (
    <motion.a
      href="#"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setPosition({ x: 0, y: 0 })}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15 }}
      className="inline-block font-archivo-condensed font-semibold text-xl uppercase relative group text-primary"
    >
      I CAMPER
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
    </motion.a>
  );
}

export function ComponentsSection() {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  return (
    <div className="space-y-12">
      {/* Buttons */}
      <div>
        <h3 className="font-archivo-condensed font-semibold text-xl mb-4">Buttons</h3>
        <div className="flex gap-4 flex-wrap">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="holographic">Holographic</Button>
        </div>
        <div className="flex gap-4 flex-wrap mt-4">
          <Button variant="primary" size="sm">Small</Button>
          <Button variant="primary" size="md">Medium</Button>
          <Button variant="primary" size="lg">Large</Button>
        </div>
        <div className="flex gap-4 flex-wrap mt-4">
          <Button variant="primary" disabled>Disabled</Button>
          <Button variant="secondary" disabled>Disabled</Button>
        </div>
      </div>

      {/* Cards */}
      <div>
        <h3 className="font-archivo-condensed font-semibold text-xl mb-4">Cards</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <h4 className="font-archivo-condensed font-semibold text-lg">Default Card</h4>
            </CardHeader>
            <CardBody>
              <p className="text-sm text-secondary">A simple card with hover lift effect and border.</p>
            </CardBody>
          </Card>

          <Card holoAccent>
            <CardHeader>
              <h4 className="font-archivo-condensed font-semibold text-lg">Holo Accent Card</h4>
            </CardHeader>
            <CardBody>
              <p className="text-sm text-secondary">Card with holographic gradient accent strip at top.</p>
            </CardBody>
          </Card>

          <Card hover={false}>
            <CardHeader>
              <h4 className="font-archivo-condensed font-semibold text-lg">Static Card</h4>
            </CardHeader>
            <CardBody>
              <p className="text-sm text-secondary">No hover animation. Used for static content displays.</p>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Inputs */}
      <div>
        <h3 className="font-archivo-condensed font-semibold text-xl mb-4">Input Fields</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
          <Input placeholder="Default input" />
          <Input placeholder="With label" label="Pick-up Location" />
          <Input variant="underline" placeholder="Underline variant" />
          <Input variant="underline" placeholder="Underline with label" label="Departure Date" />
        </div>
      </div>

      {/* Hamburger Button */}
      <div>
        <h3 className="font-archivo-condensed font-semibold text-xl mb-4">Hamburger Button</h3>
        <p className="text-sm text-secondary mb-4">Click to toggle state</p>
        <button
          onClick={() => setHamburgerOpen(!hamburgerOpen)}
          className="relative w-10 h-10 flex flex-col justify-center items-center gap-1.5 bg-primary/5 rounded-lg"
        >
          <motion.span
            className="w-6 h-0.5 bg-primary rounded-full"
            animate={hamburgerOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
          />
          <motion.span
            className="w-6 h-0.5 bg-primary rounded-full"
            animate={hamburgerOpen ? { opacity: 0 } : { opacity: 1 }}
          />
          <motion.span
            className="w-6 h-0.5 bg-primary rounded-full"
            animate={hamburgerOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
          />
        </button>
      </div>

      {/* Magnetic Link Demo */}
      <div>
        <h3 className="font-archivo-condensed font-semibold text-xl mb-4">Magnetic Link</h3>
        <p className="text-sm text-secondary mb-4">Hover to see magnetic effect</p>
        <MagneticLinkDemo />
      </div>
    </div>
  );
}
