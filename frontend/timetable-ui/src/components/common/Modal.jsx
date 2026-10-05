import Icon from "./Icon";

export default function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-on-background/30 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl border border-outline-variant bg-surface-container-lowest shadow-2xl">
        <div className="flex items-center justify-between border-b border-outline-variant p-5">
          <div className="flex items-center gap-2">
            <Icon className="text-primary">auto_awesome</Icon>
            <h2 className="text-headline-sm">{title}</h2>
          </div>
          <button onClick={onClose} className="rounded-lg p-2 text-on-surface-variant hover:bg-surface-container" aria-label="Close dialog">×</button>
        </div>
        <div className="p-5 text-body-md text-on-surface-variant">{children}</div>
      </div>
    </div>
  );
}
