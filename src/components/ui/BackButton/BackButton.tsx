import { SvgArrowDown } from "assets/images/svg";
import { useNavigate } from "react-router-dom";
import Button from "../Button";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <Button
      sx="h-8 md:h-10 w-8 md:w-10 bg-white/30 hover:bg-white/40 rotate-90	"
      onClick={() => navigate(-1)}
    >
      <SvgArrowDown />
    </Button>
  );
};

export default BackButton;
