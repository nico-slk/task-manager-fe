

interface CustomButtonProps {
  text: string;
  style: string;
  fn: () => void;
  type?: 'button' | 'submit' | 'reset';
}

const CustomButton = ({ text, style, fn, type = 'button' }: CustomButtonProps) => {
  return (
    <button className={`${style}`} onClick={fn} type={type} >{text}</button>
  );
};

export default CustomButton;
