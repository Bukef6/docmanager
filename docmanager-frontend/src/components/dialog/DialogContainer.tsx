interface DialogContainerProps {
  children: React.ReactNode;
}

export const DialogContainer = ({ children }: DialogContainerProps) => (
  <div className="bg-white rounded-lg w-full max-w-md p-6 shadow-lg relative z-50">
    {children}
  </div>
);
