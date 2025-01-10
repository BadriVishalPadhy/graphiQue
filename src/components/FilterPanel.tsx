import React, { useState, useRef, useEffect } from 'react';
import { Sliders, Sun, Contrast, Droplet, RefreshCw, Upload, Download } from 'lucide-react';

interface FilterAdjustments {
  brightness: number;
  contrast: number;
  saturation: number;
  blur: number;
}

const FilterPanel = () => {
  const [filters, setFilters] = useState<FilterAdjustments>({
    brightness: 100,
    contrast: 100,
    saturation: 100,
    blur: 0,
  });
  const [image, setImage] = useState<string | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFilterChange = (filterType: keyof FilterAdjustments, value: number) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
  };

  const resetFilters = () => {
    setFilters({
      brightness: 100,
      contrast: 100,
      saturation: 100,
      blur: 0,
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setImage(event.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const applyFilters = () => {
    if (!image || !canvasRef.current || !imageRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imageRef.current;

    // Fixed dimensions for the canvas
    const fixedHeight = 400; // Adjust this height as needed
    const aspectRatio = img.naturalWidth / img.naturalHeight;
    const fixedWidth = fixedHeight * aspectRatio;

    canvas.width = fixedWidth;
    canvas.height = fixedHeight;

    ctx.clearRect(0, 0, fixedWidth, fixedHeight);

    const filterString = `
      brightness(${filters.brightness / 100})
      contrast(${filters.contrast}%)
      saturate(${filters.saturation}%)
      blur(${filters.blur}px)
    `.trim();

    ctx.filter = filterString;
    ctx.drawImage(img, 0, 0, fixedWidth, fixedHeight);
  };

  useEffect(() => {
    applyFilters();
  }, [filters, image]);

  const saveImage = () => {
    if (!canvasRef.current) return;
    const link = document.createElement('a');
    link.download = 'filtered-image.png';
    link.href = canvasRef.current.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="w-full min-h-screen bg-gray-900 p-4">
      <div className="w-full max-w-5xl bg-gray-800 p-6 rounded-xl shadow-xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-200 flex items-center gap-2">
            <Sliders className="w-6 h-6" />
            Image Filters
          </h3>
          <div className="flex gap-2">
            <label className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer">
              <Upload className="mr-2 w-4 h-4" />
              Upload Image
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
            {image && (
              <>
                <button
                  onClick={saveImage}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg"
                >
                  <Download className="mr-2 w-4 h-4" />
                  Save
                </button>
                <button
                  onClick={resetFilters}
                  className="text-gray-400 hover:text-gray-200 p-2 rounded-md"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </div>

        <div className="flex gap-8">
          <div className="w-64 space-y-4">
            {['Brightness', 'Contrast', 'Saturation', 'Blur'].map((label, index) => (
              <div key={index} className="space-y-2">
                <label className="flex items-center gap-2 text-gray-200">
                  <Sun className="w-4 h-4" />
                  {label}
                </label>
                <input
                  type="range"
                  min="0"
                  max={label === 'Blur' ? 10 : 200}
                  value={filters[label.toLowerCase() as keyof FilterAdjustments]}
                  onChange={(e) =>
                    handleFilterChange(
                      label.toLowerCase() as keyof FilterAdjustments,
                      Number(e.target.value)
                    )
                  }
                  className="w-full h-2 bg-gray-700 rounded-lg"
                />
              </div>
            ))}
          </div>

          <div className="flex-1 flex items-center justify-center bg-gray-900 border border-gray-600 rounded-lg overflow-hidden">
            {image ? (
              <>
                <img
                  ref={imageRef}
                  src={image}
                  alt="Uploaded"
                  className="hidden"
                  onLoad={applyFilters}
                />
                <canvas ref={canvasRef} className="rounded-lg" />
              </>
            ) : (
              <p className="text-gray-400">Upload an image to start editing.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
