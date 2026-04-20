export default function AnimationStyles() {
  return (
    <style>{`
      @keyframes fade-up {
        from { opacity: 0; transform: translateY(16px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .card-animate {
        opacity: 0;
        transform: translateY(16px);
      }
      .card-animate.visible {
        animation: fade-up 0.45s ease-out forwards;
      }
      .cards-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}
      .chips-scroll::-webkit-scrollbar{display:none}
      .chips-scroll{-ms-overflow-style:none;scrollbar-width:none}
      .mobile-filter-only{display:none}
      .desktop-filter-only{display:flex}
      .category-expand-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(145px,1fr));gap:6px;padding:16px}

      @media(max-width:768px){
        .cards-grid{grid-template-columns:1fr!important;gap:12px!important}
        .cards-list{gap:10px!important}
      }

      @media(max-width:640px){
        .hero-stats{
          display:flex!important;
          width:100%!important;
          padding:0!important;
          gap:0!important;
          justify-content:space-around!important;
          border-radius:12px!important;
        }
        .hero-stats>div{flex:1!important}
        .stat-item{padding:14px 12px!important}
        .stat-value{font-size:20px!important}
        .stat-label{font-size:8px!important;letter-spacing:0.06em!important}
        .stat-divider{height:32px!important}
        .search-container{padding:16px!important;border-radius:14px!important;margin-bottom:20px!important}
        .mobile-filter-only{display:block!important}
        .desktop-filter-only{display:none!important}
        .mobile-only-btn{display:block!important}
        .category-expand-grid{grid-template-columns:repeat(2,1fr)!important;gap:5px!important;padding:10px!important}
      }

      @media(max-width:400px){
        .card-footer{flex-direction:column!important;gap:10px!important;align-items:stretch!important}
        .card-footer button{width:100%!important;justify-content:center!important}
        .card-content{padding:16px 16px 14px!important}
        .stat-item{padding:12px 8px!important}
        .stat-value{font-size:18px!important}
      }
    `}</style>
  );
}