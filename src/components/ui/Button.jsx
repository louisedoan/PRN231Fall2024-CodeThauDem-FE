const Button = ({ label, onClick, containerStyles }) => {
    return (
      <button
        onClick={onClick}
        className={`custom-btn ${containerStyles} disabled:opacity-70 disabled:cursor-not-allowed`}
      >
        {label}
      </button>
    );
  };
  
  export default Button;
  