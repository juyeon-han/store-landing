interface KarrotPixel {
  track: (event: string) => void;
  init: (id: string) => void;
}

declare global {
  interface Window {
    karrotPixel?: KarrotPixel;
  }
}

export {};
