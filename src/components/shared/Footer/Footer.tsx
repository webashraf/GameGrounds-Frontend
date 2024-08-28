import { NavLink } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="bg-[#f4f4f4] relative z-0 lg:px-20  px-0 lg:pb-0 pb-44 ">
      <div className="flex justify-between flex-wrap gap-10 items-center flex-co py-10 lg:px-0 px-8">
        {/* footer col-1 */}
        <div
          className="text-center flex flex-col justify-center items-center gap-5 w-full
          "
        >
          <h2 className="font-serif text-5xl">GameGrounds</h2>
          <p className="text-center">
            We love plants, the mood & health benefits they bring to spaces.
          </p>
          <div className="flex gap-2">
            <a
              href="http://www.tel.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="Btn">
                <span className="svgContainer bg-white">
                  <svg
                    className=""
                    fill="white"
                    xmlns="http://www.w3.org/2000/svg"
                    height="1.6em"
                    viewBox="0 0 496 512"
                  >
                    <path
                      fill="white"
                      d="M248 8C111 8 0 119 0 256S111 504 248 504 496 393 496 256 385 8 248 8zM363 176.7c-3.7 39.2-19.9 134.4-28.1 178.3-3.5 18.6-10.3 24.8-16.9 25.4-14.4 1.3-25.3-9.5-39.3-18.7-21.8-14.3-34.2-23.2-55.3-37.2-24.5-16.1-8.6-25 5.3-39.5 3.7-3.8 67.1-61.5 68.3-66.7 .2-.7 .3-3.1-1.2-4.4s-3.6-.8-5.1-.5q-3.3 .7-104.6 69.1-14.8 10.2-26.9 9.9c-8.9-.2-25.9-5-38.6-9.1-15.5-5-27.9-7.7-26.8-16.3q.8-6.7 18.5-13.7 108.4-47.2 144.6-62.3c68.9-28.6 83.2-33.6 92.5-33.8 2.1 0 6.6 .5 9.6 2.9a10.5 10.5 0 0 1 3.5 6.7A43.8 43.8 0 0 1 363 176.7z"
                    ></path>
                  </svg>
                </span>
                <span className="BG"></span>
              </button>
            </a>

            <a
              href="http://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="Btntwit">
                <span className="svgContainertwit">
                  <svg
                    fill="white"
                    className="svgIcontwit"
                    xmlns="http://www.w3.org/2000/svg"
                    height="1.7em"
                    viewBox="0 0 512 512"
                  >
                    <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"></path>
                  </svg>
                </span>
                <span className="BGtwit"></span>
              </button>
            </a>

            <a
              href="http://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="Btninsta">
                <span className="svgContainerinsta">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1.5em"
                    viewBox="0 0 448 512"
                    className="svgIconinsta"
                    fill="white"
                  >
                    <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path>
                  </svg>
                </span>
                <span className="BGinsta"></span>
              </button>
            </a>

            <a
              href="http://www.stack-overflow.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="Btnstock">
                <span className="svgContainerstock">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1.6em"
                    fill="white"
                    viewBox="0 0 384 512"
                  >
                    <path d="M290.7 311L95 269.7 86.8 309l195.7 41zm51-87L188.2 95.7l-25.5 30.8 153.5 128.3zm-31.2 39.7L129.2 179l-16.7 36.5L293.7 300zM262 32l-32 24 119.3 160.3 32-24zm20.5 328h-200v39.7h200zm39.7 80H42.7V320h-40v160h359.5V320h-40z"></path>
                  </svg>
                </span>
                <span className="BGstock"></span>
              </button>
            </a>
          </div>
        </div>
        {/* footer col-2 */}
        <div>
          <h3 className="text-2xl uppercase font-bold mb-3">Pages</h3>
          <div className="flex flex-col text-xl font-mono gap-2">
            <NavLink to="/" className="hover:underline">
              Home
            </NavLink>
            <NavLink to="/" className="hover:underline">
              About
            </NavLink>
            <NavLink to="/" className="hover:underline">
              News
            </NavLink>
            <NavLink to="/" className="hover:underline">
              Contact
            </NavLink>
          </div>
        </div>
        {/* footer col-2 */}
        <div>
          <h3 className="text-2xl uppercase font-bold mb-3">Pages</h3>
          <div className="flex flex-col text-xl font-mono gap-2">
            <NavLink to="/" className="hover:underline">
              Home
            </NavLink>
            <NavLink to="/" className="hover:underline">
              About
            </NavLink>
            <NavLink to="/" className="hover:underline">
              News
            </NavLink>
            <NavLink to="/" className="hover:underline">
              Contact
            </NavLink>
          </div>
        </div>

        {/* footer col-3 */}
        <div>
          <div>
            <h3 className="text-2xl uppercase font-bold mb-3">
              Join Our Newsletter
            </h3>
            <p className="mb-3">
              Join our mailing list to stay informed about our latest products
              and offers.
            </p>
          </div>
          <form>
            <input
              type="text"
              name=""
              placeholder="Enter your email"
              className="py-4 px-5 lg:w-[300px] mr-5"
              id=""
            />
            <input
              type="submit"
              value="Subscrive"
              className="bg-[#2d2a24] text-white lg:px-10 px-4 uppercase py-4"
            />
          </form>
        </div>
      </div>
      {/* Footer bottom */}
      <div className="bg-slate-20 text-slate-800 text-center pt-10 pb-8 px-10">
        <p className="text-[#908d8d]">
          © 2018Thegreen. All Rights Reserved |{" "}
          <a className="text-[#4f4c4c]" href="tel:+01321156">
            (106) 533-1312, (126) 152-5555
          </a>{" "}
          | &nbsp;
          <a href="mailto:johndoe@mail.com">johndoe@mail.com</a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
