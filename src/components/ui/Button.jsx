const Button = ({ label, onClick, disable, containerStyles }) => {
    return (
      <button
        onClick={onClick}
        disabled={disable}
        className={`custom-btn ${containerStyles} disabled:opacity-70 disabled:cursor-not-allowed`}
      >
        {label}
      </button>
    );
  };
  
  export default Button;
  