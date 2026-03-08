import { useRef } from 'react'

const NotfoundPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  /* ── Three.js falling petals ── */
  // 

  /* ── corner flower decorations ── */
  const decos = [
    { emoji: '🌸', style: { top: '10%',    left:  '5%',  fontSize: '1.8rem',  opacity: 0.18, animationDelay: '0s'   } },
    { emoji: '🌹', style: { top: '14%',    right: '7%',  fontSize: '2.4rem',  opacity: 0.18, animationDelay: '1.2s' } },
    { emoji: '🌷', style: { bottom: '20%', left:  '4%',  fontSize: '1.4rem',  opacity: 0.15, animationDelay: '2.4s' } },
    { emoji: '🌺', style: { bottom: '26%', right: '5%',  fontSize: '1.8rem',  opacity: 0.18, animationDelay: '0.8s' } },
    { emoji: '🌸', style: { top: '52%',    left:  '2%',  fontSize: '1.2rem',  opacity: 0.14, animationDelay: '3s'   } },
    { emoji: '🌷', style: { top: '38%',    right: '3%',  fontSize: '1.5rem',  opacity: 0.15, animationDelay: '1.8s' } },
  ]

  return (
    <>
      {/* Google Font */}
      <style>{`
       
      `}</style>

      <div
        style={{ fontFamily: "'Nunito', sans-serif", backgroundColor: '#FFF0F5' }}
        className="relative w-full h-screen overflow-hidden"
      >
        {/* Three.js canvas */}
        <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />

        {/* Corner flower decorations */}
        {decos.map((d, i) => (
          <span
            key={i}
            className="fixed pointer-events-none nf-drift"
            style={{ ...d.style, position: 'fixed' }}
          >
            {d.emoji}
          </span>
        ))}

        {/* Bottom ambient glow blob */}
        <div
          className="fixed left-1/2 rounded-full z-[1] nf-blob"
          style={{
            bottom: '-70px',
            width: '130vw',
            height: '18rem',
            background: 'radial-gradient(ellipse at center, #FFD6E7 0%, transparent 68%)',
          }}
        />

        {/* Main content */}
        <main className="relative z-10 flex flex-col items-center justify-center h-screen text-center px-6">

          {/* 404 number */}
          <div className="relative select-none flex items-center justify-center nf-float">
            <span className="nf-404-outline absolute">404</span>
            <span className="nf-404">404</span>
          </div>

          {/* Headline */}
          <h1
            className="text-3xl sm:text-4xl md:text-[2.8rem] font-extrabold mt-1 leading-snug tracking-tight nf-fade-1"
            style={{ color: '#1A0A12', fontFamily: "'Nunito', sans-serif" }}
          >
            Page Not Found
          </h1>

          {/* Pink subline */}
          <p
            className="text-lg sm:text-xl font-bold mt-2 nf-fade-2"
            style={{ color: '#F72585', fontFamily: "'Nunito', sans-serif" }}
          >
            This bloom got lost along the way 🥀
          </p>

          {/* Description */}
          <p
            className="mt-4 text-base sm:text-[1.05rem] font-normal max-w-[420px] leading-relaxed nf-fade-3"
            style={{ color: '#5C2D44' }}
          >
            The page you're looking for has wilted away or been moved.
            <br />
            Let's get you back to something beautiful.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mt-9 justify-center nf-fade-4">
            <a
              href="/"
              className="nf-btn-lift inline-flex items-center gap-2 px-8 py-[14px] rounded-full text-white font-bold text-[0.95rem] tracking-wide"
              style={{
                background: '#F72585',
                boxShadow: '0 6px 28px rgba(247,37,133,.42)',
                fontFamily: "'Nunito', sans-serif",
              }}
            >
              ← Back to Home
            </a>
            <a
              href="/products"
              className="nf-btn-lift inline-flex items-center gap-2 px-8 py-[13px] rounded-full font-bold text-[0.95rem] tracking-wide border-2 bg-transparent"
              style={{
                borderColor: '#F72585',
                color: '#F72585',
                fontFamily: "'Nunito', sans-serif",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = '#FFD6E7')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              Browse Flowers
            </a>
          </div>

        </main>
      </div>
    </>
  )
}

export default NotfoundPage