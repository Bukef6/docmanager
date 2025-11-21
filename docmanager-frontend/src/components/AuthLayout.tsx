import Card from "./ui/Card";
import Logo from "./ui/Logo";

interface AuthLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export default function AuthLayout({
  title,
  description,
  children,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center gap-2">
            <Logo />
            <h2 className="text-3xl font-semibold text-gray-800">DocManager</h2>
          </div>
        </div>

        <Card title={title} description={description} className="bg-gray-400">
          {children}
        </Card>
      </div>
    </div>
  );
}
