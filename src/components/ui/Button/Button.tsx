import cn from "classnames";
import s from "./Button.module.css";

type ButtonVariant = "yellow" | "gray" | "blue";
interface MyButtonProps {
  variant?: ButtonVariant;
  sx?: string;
}

const extractGradientFromVariant = (variant: ButtonVariant) => {
  return {
    yellow: "text-white bg-tangerine-yellow",
    gray: "bg-white text-tangerine-yellow",
    blue: "bg-smoky-black",
  }[variant];
};

const Button: React.FC<
  MyButtonProps &
    React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >
> = (props) => {
  return (
    <button
      className={cn(
        props.sx || "",
        s.button,
        extractGradientFromVariant(props.variant || "gray")
      )}
      {...props}
    >
      {props.children}
    </button>
  );
};

export default Button;
