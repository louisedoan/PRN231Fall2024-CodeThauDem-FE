import { Link } from "react-router-dom";
import Container from "../../ui/Container";
import Item from "../../ui/ItemSelection";
import Button from "../../ui/Button";
import Logo from "./Logo";
import useLoginModal from "../../hooks/useLoginModal";
import useRegisterModal from "../../hooks/useRegisterModal";
import { useSelector } from "react-redux";
import UserMenu from "./UserMenu";


const Navbar = () => {

  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  // Get current user from Redux store
  const currentUser = useSelector((state) => state.users.currentUser);

  return (
    <div className="sticky top-0 z-40 w-full bg-white shadow-sm">
      <div className=" border-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Link to="/">
              <Logo />
            </Link>

            <div className="flex flex-row gap-5">
              <Item label="About us" link=""></Item>
              <Item label="My flights" link=""></Item>
              <Item label="Contact for ticket" link=""></Item>
              <Item label="Support" link=""></Item>
            </div>


             {/* Conditional rendering based on whether user is logged in */}
            <div className="flex flex-row justify-between gap-3">
              {currentUser ? (
                <UserMenu currentUser={currentUser.Email} />
              ) : (
                <>
                  <Button
                    label="Login"
                    onClick={loginModal.onOpen}
                    containerStyles="hover:no-underline hover:rounded-tl-3xl hover:rounded-br-2xl hover:bg-secondary transition-all duration-100 ease-out clickable flex items-center whitespace-nowrap justify-center font-semibold p-3 sm-bold-caps gap-x-2 border border-primary
                    hover:text-black hover:border-primary
                    active:border-primary active:text-black
                    w-full text-white cursor-pointer bg-black"
                  />
                  <Button
                    label="Sign up"
                    onClick={registerModal.onOpen}
                    containerStyles="hover:no-underline hover:rounded-tl-3xl hover:rounded-br-2xl hover:bg-secondary transition-all duration-100 ease-out clickable flex items-center whitespace-nowrap justify-center font-semibold p-3 sm-bold-caps gap-x-2 border border-primary
                    hover:text-black hover:border-primary 
                    active:border-primary active:text-black
                    w-full text-black cursor-pointer"
                  />
                </>
              )}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
