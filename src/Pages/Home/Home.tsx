import { useAppDispatch, useAppSelector } from "../../Redux/hook";

const Home = () => {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return <div></div>;
};

export default Home;
