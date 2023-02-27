import cn from "classnames";
import React from "react";
import s from "./Input.module.css";

interface MyInputProps {
  sx?: string;
  icon?: React.ReactElement | string;
  innerRef?: any;
}

const Button: React.FC<
  MyInputProps &
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >
> = (props) => {
  return (
    <div className={cn(s.root)}>
      <input
        className={cn(props.sx || "", s.input)}
        {...props}
        ref={props.innerRef}
      >
        {props.children}
      </input>
      {props.icon && <div className={cn(s.icon)}>{props.icon}</div>}
    </div>
  );
};

export default Button;
