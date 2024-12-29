

interface CustomButtonProps {
  text: string;
  style: string;
  fn: () => void;
}

const CustomButton = ({ text, style, fn }: CustomButtonProps) => {
  return (
    <button className={`${style}`} onClick={fn}>{text}</button>
  );
};

export default CustomButton;
