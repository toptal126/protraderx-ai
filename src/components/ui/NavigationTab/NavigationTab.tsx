import cn from "classnames";
import LinkWithSearchParams from "components/LinkWithSearchParams";
import style from "./NavigationTab.module.css";

interface IProps {
  tabs: {
    text: string;
    link: string;
  }[];
}

const NavigationTab = ({ tabs }: IProps) => {
  return (
    <div className={cn(style.root)}>
      {tabs.map((item, index) => (
        <LinkWithSearchParams
          key={index}
          to={{ pathname: item.link }}
          title={item.text}
          className={({ isActive }: { isActive: boolean }) =>
            cn(style.root, isActive ? style.active : "")
          }
        >
          {item.text}
        </LinkWithSearchParams>
      ))}
    </div>
  );
};

export default NavigationTab;
