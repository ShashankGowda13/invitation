import React, { useRef, useEffect, useState } from 'react';

const ScratchCard = ({ children, width = 300, height = 100 }) => {
  const canvasRef = useRef(null);
  const [isScratched, setIsScratched] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Fill with a gold/metallic color
    ctx.fillStyle = '#b89947'; // Gold
    ctx.fillRect(0, 0, width, height);

    // Add some text instruction on the scratch layer
    ctx.fillStyle = '#ffffff';
    ctx.font = '16px Montserrat';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Scratch to Reveal', width / 2, height / 2);

    let isDrawing = false;

    const scratch = (e) => {
      if (!isDrawing) return;
      
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
      const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;

      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, Math.PI * 2);
      ctx.fill();
      
      checkScratched();
    };

    const checkScratched = () => {
      const imageData = ctx.getImageData(0, 0, width, height);
      let transparentPixels = 0;
      for (let i = 3; i < imageData.data.length; i += 4) {
        if (imageData.data[i] === 0) transparentPixels++;
      }
      
      const totalPixels = width * height;
      const scratchedPercentage = (transparentPixels / totalPixels) * 100;
      
      // If 50% scratched, reveal completely
      if (scratchedPercentage > 50 && !isScratched) {
        setIsScratched(true);
      }
    };

    const handleDown = (e) => { isDrawing = true; scratch(e); };
    const handleUp = () => { isDrawing = false; };
    const handleMove = (e) => { e.preventDefault(); scratch(e); }; // prevent scrolling while scratching

    canvas.addEventListener('mousedown', handleDown);
    canvas.addEventListener('mousemove', handleMove, { passive: false });
    window.addEventListener('mouseup', handleUp);

    canvas.addEventListener('touchstart', handleDown, { passive: true });
    canvas.addEventListener('touchmove', handleMove, { passive: false });
    window.addEventListener('touchend', handleUp);

    return () => {
      canvas.removeEventListener('mousedown', handleDown);
      canvas.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleUp);
      
      canvas.removeEventListener('touchstart', handleDown);
      canvas.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleUp);
    };
  }, [width, height, isScratched]);

  return (
    <div style={{ position: 'relative', width, height, margin: '0 auto', userSelect: 'none' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid var(--gold)' }}>
        {children}
      </div>
      <canvas 
        ref={canvasRef} 
        width={width} 
        height={height} 
        style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          zIndex: 2, 
          cursor: 'crosshair',
          borderRadius: '10px',
          opacity: isScratched ? 0 : 1,
          transition: 'opacity 0.5s ease',
          pointerEvents: isScratched ? 'none' : 'auto'
        }} 
      />
    </div>
  );
};

export default ScratchCard;
