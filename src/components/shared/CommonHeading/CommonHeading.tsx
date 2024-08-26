const CommonHeading = ({
  title,
  subTitle = "",
}: {
  title: string;
  subTitle: string;
}) => {
  return (
    <div className="text-center space-y-5 pb-24">
      <h2 className="md:text-6xl text-[42px] text-center uppercase leading-5">{title}</h2>
      <p className="text-2xl">{subTitle}</p>
    </div>
  );
};

export default CommonHeading;
