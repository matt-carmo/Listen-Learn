interface HeaderProps {
    title: string
}
export function Header(props: HeaderProps) {
  return (
    <header>
      <h1  className="text-2xl font-bold text-center">
        {props.title}
      </h1>
    </header>
  );
}
