interface OptionButtonProps {
  label: string;
  emoji?: string;
  selected?: boolean;
  onClick: () => void;
}

export default function OptionButton({ label, emoji, selected, onClick }: OptionButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-6 py-4 rounded-lg border-2 transition-all ${
        selected
          ? 'border-gigil-teal bg-gigil-teal bg-opacity-5 font-semibold'
          : 'border-gray-200 hover:border-gigil-teal hover:bg-gray-50'
      }`}
    >
      <span className="flex items-center gap-3">
        {emoji && <span className="text-2xl">{emoji}</span>}
        <span>{label}</span>
      </span>
    </button>
  );
}
