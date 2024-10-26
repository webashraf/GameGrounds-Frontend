import { ReactNode } from "react";

const Component = ({ children }: { children: ReactNode }) => {
  return <div className="lg:px-20">{children}</div>;
};

export default Component;
