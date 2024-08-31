const CommonHero = ({ title }: { title: string; img?: string | null }) => {
  return (
    <div
      style={{
        backgroundImage: `url(https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)`,
      }}
      className="h-[50vh] w-full bg-no-repeat bg-cover bg-center bg-[100% mb-24"
    >
      <div
        className="text-white h-full w-full flex justify-center
      items-center bg-[#10101032] lg:pt-20"
      >
        <div className="max-w-[1140px] bg-black/20 backdrop-blur-sm p-10 shadow-2xl rounded-sm w-full mx-auto text-center">
          <h1 className="lg:text-7xl text-6xl font-serif uppercase underline">
            {title}
          </h1>
          {/* <p className="text-xl text-wrap">{subTitle}</p> */}
        </div>
      </div>
    </div>
  );
};

export default CommonHero;
