import style from "./Navbar.module.css";
import cn from "classnames";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const pageLinks = [
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
  ];
  return (
    <div className={cn(style.root)}>
      {pageLinks.map((item, index) => (
        <NavLink
          key={index}
          to={{
            pathname: item.link,
          }}
          className={cn(style.link)}
        >
          {item.text}
        </NavLink>
      ))}
    </div>
  );
};

export default Navbar;
