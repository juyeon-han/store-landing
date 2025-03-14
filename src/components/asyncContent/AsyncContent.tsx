interface AsyncContentProps {
  isPending: boolean;
  PendingComponent: JSX.Element;
  isError: boolean;
  ErrorComponent: JSX.Element;
  children: React.ReactNode;
}

const AsyncContent = (props: AsyncContentProps) => {
  const { isPending, PendingComponent, isError, ErrorComponent, children } =
    props;

  if (isError) {
    return ErrorComponent;
  }
  if (isPending) {
    return PendingComponent;
  }
  return children;
};
export default AsyncContent;
