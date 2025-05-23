
export const GlobalStyles = () => {
  return (
    <style>
      {`
        @keyframes fade-in {
          from { 
            opacity: 0;
            transform: translateY(10px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .bg-gradient-text {
          background: linear-gradient(to right, #ffffff 30%, #ffffff, #22e55c, #10b981, #059669, #047857);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-size: 400% 400%;
          animation: gradient 15s ease-in-out infinite;
        }

        .glass-panel {
          @apply bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl;
        }

        .glass-panel:hover {
          border-color: #22C55E;
          transform: scale(1.05) translateZ(20px);
        }
        
        /* Error message styling */
        .error-message {
          @apply bg-red-950/30 border border-red-900 text-red-300 p-3 rounded-md;
        }
        
        .error-title {
          @apply text-red-400 font-semibold mb-1;
        }

        @keyframes gradient {
          0% { background-position: 0% 50%; }
          16.66% { background-position: 0% 50%; }
          33.33% { background-position: 25% 50%; }
          50% { background-position: 50% 50%; }
          66.66% { background-position: 75% 50%; }
          83.33% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}
    </style>
  );
};
