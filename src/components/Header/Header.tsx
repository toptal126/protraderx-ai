import style from "./Header.module.css";
import cn from "classnames";

import { NavLink } from "react-router-dom";
import LinkWithSearchParams from "components/LinkWithSearchParams";
import ConnectButton from "./ConnectButton";

const Header = () => {
  const pageLinks = [
    {
      text: "Mortgage",
      link: "/mortgage",
    },
    {
      text: "Borrow",
      link: "/",
    },
    {
      text: "Pools",
      link: "/pools",
    },
    {
      text: "Lend",
      link: "/lend",
    },
    {
      text: "Collections",
      link: "/collections",
    },
    // {
    //   text: "Swap",
    //   link: "/swap",
    // },
    // {
    //   text: "Docs",
    //   link: "/demo",
    //   external: true,
    // },
  ];
  return (
    <div className={cn(style.root)}>
      <LinkWithSearchParams
        to={{
          pathname: "/",
        }}
        className={cn(style.logo)}
      ></LinkWithSearchParams>
      <div className="hidden md:flex items-center ml-auto mr-5">
        {pageLinks.map((item, index) => (
          <NavLink
            key={index}
            to={{
              pathname: item.link,
            }}
            className="font-bold text-xl flex-1 px-4 py-9 hover:bg-[#BBC7F9] min-w-fit"
          >
            {item.text}
          </NavLink>
        ))}
      </div>
      {/* <SvgNotification className="mx-5" /> */}
      <ConnectButton />
    </div>
  );
};

export default Header;
