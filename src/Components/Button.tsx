interface IButtonProps {
  classy: string;
  onHit?(): void;
  children: React.ReactNode;
  disabled?: boolean;
}

function Button({ children, onHit, classy, disabled }: IButtonProps) {
  return (
    <button className={classy} onClick={onHit} disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;
