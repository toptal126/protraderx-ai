import cn from "classnames";
import LinkWithSearchParams from "components/LinkWithSearchParams";
import style from "./FlexTab.module.css";

interface IProps {
  tabs: {
    text: string | React.ReactElement;
    link: string;
  }[];
}

const FlexTab = ({ tabs }: IProps) => {
  return (
    <div className={cn(style.root)}>
      {tabs.map((item, index) => (
        <LinkWithSearchParams
          key={index}
          to={{ pathname: item.link }}
          className={({ isActive }: { isActive: boolean }) =>
            cn(style.link, isActive ? style.active : "")
          }
          end
        >
          {item.text}
        </LinkWithSearchParams>
      ))}
    </div>
  );
};

export default FlexTab;
