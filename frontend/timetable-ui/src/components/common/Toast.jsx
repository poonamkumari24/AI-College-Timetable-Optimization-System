export default function Toast({ message, onClose }) {
  if (!message) return null;
  return (
    <div className="fixed bottom-5 right-5 z-50 flex max-w-sm items-center gap-3 rounded-xl border border-outline-variant bg-surface-container-lowest px-4 py-3 shadow-lg">
      <span className="h-2.5 w-2.5 rounded-full bg-primary-container" />
      <span className="text-body-sm font-medium text-on-surface">{message}</span>
      <button onClick={onClose} className="ml-auto text-on-surface-variant hover:text-on-surface" aria-label="Close notification">×</button>
    </div>
  );
}
