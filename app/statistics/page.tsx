"use client";

export default function Statistics() {
  // const [isMobile, setIsMobile] = useState(false);

  // useEffect(() => {
  //   const handleResize = () => {
  //     setIsMobile(window.innerWidth < 768);
  //   };

  //   handleResize();
  //   window.addEventListener('resize', handleResize);
  //   return () => window.removeEventListener('resize', handleResize);
  // }, []);

  return (
    <div className="h-full bg-gray-900">
      <div className="max-w-6xl mx-auto p-4 md:p-6">
        {/* Main layout */}
        <div className="flex flex-col gap-4 md:gap-6 mt-4 md:mt-30">
          <div className="w-full bg-orange-500 rounded-2xl p-3 md:p-4 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 rounded-full bg-orange-400 opacity-20 h-64 w-64 -mr-20 -mt-20" />

            <div className="relative z-10">
              <div className="flex items-center mb-1">
                <p className="text-sm font-medium">Statistics</p>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-2">
                Coming Soon
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
