import cn from "classnames";
import s from "./Button.module.css";

type ButtonVariant = "yellow" | "gray" | "blue";
interface MyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  sx?: string;
}

const extractGradientFromVariant = (variant: ButtonVariant) => {
  return {
    yellow: "text-white bg-tangerine-yellow",
    gray: "bg-white text-tangerine-yellow",
    blue: "bg-smoky-black text-[#342FFF]",
  }[variant];
};

const Button = (props: MyButtonProps) => {
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
