// components/TOC.tsx
import { useActiveHeading } from '@/hooks/useActiveHeading'

export function TOC({ headings }: { headings: { id: string; text: string; level: number }[] }) {
  const activeId = useActiveHeading(headings.map((h) => h.id))

  return (
    <aside className="w-64 p-4 sticky top-0">
      <ul className="space-y-2">
        {headings.map(({ id, text, level }) => (
          <li key={id} className={`ml-${(level - 2) * 4}`}>
            <a
              href={`#${id}`}
              className={id === activeId ? 'text-blue-600 font-bold' : 'text-gray-600'}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  )
}
