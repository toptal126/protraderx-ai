import cn from "classnames";
import s from "./Switch.module.css";

interface MySwitch {
  toggled: boolean;
  setToggled?: React.Dispatch<React.SetStateAction<boolean>>;
  sx?: string;
}

const switchBg = (toggled: boolean) => {
  if (toggled) return "bg-tangerine-yellow";
  return "bg-dark-charcoal";
};

const Button: React.FC<
  MySwitch &
    React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >
> = (props) => {
  const { toggled, setToggled, sx, children } = props;
  return (
    <button
      className={cn(sx || "", s.switch, switchBg(toggled))}
      {...props}
      onClick={() => {
        if (setToggled) setToggled(!toggled);
      }}
    >
      {children}
      <div
        className={cn(s.thumb, toggled ? "translate-x-5" : "translate-x-0")}
      />
    </button>
  );
};

export default Button;
