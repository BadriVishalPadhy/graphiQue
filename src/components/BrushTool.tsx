import React, { useState, useRef, useEffect } from 'react';
import { Upload, Download, Undo } from 'lucide-react';

const BrushTool = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushColor, setBrushColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(5);
  const [opacity, setOpacity] = useState(1);
  const [hasImage, setHasImage] = useState(false);
  const [undoStack, setUndoStack] = useState([]);
  
  // Add constants for maximum dimensions
  const MAX_WIDTH = 800;
  const MAX_HEIGHT = 600;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, []);

  const calculateAspectRatioFit = (srcWidth, srcHeight, maxWidth, maxHeight) => {
    const ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
    return {
      width: Math.floor(srcWidth * ratio),
      height: Math.floor(srcHeight * ratio)
    };
  };

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Save current canvas state for undo
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setUndoStack([...undoStack, imageData]);

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.strokeStyle = brushColor;
    ctx.lineWidth = brushSize;
    ctx.globalAlpha = opacity;
    
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.closePath();
    setIsDrawing(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        
        // Calculate new dimensions while maintaining aspect ratio
        const dimensions = calculateAspectRatioFit(
          img.width,
          img.height,
          MAX_WIDTH,
          MAX_HEIGHT
        );
        
        // Set canvas size to the calculated dimensions
        canvas.width = dimensions.width;
        canvas.height = dimensions.height;
        
        // Clear canvas and draw resized image
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, dimensions.width, dimensions.height);
        setHasImage(true);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const saveImage = () => {
    const canvas = canvasRef.current;
    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'drawing.png';
    link.href = image;
    link.click();
  };

  const undoLastAction = () => {
    if (undoStack.length > 0) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const lastState = undoStack[undoStack.length - 1];
      ctx.putImageData(lastState, 0, 0);
      setUndoStack(undoStack.slice(0, -1));
    }
  };

  return (
    <div className="flex flex-col items-center p-4 space-y-4 bg-gray-100 rounded-lg">
      <div className="flex space-x-4 w-full justify-center">
        <div className="space-y-2">
          <label className="block text-sm font-medium">Color</label>
          <input
            type="color"
            value={brushColor}
            onChange={(e) => setBrushColor(e.target.value)}
            className="w-12 h-8 cursor-pointer"
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium">Brush Size</label>
          <input
            type="range"
            min="1"
            max="50"
            value={brushSize}
            onChange={(e) => setBrushSize(parseInt(e.target.value))}
            className="w-32"
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium">Opacity</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={opacity}
            onChange={(e) => setOpacity(parseFloat(e.target.value))}
            className="w-32"
          />
        </div>
      </div>

      <div className="flex space-x-4">
        <label className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600">
          <Upload className="w-4 h-4 mr-2" />
          Upload Image
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>

        <button
          onClick={saveImage}
          disabled={!hasImage}
          className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Download className="w-4 h-4 mr-2" />
          Save
        </button>

        <button
          onClick={undoLastAction}
          disabled={undoStack.length === 0}
          className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Undo className="w-4 h-4 mr-2" />
          Undo
        </button>
      </div>

      <canvas
        ref={canvasRef}
        width={MAX_WIDTH}
        height={MAX_HEIGHT}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseOut={stopDrawing}
        className="border border-gray-300 bg-white rounded-lg cursor-crosshair"
      />
    </div>
  );
};

export default BrushTool;