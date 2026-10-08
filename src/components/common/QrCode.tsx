import React, { useMemo } from 'react';

interface QrCodeProps {
  value: string;
  size?: number;
  className?: string;
  centerLogo?: React.ReactNode;
}

export const QrCode: React.FC<QrCodeProps> = ({
  value,
  size = 180,
  className = '',
  centerLogo,
}) => {
  // Deterministic 25x25 QR-like matrix generator based on seed/hash
  const grid = useMemo(() => {
    const dim = 25;
    const matrix: boolean[][] = Array.from({ length: dim }, () => Array(dim).fill(false));

    // Simple hash for value
    let hash = 0;
    for (let i = 0; i < value.length; i++) {
      hash = (hash << 5) - hash + value.charCodeAt(i);
      hash |= 0;
    }

    const drawFinder = (rStart: number, cStart: number) => {
      for (let r = 0; r < 7; r++) {
        for (let c = 0; c < 7; c++) {
          const isBorder = r === 0 || r === 6 || c === 0 || c === 6;
          const isCenter = r >= 2 && r <= 4 && c >= 2 && c <= 4;
          matrix[rStart + r][cStart + c] = isBorder || isCenter;
        }
      }
    };

    // Draw three finder patterns
    drawFinder(0, 0);
    drawFinder(0, dim - 7);
    drawFinder(dim - 7, 0);

    // Timing lines
    for (let i = 8; i < dim - 8; i++) {
      matrix[6][i] = i % 2 === 0;
      matrix[i][6] = i % 2 === 0;
    }

    // Fill data areas deterministically
    let seed = Math.abs(hash) || 1234567;
    for (let r = 0; r < dim; r++) {
      for (let c = 0; c < dim; c++) {
        // Skip finder zones
        const inFinder1 = r < 8 && c < 8;
        const inFinder2 = r < 8 && c >= dim - 8;
        const inFinder3 = r >= dim - 8 && c < 8;
        // Skip center logo zone if centerLogo present
        const inCenterLogo = centerLogo && r >= 9 && r <= 15 && c >= 9 && c <= 15;

        if (!inFinder1 && !inFinder2 && !inFinder3 && !inCenterLogo) {
          seed = (seed * 9301 + 49297) % 233280;
          matrix[r][c] = seed / 233280 > 0.48;
        }
      }
    }

    return { dim, matrix };
  }, [value, centerLogo]);

  return (
    <div
      style={{ width: size, height: size }}
      className={`relative p-3 bg-white rounded-2xl shadow-inner flex items-center justify-center ${className}`}
    >
      <svg
        viewBox={`0 0 ${grid.dim} ${grid.dim}`}
        className="w-full h-full text-slate-900"
        shapeRendering="crispEdges"
      >
        {grid.matrix.map((row, r) =>
          row.map((active, c) =>
            active ? (
              <rect
                key={`${r}-${c}`}
                x={c}
                y={r}
                width={1}
                height={1}
                fill="currentColor"
              />
            ) : null
          )
        )}
      </svg>

      {centerLogo && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="p-1 bg-white rounded-lg shadow-sm">
            {centerLogo}
          </div>
        </div>
      )}
    </div>
  );
};
