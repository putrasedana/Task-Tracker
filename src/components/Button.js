const Button = ({ color, text, onClick }) => {
  return (
    <button className="btn" onClick={onClick} style={{ backgroundColor: color }}>
      {text}
    </button>
  );
};

export default Button;
