import { Link } from "react-router-dom"

const Item = ({ label, link }) => {
    return (
      <div className="hidden cursor-pointer rounded-full px-4 py-3 text-sm font-semibold transition hover:bg-red-400 md:block">
        <Link to={link}>
          {label}
        </Link>
      </div>
    )
  }
  
  export default Item