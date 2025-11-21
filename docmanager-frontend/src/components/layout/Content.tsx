interface ContentProps {
  children: React.ReactNode;
}

export default function Content({ children }: ContentProps) {
  return <main className="container mx-auto p-4 ">{children}</main>;
}
