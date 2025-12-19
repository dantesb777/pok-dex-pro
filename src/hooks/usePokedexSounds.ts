import { useCallback, useRef } from 'react';

type SoundType = 'click' | 'select' | 'open' | 'close' | 'search' | 'hover';

// Create oscillator-based retro sounds
const createSound = (type: SoundType): (() => void) => {
  return () => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    switch (type) {
      case 'click':
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
        break;
        
      case 'select':
        oscillator.frequency.setValueAtTime(523, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(659, audioContext.currentTime + 0.08);
        oscillator.frequency.setValueAtTime(784, audioContext.currentTime + 0.16);
        gainNode.gain.setValueAtTime(0.25, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.25);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.25);
        break;
        
      case 'open':
        oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.15);
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.2);
        break;
        
      case 'close':
        oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.15);
        gainNode.gain.setValueAtTime(0.25, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.15);
        break;
        
      case 'search':
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(1200, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.05);
        gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.05);
        break;
        
      case 'hover':
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.08, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.03);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.03);
        break;
    }
  };
};

export function usePokedexSounds() {
  const lastHoverTime = useRef(0);
  
  const playClick = useCallback(() => createSound('click')(), []);
  const playSelect = useCallback(() => createSound('select')(), []);
  const playOpen = useCallback(() => createSound('open')(), []);
  const playClose = useCallback(() => createSound('close')(), []);
  const playSearch = useCallback(() => createSound('search')(), []);
  
  const playHover = useCallback(() => {
    const now = Date.now();
    if (now - lastHoverTime.current > 50) {
      lastHoverTime.current = now;
      createSound('hover')();
    }
  }, []);
  
  return {
    playClick,
    playSelect,
    playOpen,
    playClose,
    playSearch,
    playHover,
  };
}
