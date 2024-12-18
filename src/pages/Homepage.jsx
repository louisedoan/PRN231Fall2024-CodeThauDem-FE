import Container from "../components/ui/Container";
import { HeroCover } from "../components/ui/HeroCover";
import FlightBookingForm from "../components/ui/modal/FlightBookingForm";
import { BackgroundBeamsWithCollision } from "../components/ui/BackgroundEffect";

const Home = () => {
  return (
    <>
      <BackgroundBeamsWithCollision>
        <div className="w-full ">
          <Container>
            <div className="flex flex-col lg:flex-row items-center justify-between lg:space-x-8">
              <div className="w-full lg:w-1/2">
                <h1 className="text-4xl md:text-4xl lg:text-5xl font-semibold max-w-xl mx-auto lg:mx-0 text-center lg:text-left mt-6 lg:mt-0 relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700">
                  Buy ticket & travel easily <br /> with{" "}
                  <HeroCover>FlighEase</HeroCover>
                </h1>
              </div>
              <div className="w-full lg:w-1/2 mt-8 lg:mt-0">
                <div className="input-section mb-10">
                  <FlightBookingForm />
                </div>
              </div>
            </div>
          </Container>
        </div>
      </BackgroundBeamsWithCollision>
    </>
  );
};

export default Home;
