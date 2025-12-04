---
layout: null
nav: false
---

<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hexagonales Gitter Visualisierung</title>
    <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <style>
        body { 
            margin: 0; 
            padding: 0; 
            overflow: hidden; 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
    </style>
</head>
<body>
    <div id="root"></div>
    <script type="text/babel">
        const { useState, useEffect, useRef } = React;

        // Globale Farbkonstanten
        const COLORS = {
          background: '#0f172a',
          unitCircle: '#475569',
          tangent: '#60a5fa',
          tangentFill: 'rgba(96, 165, 250, 0.1)',
          latticePoint: '#3b82f6',
          intersectionPoint: '#ef4444',
          angleControl: '#ef4444',
          angleControlRing: '#334155',
          angleArc: '#fbbf24',
          infoBackground: 'rgba(15, 23, 42, 0.9)',
          infoText: '#e2e8f0',
          infoTextSecondary: '#94a3b8'
        };

        const HexagonalLatticeViz = () => {
          const canvasRef = useRef(null);
          const [theta, setTheta] = useState(0);
          const [zoom, setZoom] = useState(80);
          const [pan, setPan] = useState({ x: 0, y: 0 });
          const [isDragging, setIsDragging] = useState(false);
          const [isDraggingAngle, setIsDraggingAngle] = useState(false);
          const [isHoveringRing, setIsHoveringRing] = useState(false);
          const [lastMouse, setLastMouse] = useState({ x: 0, y: 0 });

          // Gittervektoren
          const k1 = { x: 1, y: 0 };
          const k2 = { x: Math.cos(2 * Math.PI / 3), y: Math.sin(2 * Math.PI / 3) };
          
          // Radius für den Winkel-Control
          const controlRadius = 1 / Math.sqrt(2);
          const controlPointSize = 6;

          useEffect(() => {
            const canvas = canvasRef.current;
            if (!canvas) return;

            const ctx = canvas.getContext('2d');
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            const render = () => {
              // Dark background
              ctx.fillStyle = COLORS.background;
              ctx.fillRect(0, 0, canvas.width, canvas.height);
              
              ctx.save();
              
              // Transform: Verschiebung zum Zentrum + Pan + Zoom
              ctx.translate(canvas.width / 2 + pan.x, canvas.height / 2 + pan.y);
              ctx.scale(zoom, -zoom); // Y-Achse nach oben

              // Einheitskreis zeichnen
              ctx.strokeStyle = COLORS.unitCircle;
              ctx.lineWidth = 2 / zoom;
              ctx.beginPath();
              ctx.arc(0, 0, 1, 0, 2 * Math.PI);
              ctx.stroke();

              // Tangenten berechnen
              const nx = Math.cos(theta);
              const ny = Math.sin(theta);
              const d = 1; // Abstand zum Ursprung (Radius)

              // Tangentenpunkte
              const tx1 = d * nx;
              const ty1 = d * ny;
              const tx2 = -d * nx;
              const ty2 = -d * ny;

              // Richtungsvektor der Tangente (senkrecht zur Normale)
              const tanx = -ny;
              const tany = nx;

              // Sichtbaren Bereich berechnen (für Tangentenlänge)
              const viewLeft = (-canvas.width / 2 - pan.x) / zoom;
              const viewRight = (canvas.width / 2 - pan.x) / zoom;
              const viewBottom = (-canvas.height / 2 + pan.y) / zoom;
              const viewTop = (canvas.height / 2 + pan.y) / zoom;
              const viewWidth = viewRight - viewLeft;
              const viewHeight = viewTop - viewBottom;
              const scale = Math.max(viewWidth, viewHeight) * 1.5;

              // Schattierter Bereich zwischen Tangenten
              ctx.fillStyle = COLORS.tangentFill;
              ctx.beginPath();
              ctx.moveTo(tx1 + tanx * scale, ty1 + tany * scale);
              ctx.lineTo(tx1 - tanx * scale, ty1 - tany * scale);
              ctx.lineTo(tx2 - tanx * scale, ty2 - tany * scale);
              ctx.lineTo(tx2 + tanx * scale, ty2 + tany * scale);
              ctx.closePath();
              ctx.fill();

              // Tangenten zeichnen
              ctx.strokeStyle = COLORS.tangent;
              ctx.lineWidth = 1.5 / zoom;
              ctx.beginPath();
              ctx.moveTo(tx1 - tanx * scale, ty1 - tany * scale);
              ctx.lineTo(tx1 + tanx * scale, ty1 + tany * scale);
              ctx.stroke();
              ctx.beginPath();
              ctx.moveTo(tx2 - tanx * scale, ty2 - tany * scale);
              ctx.lineTo(tx2 + tanx * scale, ty2 + tany * scale);
              ctx.stroke();

              // Sichtbaren Bereich für Gitterpunkte berechnen
              const maxRange = Math.ceil(Math.max(
                Math.abs(viewLeft), Math.abs(viewRight),
                Math.abs(viewBottom), Math.abs(viewTop)
              ) * 2);

              for (let n1 = -maxRange; n1 <= maxRange; n1++) {
                for (let n2 = -maxRange; n2 <= maxRange; n2++) {
                  const px = n1 * k1.x + n2 * k2.x;
                  const py = n1 * k1.y + n2 * k2.y;

                  // Culling: nur sichtbare Punkte
                  if (px < viewLeft || px > viewRight || py < viewBottom || py > viewTop) {
                    continue;
                  }

                  // Exakte Schnittpunkt-Prüfung für ALLE sichtbaren Punkte
                  const dotProduct = px * nx + py * ny;
                  const isOnTangent = Math.abs(Math.abs(dotProduct) - d) < 0.001;

                  // Punktgröße angepasst an Zoom
                  const pointRadius = isOnTangent ? 5 / zoom : 3 / zoom;
                  ctx.fillStyle = isOnTangent ? COLORS.intersectionPoint : COLORS.latticePoint;
                  ctx.beginPath();
                  ctx.arc(px, py, pointRadius, 0, 2 * Math.PI);
                  ctx.fill();
                }
              }

              // Annulus für Winkel-Control (grau schattiert)
              const ringWidth = controlPointSize / zoom;
              ctx.fillStyle = COLORS.angleControlRing;
              ctx.beginPath();
              ctx.arc(0, 0, controlRadius + ringWidth / 2, 0, 2 * Math.PI);
              ctx.arc(0, 0, controlRadius - ringWidth / 2, 0, 2 * Math.PI, true);
              ctx.fill();

              // Winkel-Anzeige wenn Hover über Ring
              if (isHoveringRing || isDraggingAngle) {
                ctx.strokeStyle = COLORS.angleArc;
                ctx.lineWidth = 2 / zoom;
                
                // Bogen von (1,0) bis zum aktuellen Winkel
                ctx.beginPath();
                ctx.arc(0, 0, controlRadius * 0.7, 0, theta, theta < 0);
                ctx.stroke();
                
                // Linie zum Punkt
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(Math.cos(theta) * controlRadius, Math.sin(theta) * controlRadius);
                ctx.stroke();
                
                // Linie zur x-Achse
                ctx.setLineDash([3 / zoom, 3 / zoom]);
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(controlRadius * 0.7, 0);
                ctx.stroke();
                ctx.setLineDash([]);
              }

              // Draggable Punkt am Control-Kreis
              const handleX = Math.cos(theta) * controlRadius;
              const handleY = Math.sin(theta) * controlRadius;
              ctx.fillStyle = COLORS.angleControl;
              ctx.beginPath();
              ctx.arc(handleX, handleY, controlPointSize / zoom, 0, 2 * Math.PI);
              ctx.fill();
              ctx.strokeStyle = '#fff';
              ctx.lineWidth = 2 / zoom;
              ctx.stroke();

              ctx.restore();
            };

            render();

            const handleResize = () => {
              canvas.width = window.innerWidth;
              canvas.height = window.innerHeight;
              render();
            };

            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
          }, [theta, zoom, pan, isHoveringRing, isDraggingAngle]);

          const screenToWorld = (screenX, screenY) => {
            const canvas = canvasRef.current;
            const rect = canvas.getBoundingClientRect();
            const x = screenX - rect.left - canvas.width / 2 - pan.x;
            const y = -(screenY - rect.top - canvas.height / 2 - pan.y);
            return { x: x / zoom, y: y / zoom };
          };

          const handleMouseDown = (e) => {
            const world = screenToWorld(e.clientX, e.clientY);
            const distFromOrigin = Math.sqrt(world.x ** 2 + world.y ** 2);
            const ringWidth = controlPointSize / zoom;
            
            // Check if clicking on the ring
            if (Math.abs(distFromOrigin - controlRadius) < ringWidth) {
              setIsDraggingAngle(true);
              const angle = Math.atan2(world.y, world.x);
              setTheta(angle);
            } else {
              setIsDragging(true);
              setLastMouse({ x: e.clientX, y: e.clientY });
            }
          };

          const handleMouseMove = (e) => {
            const world = screenToWorld(e.clientX, e.clientY);
            const distFromOrigin = Math.sqrt(world.x ** 2 + world.y ** 2);
            const ringWidth = controlPointSize / zoom;
            
            // Check hover state
            setIsHoveringRing(Math.abs(distFromOrigin - controlRadius) < ringWidth);
            
            if (isDraggingAngle) {
              const angle = Math.atan2(world.y, world.x);
              setTheta(angle);
            } else if (isDragging) {
              const dx = e.clientX - lastMouse.x;
              const dy = e.clientY - lastMouse.y;
              setPan(prev => ({ x: prev.x + dx, y: prev.y + dy }));
              setLastMouse({ x: e.clientX, y: e.clientY });
            }
          };

          const handleMouseUp = () => {
            setIsDragging(false);
            setIsDraggingAngle(false);
          };

          const handleWheel = (e) => {
            e.preventDefault();
            const delta = -e.deltaY;
            const factor = delta > 0 ? 1.1 : 0.9;
            setZoom(prev => Math.max(10, Math.min(500, prev * factor)));
          };

          return (
            <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', background: COLORS.background }}>
              <canvas
                ref={canvasRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onWheel={handleWheel}
                style={{ cursor: isDragging ? 'grabbing' : (isDraggingAngle || isHoveringRing) ? 'pointer' : 'grab' }}
              />
              <div style={{
                position: 'absolute',
                top: 20,
                left: 20,
                background: COLORS.infoBackground,
                padding: '15px',
                borderRadius: '8px',
                fontFamily: 'monospace',
                fontSize: '14px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                color: COLORS.infoText,
                border: '1px solid rgba(255,255,255,0.1)'
              }}>
                <div><strong>θ:</strong> {(theta * 180 / Math.PI).toFixed(1)}°</div>
                <div style={{ marginTop: '10px', fontSize: '12px', color: COLORS.infoTextSecondary }}>
                  <div>🖱️ Drag: Pan</div>
                  <div>🔴 Ring: Winkel ändern</div>
                  <div>🔄 Mausrad: Zoom</div>
                </div>
              </div>
            </div>
          );
        };

        ReactDOM.render(<HexagonalLatticeViz />, document.getElementById('root'));
    </script>
</body>
</html>