import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "../../../ui/button";

type SquareData = {
  id: number;
  src: string;
};

const squareData: SquareData[] = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1547347298-4074fc3086f0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1510925758641-869d353cecc7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1629901925121-8a141c2a42f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1580238053495-b9720401fd45?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1569074187119-c87815b476da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1325&q=80",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1556817411-31ae72fa3ea0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1599586120429-48281b6f0ece?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  },
  {
    id: 8,
    src: "https://plus.unsplash.com/premium_photo-1671436824833-91c0741e89c9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1610768764270-790fbec18178?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1507034589631-9433cc6bc453?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=684&q=80",
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1533107862482-0e6974b06ec4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=882&q=80",
  },
  {
    id: 13,
    src: "https://images.unsplash.com/photo-1560089000-7433a4ebbd64?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  },
  {
    id: 14,
    src: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80",
  },
  {
    id: 15,
    src: "https://images.unsplash.com/photo-1606244864456-8bee63fce472?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=681&q=80",
  },
  {
    id: 16,
    src: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1820&q=80",
  },
];

const shuffle = (array: SquareData[]): SquareData[] => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const generateSquares = (): JSX.Element[] => {
  return shuffle(squareData).map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.5, type: "spring" }}
      className="w-full h-full"
      style={{
        backgroundImage: `url(${sq.src})`,
        backgroundSize: "cover",
      }}
    ></motion.div>
  ));
};

const ShuffleGrid: React.FC = () => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [squares, setSquares] = useState<JSX.Element[]>(generateSquares());

  useEffect(() => {
    shuffleSquares();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const shuffleSquares = () => {
    setSquares(generateSquares());

    timeoutRef.current = setTimeout(shuffleSquares, 3000);
  };

  return (
    <div className="grid grid-cols-4 grid-rows-4 h-[650px] gap-1">
      {squares.map((sq) => sq)}
    </div>
  );
};

const OurFields: React.FC = () => {
  return (
    <section className="w-full px- section-padding mb-20 grid grid-cols-1 lg:grid-cols-2 items-center items-c gap-14 max-w-[90%] mx-auto">
      <div>
        <h3 className="text-4xl md:text-6xl uppercase">
          Sports Field Showcase
        </h3>
        <p className="text-base md:text-lg text-slate-700 mb-2 md:mb-4">
          Take a visual journey through our extensive range of sports
          facilities, designed to accommodate a wide variety of sports and
          events with excellence.
        </p>
        <ul className="mb-4 md:mb-6">
          <li>
            <strong> ✨State-of-the-Art Fields</strong>: Carefully maintained
            and designed fields, adaptable for soccer, rugby, field hockey, and
            more.
          </li>
          <li>
            <strong> ✨Advanced Turf Technology</strong>: High-quality, durable
            turf ensures optimal performance and safety for athletes.
          </li>
          <li>
            <strong> ✨Multi-Sport Courts</strong>: Versatile courts available
            for basketball, volleyball, tennis, and badminton.
          </li>
          <li>
            <strong> ✨Spectator Seating</strong>: Comfortable, spacious seating
            areas to enhance the viewing experience for fans and families.
          </li>
          <li>
            <strong> ✨Modern Lighting Systems</strong>: Bright,
            energy-efficient LED lighting for clear visibility during night
            games.
          </li>
          <li>
            <strong>✨Training and Practice Areas</strong>: Dedicated zones for
            warm-ups, drills, and individual or team practice sessions.
          </li>
          <li>
            <strong>✨On-Site Medical Support</strong>: First-aid and medical
            assistance available to ensure athlete safety during events.
          </li>
          <li>
            <strong>✨Event Support Services</strong>: Full-service event
            management to help organize tournaments, matches, and special
            events.
          </li>
          <li>
            <strong>✨Weather-Resistant Structures</strong>: Sheltered areas to
            protect players and spectators from adverse weather conditions.
          </li>
          <li>
            <strong>✨Advanced Scoreboards</strong>: Digital scoreboards and
            display screens for live updates and real-time event information.
          </li>
        </ul>

        <NavLink to="/facilities">
          <Button className=" text-white font-medium py-2 px-4  transition-all active:scale-95">
            Explore more
          </Button>
        </NavLink>
      </div>
      <ShuffleGrid />
    </section>
  );
};

export default OurFields;
