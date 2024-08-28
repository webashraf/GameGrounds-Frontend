const CommonHeading = ({
  title,
  subTitle = "",
}: {
  title: string;
  subTitle: string;
}) => {
  return (
    <div className="text-center space-y-5 lg:pb-24 pb-10">
      <h2 className="text-4xl md:text-5xl lg:text-6xl  uppercase leading-tight md:leading-snug lg:leading-normal">
        {title}
      </h2>
      <p className="text-lg md:text-xl lg:text-2xl leading-relaxed">
        {subTitle}
      </p>
    </div>
  );
};

export default CommonHeading;
