import LinkWithSearchParams from "components/LinkWithSearchParams";
import style from "./Footer.module.css";
import cn from "classnames";
import { SvgDiscord, SvgGithub, SvgTwitter } from "assets/images/svg";
const Footer = () => {
  const externalLinks = [
    { icon: <SvgTwitter /> },
    { icon: <SvgDiscord /> },
    { icon: <SvgGithub /> },
  ];
  const navLinks = [
    { text: "Terms Of Service", link: "/terms" },
    { text: "Privacy Policy", link: "/privacy" },
  ];
  return (
    <footer className={cn(style.root)}>
      <span>©2022 ProtradeX.Pro Ltd. All rights reserved.</span>
      <div className={cn(style.externalLinks)}>
        {externalLinks.map((link, index) => (
          <a
            key={index}
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
          >
            {link.icon}
          </a>
        ))}
      </div>
      <div className={cn(style.navlinks)}>
        {navLinks.map((item, index) => (
          <LinkWithSearchParams key={index} to={{ pathname: item.link }}>
            {item.text}
          </LinkWithSearchParams>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
