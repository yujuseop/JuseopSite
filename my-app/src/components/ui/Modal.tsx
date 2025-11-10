import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  footer?: ReactNode;
  children?: ReactNode;
  closeOnBackdrop?: boolean;
}

export default function Modal({
  open,
  onClose,
  title,
  description,
  footer,
  children,
  closeOnBackdrop = true,
}: ModalProps) {
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
      aria-describedby={description ? "modal-description" : undefined}
      onClick={() => {
        if (!closeOnBackdrop) return;
        onClose();
      }}
    >
      <div
        className="relative w-full max-w-xl rounded-2xl bg-white shadow-2xl transition dark:bg-gray-900"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 transition hover:text-gray-600 dark:hover:text-gray-200"
          aria-label="Close modal"
        >
          ×
        </button>

        <div className="space-y-4 p-6">
          {title ? (
            <header className="space-y-1">
              <h3 id="modal-title" className="text-2xl font-semibold">
                {title}
              </h3>
              {description ? (
                <p
                  id="modal-description"
                  className="text-sm text-muted-foreground"
                >
                  {description}
                </p>
              ) : null}
            </header>
          ) : null}

          <div className="text-sm leading-relaxed text-muted-foreground">
            {children}
          </div>
        </div>

        {footer ? (
          <footer className="flex justify-end gap-2 border-t border-border bg-muted/30 px-6 py-4">
            {footer}
          </footer>
        ) : null}
      </div>
    </div>,
    document.body
  );
}
