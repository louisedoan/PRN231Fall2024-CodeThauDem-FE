const Button = ({ label, handleClick, containerStyles }) => {
    return (
      <button
        onClick={handleClick}
        className={`custom-btn ${containerStyles} disabled:opacity-70 disabled:cursor-not-allowed`}
      >
        {label}
      </button>
    );
  };
  
  export default Button;
  