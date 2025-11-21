interface DialogOverlayProps {
  children: React.ReactNode;
}

export const DialogOverlay = ({ children }: DialogOverlayProps) => (
  <div className="fixed inset-0 bg-gray-900/80 bg-opacity-50 flex justify-center items-center z-50">
    {children}
  </div>
);
