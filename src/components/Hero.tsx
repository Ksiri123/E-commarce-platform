export const Hero = () => {
  return (
    <div className="relative h-[500px] overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07"
        alt="Beautiful garden"
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="mb-4 text-5xl font-bold">Welcome to GreenThumb</h1>
          <p className="text-xl">Discover the perfect plants for your space</p>
        </div>
      </div>
    </div>
  );
};