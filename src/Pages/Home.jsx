import { Spinner } from "@material-tailwind/react";
import React, { Suspense } from "react";
// import Hero from "../Components/Home/Hero";
// import OurCollection from "../Components/Home/OurCollection";
// import FreeDelivery from "../Components/Home/FreeDelivery";
// import Feature from "../Components/Home/Feature";
// import LooksTheLast from "../Components/Home/LooksTheLast";
// import OurStory from "../Components/Home/OurStory";
// import StartShopping from "../Components/Home/StartShopping";

// Lazy load components
const Hero = React.lazy(() => import("../Components/Home/Hero"));
const OurCollection = React.lazy(() =>
  import("../Components/Home/OurCollection")
);
const FreeDelivery = React.lazy(() =>
  import("../Components/Home/FreeDelivery")
);
const Feature = React.lazy(() => import("../Components/Home/Feature"));
const LooksTheLast = React.lazy(() =>
  import("../Components/Home/LooksTheLast")
);
const OurStory = React.lazy(() => import("../Components/Home/OurStory"));
const StartShopping = React.lazy(() =>
  import("../Components/Home/StartShopping")
);

function Home() {
  return (
    // <div className="pt-[62px] md:pt-[72px] xl:pt-[88px]">
    //   <Suspense
    //     fallback={
    //       <div className="h-[calc(100vh-88px)] flex justify-center items-center">
    //         <Spinner color="indigo" className="h-12 w-12" />
    //       </div>
    //     }
    //   >
    //     <Hero />
    //     <StartShopping />
    //     <OurCollection />
    //     <FreeDelivery />
    //     <Feature />
    //     <LooksTheLast />
    //     <OurStory />
    //   </Suspense>
    // </div>

    <div className="pt-[62px] md:pt-[72px] xl:pt-[88px]">
      <Suspense
        fallback={
          <div className="h-[calc(100vh-88px)] flex justify-center items-center">
            <Spinner color="indigo" className="h-12 w-12" />
          </div>
        }
      >
        <Hero />
      </Suspense>
      <Suspense
        fallback={
          <div className="h-[calc(100vh-88px)] flex justify-center items-center">
            <Spinner color="indigo" className="h-12 w-12" />
          </div>
        }
      >
        <StartShopping />
      </Suspense>
      <Suspense
        fallback={
          <div className="h-[calc(100vh-88px)] flex justify-center items-center">
            <Spinner color="indigo" className="h-12 w-12" />
          </div>
        }
      >
        <OurCollection />
      </Suspense>
      <Suspense
        fallback={
          <div className="h-[calc(100vh-88px)] flex justify-center items-center">
            <Spinner color="indigo" className="h-12 w-12" />
          </div>
        }
      >
        <FreeDelivery />
      </Suspense>
      <Suspense
        fallback={
          <div className="h-[calc(100vh-88px)] flex justify-center items-center">
            <Spinner color="indigo" className="h-12 w-12" />
          </div>
        }
      >
        <Feature />
      </Suspense>
      <Suspense
        fallback={
          <div className="h-[calc(100vh-88px)] flex justify-center items-center">
            <Spinner color="indigo" className="h-12 w-12" />
          </div>
        }
      >
        <LooksTheLast />
      </Suspense>
      <Suspense
        fallback={
          <div className="h-[calc(100vh-88px)] flex justify-center items-center">
            <Spinner color="indigo" className="h-12 w-12" />
          </div>
        }
      >
        <OurStory />
      </Suspense>
    </div>
  );
}

export default Home;
