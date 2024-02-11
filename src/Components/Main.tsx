interface IMainProps {
  children: React.ReactNode; //Type for children in React
}
const Main = ({ children }: IMainProps) => {
  return <div className="main">{children}</div>;
};

export default Main;
