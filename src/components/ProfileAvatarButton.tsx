import type { DummyUser } from "../lib/useAuth";

function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function ProfileAvatarButton({ user, onClick }: { user: DummyUser; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`${user.name} — open profile`}
      className="flex h-10 w-10 items-center justify-center rounded-full bg-sage-600 text-sm font-semibold text-white shadow-sm ring-2 ring-white transition-transform hover:scale-105 dark:ring-zinc-800"
    >
      {initials(user.name)}
    </button>
  );
}
