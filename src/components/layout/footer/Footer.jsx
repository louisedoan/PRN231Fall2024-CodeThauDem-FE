import Logo from "../navbar/Logo";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter, FaGithub } from "react-icons/fa";
import Container from "../../ui/Container";

const Footer = () => {
  return (
    <footer className="bg-body border-t-[1px]">
      <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <Link to="/" className="mr-5 h-6 sm:h-9">
              <Logo w="120" h="120" />
            </Link>
            <p className="max-w-xs mt-4 text-sm text-black font-semibold">
              Travel more easier.
            </p>
            <div className="flex mt-8 space-x-6 text-gray-600">
              <a
                className="hover:opacity-75"
                href="#"
                target="_blank"
                rel="noreferrer"
              >
                <span className="sr-only"> Facebook </span>
                <FaFacebook size="30px" />
              </a>
              <a
                className="hover:opacity-75"
                href="#"
                target="_blank"
                rel="noreferrer"
              >
                <span className="sr-only"> Instagram </span>
                <FaInstagram size="30px" />
              </a>
              <a
                className="hover:opacity-75"
                href="#"
                target="_blank"
                rel="noreferrer"
              >
                <span className="sr-only"> Twitter </span>
                <FaTwitter size="30px" />
              </a>
              <a
                className="hover:opacity-75"
                href="#"
                target="_blank"
                rel="noreferrer"
              >
                <span className="sr-only"> GitHub </span>
                <FaGithub size="30px" />
              </a>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4">
            <div>
              <p className="font-semibold text-black">About Us</p>
              <nav aria-label="Footer Navigation - Services" className="mt-6">
                <ul className="space-y-4 text-sm">
                  <li>
                    <Link
                      className="text-black transition hover:opacity-75"
                      to="#"
                    >
                      {" "}
                      Our Experts
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-black transition hover:opacity-75"
                      to="#"
                    >
                      {" "}
                      Our Partner
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-black transition hover:opacity-75"
                      to="#"
                    >
                      {" "}
                      Press
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
            <div>
              <p className="font-semibold text-black">Buy</p>
              <nav aria-label="Footer Navigation - Company" className="mt-6">
                <ul className="space-y-4 text-sm">
                  <li>
                    <Link
                      className="text-black transition hover:opacity-75"
                      to="#"
                    >
                      How to Buy
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-black transition hover:opacity-75"
                      to="#"
                    >
                      Buyer Protection
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-black transition hover:opacity-75"
                      to="#"
                    >
                      Buyer terms
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
            <div>
              <p className="font-semibold text-black">Return</p>
              <nav
                aria-label="Footer Navigation - Helpful Links"
                className="mt-6"
              >
                <ul className="space-y-4 text-sm">
                  <li>
                    <Link
                      className="text-black transition hover:opacity-75"
                      to="#"
                    >
                      How to Return Ticket
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-black transition hover:opacity-75"
                      to="#"
                    >
                      Return Tips
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-black transition hover:opacity-75"
                      to="#"
                    >
                      Return Temrs
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-black transition hover:opacity-75"
                      to="#"
                    >
                      Affiliates
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
            <div>
              <p className="font-semibold text-black">Legal</p>
              <nav aria-label="Footer Navigation - Legal" className="mt-6">
                <ul className="space-y-4 text-sm">
                  <li>
                    <Link
                      className="text-black transition hover:opacity-75"
                      to="#"
                    >
                      Our Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-black transition hover:opacity-75"
                      to="#"
                    >
                      Help Centre
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
        <p className="mt-8 text-xs text-black">
          © 2024. FlightEase Airlines. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
