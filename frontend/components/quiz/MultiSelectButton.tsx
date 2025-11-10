interface MultiSelectButtonProps {
  label: string;
  emoji?: string;
  selected: boolean;
  onClick: () => void;
}

export default function MultiSelectButton({ label, emoji, selected, onClick }: MultiSelectButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg border-2 transition-all ${
        selected
          ? 'border-gigil-teal bg-gigil-teal text-white font-semibold'
          : 'border-gray-300 hover:border-gigil-teal bg-white'
      }`}
    >
      <span className="flex items-center gap-2">
        {emoji && <span>{emoji}</span>}
        <span>{label}</span>
      </span>
    </button>
  );
}
