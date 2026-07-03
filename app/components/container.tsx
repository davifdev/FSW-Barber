import { ReactNode } from "react";

interface ContainerWrapperProps {
  children: ReactNode;
}

const ContainerWrapper = ({ children }: ContainerWrapperProps) => {
  return <div className="w-full max-w-[1336px] mx-auto">{children}</div>;
};

export default ContainerWrapper;
