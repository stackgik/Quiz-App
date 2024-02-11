interface ICircleProps {
  num: number;
  isActive: boolean;
  current: boolean;
}

const Circle = ({ num, isActive, current }: ICircleProps) => {
  const markup = (
    <svg xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="m10 13.6l5.9-5.9q.275-.275.7-.275t.7.275q.275.275.275.7t-.275.7l-6.6 6.6q-.3.3-.7.3t-.7-.3l-2.6-2.6q-.275-.275-.275-.7t.275-.7q.275-.275.7-.275t.7.275z"
      />
    </svg>
  );

  return (
    <div className="shell">
      <span
        className={`circle ${isActive && !current ? 'active' : ''} ${
          current && 'current'
        }`}
      >
        {isActive && !current && markup}
        {!isActive && num}
      </span>
    </div>
  );
};

export default Circle;
