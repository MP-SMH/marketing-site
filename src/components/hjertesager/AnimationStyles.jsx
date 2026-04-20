export default function AnimationStyles() {
  return (
    <style>{`
      @keyframes hjerteFadeUp {
        from { opacity: 0; transform: translateY(24px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes hjerteFadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes hjerteScaleIn {
        from { opacity: 0; transform: scale(0.95); }
        to { opacity: 1; transform: scale(1); }
      }
      @keyframes mangler-pulse {
        0% { box-shadow: 0 0 0 0 rgba(245,158,11,0.2); }
        70% { box-shadow: 0 0 0 8px rgba(245,158,11,0); }
        100% { box-shadow: 0 0 0 0 rgba(245,158,11,0); }
      }
      .mangler-glow {
        animation: mangler-pulse 3s ease-in-out infinite;
      }
      @keyframes hjerte-momentum-pulse {
        0%, 100% { box-shadow: 0 0 0 0 rgba(224,25,63,0.4); }
        50% { box-shadow: 0 0 0 6px rgba(224,25,63,0); }
      }
      .hjerte-momentum-dot {
        animation: hjerte-momentum-pulse 2s ease infinite;
      }
      .hjerte-fade-up {
        animation: hjerteFadeUp 0.6s ease-out both;
      }
      .hjerte-fade-in {
        animation: hjerteFadeIn 0.5s ease-out both;
      }
      .hjerte-scale-in {
        animation: hjerteScaleIn 0.5s ease-out both;
      }
      .hjerte-stagger-1 { animation-delay: 0.05s; }
      .hjerte-stagger-2 { animation-delay: 0.1s; }
      .hjerte-stagger-3 { animation-delay: 0.15s; }
      .hjerte-stagger-4 { animation-delay: 0.2s; }
      .hjerte-stagger-5 { animation-delay: 0.25s; }
      .hjerte-stagger-6 { animation-delay: 0.3s; }
      .hjerte-line-clamp-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      .hjerte-line-clamp-3 {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    `}</style>
  );
}