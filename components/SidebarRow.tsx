import React, { SVGProps } from "react";

interface SidebarRowProps { // Props for the SidebarRow component //interface is a way to define types
  Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  title: string;
  onClick?: () => {};
}

function SidebarRow({ Icon, title, onClick }: SidebarRowProps) {
  return (
    <div
      onClick={() => onClick?.()}
      className="flex max-w-fit cursor-pointer items-center space-x-2 rounded-full px-4 py-3 transition-all duration-200 hover:bg-gray-100 group"
    >
      <Icon className="h-6 w-6 " />
      {/* Hidden until medium device where it makes the flex container an inline element while maintain its flexbox properties  */}
      <p className=" hidden group-hover:text-twitter md:inline-flex text-base font-light lg:text-xl">
        {title}
      </p>
    </div>
  );
}

export default SidebarRow;
