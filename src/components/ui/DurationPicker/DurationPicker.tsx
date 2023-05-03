import cn from "classnames";
import style from "./DurationPicker.module.css";
import Button from "../Button";
import { SvgMinus, SvgPlus } from "assets/images/svg";
import Input from "../Input";
import { toInteger } from "utils/helpers/string.helpers";

interface IProps {
  value: number;
  onChange: React.Dispatch<React.SetStateAction<number>>;
  suffix?: string;
  min?: number;
  max?: number;
}
const DurationPicker = (props: IProps) => {
  const { value, onChange, suffix, min, max } = props;
  return (
    <div className={cn(style.picker)}>
      <Button
        sx="md:h-10 md:w-10 h-8 w-8 bg-smoky-black hover:bg-smoky-black/70 ml-auto"
        disabled={min === value}
        onClick={() => onChange(value - 1)}
      >
        <SvgMinus />
      </Button>
      <div className="w-28">
        <Input
          value={value}
          icon={<span className="opacity-50">{suffix || "days"}</span>}
          onChange={(e) => {
            onChange(toInteger(e.target.value));
          }}
        />
      </div>
      <Button
        sx="md:h-10 md:w-10 h-8 w-8 bg-smoky-black hover:bg-smoky-black/70 ml-auto"
        disabled={max === value}
        onClick={() => onChange(value + 1)}
      >
        <SvgPlus />
      </Button>
    </div>
  );
};

export default DurationPicker;
