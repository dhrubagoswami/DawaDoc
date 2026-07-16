interface Props {
  open: boolean;
  title: string;
  body: string;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({ open, title, body, confirmLabel, cancelLabel, onConfirm, onCancel }: Props) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-5 backdrop-blur-sm"
      onClick={onCancel}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-xl dark:bg-zinc-900"
      >
        <h2 id="confirm-dialog-title" className="text-lg font-semibold text-ink-900 dark:text-zinc-100">
          {title}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-ink-700/80 dark:text-zinc-400">{body}</p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full border-2 border-sage-200 bg-white px-5 py-2 text-sm font-semibold text-sage-700 transition-colors hover:bg-sage-50 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-full bg-clay-500 px-5 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-clay-600"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
