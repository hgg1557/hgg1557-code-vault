type Item = { label: string; href: string };

type Props = { items: Item[]; activeHref?: string };

export function AdminSidebar({ items, activeHref }: Props) {
  return <nav aria-label="Admin navigation"><ul>{items.map(item => <li key={item.href}><a href={item.href} aria-current={item.href === activeHref ? "page" : undefined}>{item.label}</a></li>)}</ul></nav>;
}
