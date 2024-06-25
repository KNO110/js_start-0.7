document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const shapeSelect = document.getElementById('shape');
  const colorInput = document.getElementById('color');
  
  let isDrawing = false;
  let startX, startY;

  const getShape = () => shapeSelect.value;
  const getColor = () => colorInput.value;

  const drawShape = (shape, color, x, y, width, height) => {
      ctx.fillStyle = color;
      ctx.beginPath();
      
      if (shape === 'rectangle') {
          ctx.fillRect(x, y, width, height);
      } else if (shape === 'circle') {
          const radius = Math.min(Math.abs(width), Math.abs(height)) / 2;
          ctx.arc(x + radius, y + radius, radius, 0, 2 * Math.PI);
          ctx.fill();
      } else if (shape === 'diamond') {
          ctx.moveTo(x + width / 2, y);
          ctx.lineTo(x + width, y + height / 2);
          ctx.lineTo(x + width / 2, y + height);
          ctx.lineTo(x, y + height / 2);
          ctx.closePath();
          ctx.fill();
      } else if (shape === 'triangle') {
          ctx.moveTo(x + width / 2, y);
          ctx.lineTo(x + width, y + height);
          ctx.lineTo(x, y + height);
          ctx.closePath();
          ctx.fill();
      }
      
      ctx.closePath();
  };

  canvas.addEventListener('mousedown', (e) => {
      isDrawing = true;
      startX = e.offsetX;
      startY = e.offsetY;
  });

  canvas.addEventListener('mouseup', (e) => {
      if (!isDrawing) return;
      
      isDrawing = false;
      const endX = e.offsetX;
      const endY = e.offsetY;
      const width = endX - startX;
      const height = endY - startY;
      
      const shape = getShape();
      const color = getColor();
      
      drawShape(shape, color, startX, startY, width, height);
  });
});
