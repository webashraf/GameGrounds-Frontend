/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAnimate } from "framer-motion";
import { FC, MouseEvent } from "react";
import {
  SiAdobe,
  SiApple,
  SiFacebook,
  SiGoogle,
  SiLinkedin,
  SiShopify,
  SiSoundcloud,
  SiSpotify,
  SiTiktok,
} from "react-icons/si";
import CommonHeading from "../../../shared/CommonHeading/CommonHeading";

// Define the type for the Icon component
interface LinkBoxProps {
  Icon: FC<{ className?: string }>;
  href: string;
}

export const OurFields: FC = () => {
  return (
    <div className="bg-neutral-50 px-4 py-12">
      <div className="mx-auto max-w-7xl">
        <ClipPathLinks />
      </div>
    </div>
  );
};

const ClipPathLinks: FC = () => {
  return (
    <div className="section-padding">
      <CommonHeading
        title="Let’s Get Social"
        subTitle="Stay Updated with Our Social Feeds"
      />

      <div className="divide-y divide-neutral-900 border border-neutral-900">
        <div className="grid grid-cols-2 divide-x divide-neutral-900">
          <LinkBox Icon={SiGoogle} href="#" />
          <LinkBox Icon={SiShopify} href="#" />
        </div>
        <div className="grid grid-cols-4 divide-x divide-neutral-900">
          <LinkBox Icon={SiApple} href="#" />
          <LinkBox Icon={SiSoundcloud} href="#" />
          <LinkBox Icon={SiAdobe} href="#" />
          <LinkBox Icon={SiFacebook} href="#" />
        </div>
        <div className="grid grid-cols-3 divide-x divide-neutral-900">
          <LinkBox Icon={SiTiktok} href="#" />
          <LinkBox Icon={SiSpotify} href="#" />
          <LinkBox Icon={SiLinkedin} href="#" />
        </div>
      </div>
    </div>
  );
};

const NO_CLIP = "polygon(0 0, 100% 0, 100% 100%, 0% 100%)";
const BOTTOM_RIGHT_CLIP = "polygon(0 0, 100% 0, 0 0, 0% 100%)";
const TOP_RIGHT_CLIP = "polygon(0 0, 0 100%, 100% 100%, 0% 100%)";
const BOTTOM_LEFT_CLIP = "polygon(100% 100%, 100% 0, 100% 100%, 0 100%)";
const TOP_LEFT_CLIP = "polygon(0 0, 100% 0, 100% 100%, 100% 0)";

const ENTRANCE_KEYFRAMES: Record<string, string[]> = {
  left: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  bottom: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  top: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  right: [TOP_LEFT_CLIP, NO_CLIP],
};

const EXIT_KEYFRAMES: Record<string, string[]> = {
  left: [NO_CLIP, TOP_RIGHT_CLIP],
  bottom: [NO_CLIP, TOP_RIGHT_CLIP],
  top: [NO_CLIP, TOP_RIGHT_CLIP],
  right: [NO_CLIP, BOTTOM_LEFT_CLIP],
};

const LinkBox: FC<LinkBoxProps> = ({ Icon, href }) => {
  const [scope, animate]: any = useAnimate();

  const getNearestSide = (e: MouseEvent<HTMLAnchorElement>): string => {
    const box = e.currentTarget.getBoundingClientRect();

    const proximityToLeft = {
      proximity: Math.abs(box.left - e.clientX),
      side: "left",
    };
    const proximityToRight = {
      proximity: Math.abs(box.right - e.clientX),
      side: "right",
    };
    const proximityToTop = {
      proximity: Math.abs(box.top - e.clientY),
      side: "top",
    };
    const proximityToBottom = {
      proximity: Math.abs(box.bottom - e.clientY),
      side: "bottom",
    };

    const sortedProximity = [
      proximityToLeft,
      proximityToRight,
      proximityToTop,
      proximityToBottom,
    ].sort((a, b) => a.proximity - b.proximity);

    return sortedProximity[0].side;
  };

  const handleMouseEnter = (e: MouseEvent<HTMLAnchorElement>) => {
    const side = getNearestSide(e);

    animate(scope.current, {
      clipPath: ENTRANCE_KEYFRAMES[side],
    });
  };

  const handleMouseLeave = (e: MouseEvent<HTMLAnchorElement>) => {
    const side = getNearestSide(e);

    animate(scope.current, {
      clipPath: EXIT_KEYFRAMES[side],
    });
  };

  return (
    <a
      href={href}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative grid h-20 w-full place-content-center sm:h-28 md:h-36"
    >
      <Icon className="text-xl sm:text-3xl lg:text-4xl" />

      <div
        ref={scope}
        style={{
          clipPath: BOTTOM_RIGHT_CLIP,
        }}
        className="absolute inset-0 grid place-content-center bg-neutral-900 text-white"
      >
        <Icon className="text-xl sm:text-3xl md:text-4xl" />
      </div>
    </a>
  );
};
