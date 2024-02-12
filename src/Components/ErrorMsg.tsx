function ErrorMsg({ message }: { message: string | null }) {
  return <p className="error-msg">{message}</p>;
}

export default ErrorMsg;
