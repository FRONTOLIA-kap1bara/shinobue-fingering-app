'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Download, Plus, Trash2 } from 'lucide-react';
import jsPDF from 'jspdf';

interface Page {
  id: string;
  fingeringData: Record<string, boolean>;
}

interface HolePosition {
  id: string;
  x: number;
  y: number;
  radius: number;
}

// 正確に検出された穴の位置データ
const HOLE_POSITIONS: HolePosition[] = [
  { id: 'hole-15', x: 585.2, y: 194.8, radius: 23.0 },
  { id: 'hole-16', x: 830.0, y: 194.8, radius: 23.0 },
  { id: 'hole-17', x: 643.9, y: 194.8, radius: 23.0 },
  { id: 'hole-18', x: 949.1, y: 194.9, radius: 23.0 },
  { id: 'hole-19', x: 704.1, y: 194.9, radius: 23.0 },
  { id: 'hole-20', x: 215.2, y: 195.1, radius: 20.6 },
  { id: 'hole-21', x: 889.6, y: 195.1, radius: 23.0 },
  { id: 'hole-22', x: 1013.6, y: 195.1, radius: 17.2 },
  { id: 'hole-24', x: 889.5, y: 283.8, radius: 23.0 },
  { id: 'hole-25', x: 830.0, y: 283.9, radius: 23.0 },
  { id: 'hole-26', x: 704.2, y: 283.9, radius: 23.0 },
  { id: 'hole-27', x: 643.8, y: 283.9, radius: 23.0 },
  { id: 'hole-28', x: 585.1, y: 283.9, radius: 23.0 },
  { id: 'hole-29', x: 949.1, y: 283.9, radius: 23.0 },
  { id: 'hole-30', x: 215.0, y: 284.0, radius: 20.6 },
  { id: 'hole-31', x: 1013.6, y: 284.1, radius: 17.2 },
  { id: 'hole-33', x: 889.7, y: 373.6, radius: 22.9 },
  { id: 'hole-34', x: 214.9, y: 373.6, radius: 20.5 },
  { id: 'hole-35', x: 1013.5, y: 373.8, radius: 17.1 },
  { id: 'hole-36', x: 830.1, y: 373.9, radius: 23.0 },
  { id: 'hole-37', x: 949.0, y: 373.9, radius: 23.0 },
  { id: 'hole-38', x: 704.0, y: 373.9, radius: 22.9 },
  { id: 'hole-39', x: 585.0, y: 373.9, radius: 23.0 },
  { id: 'hole-40', x: 644.0, y: 374.0, radius: 23.0 },
  { id: 'hole-42', x: 585.0, y: 462.9, radius: 23.0 },
  { id: 'hole-43', x: 830.0, y: 462.9, radius: 23.0 },
  { id: 'hole-44', x: 948.9, y: 463.0, radius: 23.0 },
  { id: 'hole-45', x: 644.2, y: 463.0, radius: 23.0 },
  { id: 'hole-46', x: 703.9, y: 463.2, radius: 22.9 },
  { id: 'hole-47', x: 889.6, y: 463.4, radius: 22.9 },
  { id: 'hole-48', x: 215.0, y: 463.4, radius: 20.5 },
  { id: 'hole-49', x: 1013.7, y: 463.8, radius: 17.2 },
  { id: 'hole-51', x: 644.0, y: 552.8, radius: 22.9 },
  { id: 'hole-52', x: 585.0, y: 552.9, radius: 23.0 },
  { id: 'hole-53', x: 829.9, y: 552.9, radius: 23.0 },
  { id: 'hole-54', x: 948.9, y: 552.9, radius: 23.0 },
  { id: 'hole-55', x: 889.6, y: 553.0, radius: 23.0 },
  { id: 'hole-56', x: 704.1, y: 553.0, radius: 22.9 },
  { id: 'hole-57', x: 215.0, y: 553.1, radius: 20.5 },
  { id: 'hole-58', x: 1013.6, y: 553.4, radius: 17.1 },
  { id: 'hole-60', x: 585.1, y: 642.8, radius: 23.0 },
  { id: 'hole-61', x: 830.0, y: 642.8, radius: 23.0 },
  { id: 'hole-62', x: 643.9, y: 642.8, radius: 23.0 },
  { id: 'hole-63', x: 949.1, y: 642.9, radius: 23.0 },
  { id: 'hole-64', x: 704.1, y: 642.9, radius: 23.0 },
  { id: 'hole-65', x: 215.2, y: 643.1, radius: 20.6 },
  { id: 'hole-66', x: 889.6, y: 643.1, radius: 23.0 },
  { id: 'hole-67', x: 1013.6, y: 643.1, radius: 17.2 },
  { id: 'hole-69', x: 889.7, y: 732.6, radius: 22.9 },
  { id: 'hole-70', x: 1013.5, y: 732.8, radius: 17.1 },
  { id: 'hole-71', x: 215.0, y: 732.9, radius: 20.5 },
  { id: 'hole-72', x: 830.1, y: 733.0, radius: 23.0 },
  { id: 'hole-73', x: 704.0, y: 733.0, radius: 23.0 },
  { id: 'hole-74', x: 948.9, y: 733.0, radius: 23.0 },
  { id: 'hole-75', x: 585.0, y: 733.0, radius: 23.0 },
  { id: 'hole-76', x: 644.0, y: 733.2, radius: 23.0 },
  { id: 'hole-78', x: 585.0, y: 822.1, radius: 23.0 },
  { id: 'hole-79', x: 644.2, y: 822.1, radius: 23.0 },
  { id: 'hole-80', x: 830.0, y: 822.3, radius: 23.0 },
  { id: 'hole-81', x: 948.8, y: 822.3, radius: 23.0 },
  { id: 'hole-82', x: 703.8, y: 822.3, radius: 22.9 },
  { id: 'hole-83', x: 889.7, y: 822.4, radius: 22.9 },
  { id: 'hole-84', x: 215.0, y: 822.5, radius: 20.5 },
  { id: 'hole-85', x: 1013.7, y: 822.7, radius: 17.2 },
  { id: 'hole-87', x: 584.9, y: 911.8, radius: 23.0 },
  { id: 'hole-88', x: 644.0, y: 911.9, radius: 22.9 },
  { id: 'hole-89', x: 948.8, y: 911.9, radius: 23.0 },
  { id: 'hole-90', x: 829.8, y: 912.0, radius: 23.0 },
  { id: 'hole-91', x: 704.1, y: 912.0, radius: 22.9 },
  { id: 'hole-92', x: 889.6, y: 912.0, radius: 23.0 },
  { id: 'hole-93', x: 215.2, y: 912.1, radius: 20.5 },
  { id: 'hole-95', x: 1013.6, y: 912.5, radius: 17.1 },
  { id: 'hole-96', x: 585.2, y: 1001.8, radius: 23.0 },
  { id: 'hole-97', x: 830.1, y: 1001.8, radius: 23.0 },
  { id: 'hole-98', x: 643.8, y: 1001.8, radius: 23.0 },
  { id: 'hole-99', x: 889.5, y: 1001.9, radius: 23.0 },
  { id: 'hole-100', x: 704.2, y: 1002.0, radius: 23.0 },
  { id: 'hole-101', x: 949.1, y: 1002.0, radius: 23.0 },
  { id: 'hole-102', x: 215.2, y: 1002.1, radius: 20.5 },
  { id: 'hole-103', x: 1013.6, y: 1002.4, radius: 17.2 },
  { id: 'hole-105', x: 889.6, y: 1091.8, radius: 22.9 },
  { id: 'hole-106', x: 1013.5, y: 1092.0, radius: 17.1 },
  { id: 'hole-107', x: 215.0, y: 1092.1, radius: 20.5 },
  { id: 'hole-108', x: 830.0, y: 1092.2, radius: 23.0 },
  { id: 'hole-109', x: 704.1, y: 1092.2, radius: 22.9 },
  { id: 'hole-110', x: 949.0, y: 1092.2, radius: 23.0 },
  { id: 'hole-111', x: 585.0, y: 1092.2, radius: 23.0 },
  { id: 'hole-112', x: 644.0, y: 1092.4, radius: 23.0 },
  { id: 'hole-114', x: 585.0, y: 1181.1, radius: 23.0 },
  { id: 'hole-115', x: 644.2, y: 1181.1, radius: 23.0 },
  { id: 'hole-116', x: 830.0, y: 1181.3, radius: 23.0 },
  { id: 'hole-117', x: 948.8, y: 1181.3, radius: 23.0 },
  { id: 'hole-118', x: 703.8, y: 1181.3, radius: 22.9 },
  { id: 'hole-119', x: 889.7, y: 1181.4, radius: 22.9 },
  { id: 'hole-120', x: 215.0, y: 1181.5, radius: 20.5 },
  { id: 'hole-121', x: 1013.7, y: 1181.7, radius: 17.2 },
  { id: 'hole-123', x: 584.9, y: 1270.8, radius: 23.0 },
  { id: 'hole-124', x: 644.0, y: 1270.9, radius: 22.9 },
  { id: 'hole-125', x: 948.8, y: 1270.9, radius: 23.0 },
  { id: 'hole-126', x: 829.8, y: 1271.0, radius: 23.0 },
  { id: 'hole-127', x: 704.1, y: 1271.0, radius: 22.9 },
  { id: 'hole-128', x: 889.6, y: 1271.0, radius: 23.0 },
  { id: 'hole-129', x: 215.2, y: 1271.1, radius: 20.5 },
  { id: 'hole-131', x: 1013.6, y: 1271.5, radius: 17.1 },
  { id: 'hole-132', x: 585.2, y: 1360.8, radius: 23.0 },
  { id: 'hole-133', x: 830.1, y: 1360.8, radius: 23.0 },
  { id: 'hole-134', x: 643.8, y: 1360.8, radius: 23.0 },
  { id: 'hole-135', x: 889.5, y: 1360.9, radius: 23.0 },
  { id: 'hole-136', x: 704.2, y: 1361.0, radius: 23.0 },
  { id: 'hole-137', x: 949.1, y: 1361.0, radius: 23.0 },
  { id: 'hole-138', x: 215.2, y: 1361.1, radius: 20.5 },
  { id: 'hole-139', x: 1013.6, y: 1361.4, radius: 17.2 },
  { id: 'hole-141', x: 889.6, y: 1450.8, radius: 22.9 },
  { id: 'hole-142', x: 1013.5, y: 1451.0, radius: 17.1 },
  { id: 'hole-143', x: 215.0, y: 1451.1, radius: 20.5 },
  { id: 'hole-144', x: 830.0, y: 1451.2, radius: 23.0 },
  { id: 'hole-145', x: 704.1, y: 1451.2, radius: 22.9 },
  { id: 'hole-146', x: 949.0, y: 1451.2, radius: 23.0 },
  { id: 'hole-147', x: 585.0, y: 1451.2, radius: 23.0 },
  { id: 'hole-148', x: 644.0, y: 1451.4, radius: 23.0 },
  { id: 'hole-150', x: 585.0, y: 1540.1, radius: 23.0 },
  { id: 'hole-151', x: 644.2, y: 1540.1, radius: 23.0 },
  { id: 'hole-152', x: 830.0, y: 1540.3, radius: 23.0 },
  { id: 'hole-153', x: 948.8, y: 1540.3, radius: 23.0 },
  { id: 'hole-154', x: 703.8, y: 1540.3, radius: 22.9 },
  { id: 'hole-155', x: 889.7, y: 1540.4, radius: 22.9 },
  { id: 'hole-156', x: 215.0, y: 1540.5, radius: 20.5 },
  { id: 'hole-157', x: 1013.7, y: 1540.7, radius: 17.2 },
  { id: 'hole-159', x: 584.9, y: 1629.8, radius: 23.0 },
  { id: 'hole-160', x: 644.0, y: 1629.9, radius: 22.9 },
  { id: 'hole-161', x: 948.8, y: 1629.9, radius: 23.0 },
  { id: 'hole-162', x: 829.8, y: 1630.0, radius: 23.0 },
  { id: 'hole-163', x: 704.1, y: 1630.0, radius: 22.9 },
  { id: 'hole-164', x: 889.6, y: 1630.0, radius: 23.0 },
  { id: 'hole-165', x: 215.2, y: 1630.1, radius: 20.5 },
  { id: 'hole-167', x: 1013.6, y: 1630.5, radius: 17.1 },
  { id: 'hole-168', x: 585.2, y: 1719.8, radius: 23.0 },
  { id: 'hole-169', x: 830.1, y: 1719.8, radius: 23.0 },
  { id: 'hole-170', x: 643.8, y: 1719.8, radius: 23.0 },
  { id: 'hole-171', x: 889.5, y: 1719.9, radius: 23.0 },
  { id: 'hole-172', x: 704.2, y: 1720.0, radius: 23.0 },
  { id: 'hole-173', x: 949.1, y: 1720.0, radius: 23.0 },
  { id: 'hole-174', x: 215.2, y: 1720.1, radius: 20.5 },
  { id: 'hole-175', x: 1013.6, y: 1720.4, radius: 17.2 },
  { id: 'hole-177', x: 889.6, y: 1809.8, radius: 22.9 },
  { id: 'hole-178', x: 1013.5, y: 1810.0, radius: 17.1 },
  { id: 'hole-179', x: 215.0, y: 1810.1, radius: 20.5 },
  { id: 'hole-180', x: 830.0, y: 1810.2, radius: 23.0 },
  { id: 'hole-181', x: 704.1, y: 1810.2, radius: 22.9 },
  { id: 'hole-182', x: 949.0, y: 1810.2, radius: 23.0 },
  { id: 'hole-183', x: 585.0, y: 1810.2, radius: 23.0 },
  { id: 'hole-184', x: 644.0, y: 1810.4, radius: 23.0 },
  { id: 'hole-186', x: 585.0, y: 1899.1, radius: 23.0 },
  { id: 'hole-187', x: 644.2, y: 1899.1, radius: 23.0 },
  { id: 'hole-188', x: 830.0, y: 1899.3, radius: 23.0 },
  { id: 'hole-189', x: 948.8, y: 1899.3, radius: 23.0 },
  { id: 'hole-190', x: 703.8, y: 1899.3, radius: 22.9 },
  { id: 'hole-191', x: 889.7, y: 1899.4, radius: 22.9 },
  { id: 'hole-192', x: 215.0, y: 1899.5, radius: 20.5 },
  { id: 'hole-193', x: 1013.7, y: 1899.7, radius: 17.2 },
];

export default function Home() {
  const [songTitle, setSongTitle] = React.useState('');
  const [pages, setPages] = React.useState<Page[]>([
    { id: '1', fingeringData: {} },
  ]);
  const [currentPageIndex, setCurrentPageIndex] = React.useState(0);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const currentPage = pages[currentPageIndex];

  const toggleHole = (holeId: string) => {
    const newPages = [...pages];
    newPages[currentPageIndex].fingeringData[holeId] =
      !newPages[currentPageIndex].fingeringData[holeId];
    setPages(newPages);
  };

  const addPage = () => {
    const newPages = [...pages];
    newPages.push({ id: String(newPages.length + 1), fingeringData: {} });
    setPages(newPages);
    setCurrentPageIndex(newPages.length - 1);
  };

  const deletePage = (index: number) => {
    if (pages.length === 1) return;
    const newPages = pages.filter((_, i) => i !== index);
    setPages(newPages);
    setCurrentPageIndex(Math.max(0, index - 1));
  };

  const downloadAsImage = async (format: 'png' | 'jpg') => {
    const imgElement = containerRef.current?.querySelector('img') as HTMLImageElement;
    const svgElement = containerRef.current?.querySelector('svg') as SVGSVGElement;

    if (!imgElement || !svgElement) return;

    try {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const scale = 2;
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.drawImage(img, 0, 0, img.width * scale, img.height * scale);

        const svgViewBox = svgElement.getAttribute('viewBox')?.split(' ') || ['0', '0', '1414', '2000'];
        const svgWidth = parseFloat(svgViewBox[2]);
        const svgHeight = parseFloat(svgViewBox[3]);
        const scaleX = (img.width * scale) / svgWidth;
        const scaleY = (img.height * scale) / svgHeight;

        HOLE_POSITIONS.forEach((hole) => {
          if (currentPage.fingeringData[hole.id]) {
            const x = hole.x * scaleX;
            const y = hole.y * scaleY;
            const r = (hole.radius - 1) * Math.min(scaleX, scaleY);

            ctx.fillStyle = '#ef4444';
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2);
            ctx.fill();
          }
        });

        const link = document.createElement('a');
        link.href = canvas.toDataURL(`image/${format}`);
        link.download = `${songTitle || '篠笛運指表'}.${format}`;
        link.click();
      };
      img.src = imgElement.src;
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const downloadAsPDF = async () => {
    const imgElement = containerRef.current?.querySelector('img') as HTMLImageElement;
    const svgElement = containerRef.current?.querySelector('svg') as SVGSVGElement;

    if (!imgElement || !svgElement) return;

    try {
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      for (let i = 0; i < pages.length; i++) {
        const pageData = pages[i];

        const img = new Image();
        img.crossOrigin = 'anonymous';
        await new Promise((resolve) => {
          img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            if (!ctx) {
              resolve(null);
              return;
            }

            const scale = 2;
            canvas.width = img.width * scale;
            canvas.height = img.height * scale;

            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.drawImage(img, 0, 0, img.width * scale, img.height * scale);

            const svgViewBox = svgElement.getAttribute('viewBox')?.split(' ') || ['0', '0', '1414', '2000'];
            const svgWidth = parseFloat(svgViewBox[2]);
            const svgHeight = parseFloat(svgViewBox[3]);
            const scaleX = (img.width * scale) / svgWidth;
            const scaleY = (img.height * scale) / svgHeight;

            HOLE_POSITIONS.forEach((hole) => {
              if (pageData.fingeringData[hole.id]) {
                const x = hole.x * scaleX;
                const y = hole.y * scaleY;
                const r = (hole.radius - 1) * Math.min(scaleX, scaleY);

                ctx.fillStyle = '#ef4444';
                ctx.beginPath();
                ctx.arc(x, y, r, 0, Math.PI * 2);
                ctx.fill();
              }
            });

            const imgData = canvas.toDataURL('image/png');
            const imgWidth = 210;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            if (i > 0) {
              pdf.addPage();
            }
            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
            resolve(null);
          };
          img.src = imgElement.src;
        });
      }

      pdf.save(`${songTitle || '篠笛運指表'}.pdf`);
    } catch (error) {
      console.error('PDF download failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-slate-900">篠笛運指表作成アプリ</h1>
          <p className="text-slate-600 mt-1">曲に合わせて運指表を作成・カスタマイズできます</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Song Title Input */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <label className="block text-sm font-semibold text-slate-700 mb-2">曲名</label>
          <Input
            type="text"
            placeholder="曲名を入力してください"
            value={songTitle}
            onChange={(e) => setSongTitle(e.target.value)}
            className="w-full max-w-md"
          />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Fingering Chart */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div ref={containerRef} className="p-8 bg-white">
                {/* Song Title Display */}
                {songTitle && (
                  <h2 className="text-2xl font-bold text-center mb-6 text-slate-900">
                    {songTitle}
                  </h2>
                )}

                {/* Fingering Chart Image Container */}
                <div className="relative w-full" style={{ paddingBottom: '141.4%' }}>
                  {/* Image */}
                  <img
                    src="/hue-unshihyo.png"
                    alt="篠笛運指表"
                    className="absolute top-0 left-0 w-full h-full block"
                    style={{ objectFit: 'contain' }}
                  />

                  {/* SVG Overlay with holes - Fixed aspect ratio */}
                  <svg
                    className="absolute top-0 left-0 w-full h-full"
                    viewBox="0 0 1414 2000"
                    preserveAspectRatio="xMidYMid meet"
                    style={{ pointerEvents: 'auto' }}
                  >
                    {/* Draw red circles for active holes */}
                    {HOLE_POSITIONS.map((hole) => (
                      currentPage.fingeringData[hole.id] && (
                        <circle
                          key={`filled-${hole.id}`}
                          cx={hole.x}
                          cy={hole.y}
                          r={hole.radius - 1}
                          fill="#ef4444"
                          style={{ pointerEvents: 'none' }}
                        />
                      )
                    ))}

                    {/* Interactive circles for clicking */}
                    {HOLE_POSITIONS.map((hole) => (
                      <circle
                        key={hole.id}
                        cx={hole.x}
                        cy={hole.y}
                        r={hole.radius}
                        fill="transparent"
                        style={{ cursor: 'pointer', pointerEvents: 'auto' }}
                        onClick={() => toggleHole(hole.id)}
                      />
                    ))}
                  </svg>
                </div>
              </div>

              {/* Copyright - Not included in download */}
              <p className="text-center text-xs text-slate-500 mt-8 pb-8 px-8">
                © 2025 FRONTOLIAインターネット 原田颯真. All rights reserved.
              </p>
            </div>
          </div>

          {/* Sidebar Controls */}
          <div className="lg:col-span-1 space-y-4">
            {/* Download Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">
                ダウンロード
              </h3>
              <div className="space-y-2">
                <Button
                  onClick={() => downloadAsImage('png')}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                >
                  <Download className="mr-2 h-4 w-4" />
                  PNG形式
                </Button>
                <Button
                  onClick={() => downloadAsImage('jpg')}
                  className="w-full bg-green-500 hover:bg-green-600 text-white"
                >
                  <Download className="mr-2 h-4 w-4" />
                  JPG形式
                </Button>
                <Button
                  onClick={downloadAsPDF}
                  className="w-full bg-red-500 hover:bg-red-600 text-white"
                >
                  <Download className="mr-2 h-4 w-4" />
                  PDF形式
                </Button>
              </div>
            </div>

            {/* Page Management */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">
                ページ管理
              </h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {pages.map((page, index) => (
                  <div
                    key={page.id}
                    className={`p-3 rounded-lg cursor-pointer transition ${
                      currentPageIndex === index
                        ? 'bg-blue-100 border-2 border-blue-500'
                        : 'bg-slate-100 border-2 border-transparent hover:bg-slate-200'
                    }`}
                    onClick={() => setCurrentPageIndex(index)}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-slate-900">
                        ページ {index + 1}
                      </span>
                      {pages.length > 1 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deletePage(index);
                          }}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <Button
                onClick={addPage}
                className="w-full mt-4 bg-slate-700 hover:bg-slate-800 text-white"
              >
                <Plus className="mr-2 h-4 w-4" />
                ページを追加
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
