'use client';

import { useEffect, useState, useMemo } from "react";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { OutMode } from "@tsparticles/engine";

export default function ParticlesBackground() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    import("@tsparticles/react").then(async ({ initParticlesEngine }) => {
      await initParticlesEngine(async (engine) => {
        await loadSlim(engine);
      });
      setInit(true);
    });
  }, []);

  const options = useMemo(
    () => ({
      fullScreen: {
        enable: false,
        zIndex: 0,
      },
      background: {
        color: "transparent",
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onHover: { enable: true, mode: "grab" },
          onClick: { enable: true, mode: "push" },
        },
        modes: {
          grab: { 
            distance: 140, 
            links: { 
              opacity: 0.8,
              color: "#ddb963"
            } 
          },
          push: { quantity: 3 },
        },
      },
      particles: {
        number: { 
          value: 80, 
          density: { 
            enable: true, 
            area: 800 
          } 
        },
        color: { 
          value: ["#ddb963", "#ffffff", "#e8c77d"] 
        },
        links: {
          enable: true,
          color: "#ddb963",
          distance: 150,
          opacity: 0.3,
          width: 1,
        },
        move: { 
          enable: true, 
          speed: 1.5, 
          direction: "none",
          random: true,
          straight: false,
          outModes: { 
            default: "out" as OutMode 
          } 
        },
        size: { 
          value: { min: 1, max: 3 } 
        },
        opacity: { 
          value: { min: 0.3, max: 0.7 },
          animation: {
            enable: true,
            speed: 1,
            minimumValue: 0.3,
          }
        },
        shape: { 
          type: "circle" 
        },
      },
      detectRetina: true,
    }),
    []
  );

  if (!init) return null;

  return (
    <Particles 
      id="tsparticles-hero" 
      options={options}
      className="absolute inset-0 z-0"
    />
  );
}
