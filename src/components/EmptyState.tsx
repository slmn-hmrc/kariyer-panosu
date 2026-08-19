/**
 * EmptyState — Hiç kayıt yokken veya filtre sonuç vermediğinde gösterilir
 */

interface Props {
  title: string;
  description: string;
  action?: React.ReactNode;
}

export function EmptyState({ title, description, action }: Props) {
  return (
    <div className="border border-dashed border-ink-600 px-6 py-16 text-center">
      <p className="font-mono text-[10px] tracking-[0.22em] text-bone-500 uppercase">
        Kayıt yok
      </p>
      <h3 className="mt-3 font-display text-2xl text-bone-50">{title}</h3>
      <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-bone-300">
        {description}
      </p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}
