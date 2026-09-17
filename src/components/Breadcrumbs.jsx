import { Link } from "react-router-dom";

export default function Breadcrumbs({ items = [] }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="text-sm mb-6"
    >
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li
              key={`${item.name}-${index}`}
              className="flex items-center gap-2"
            >
              {index > 0 && (
                <span aria-hidden="true">/</span>
              )}

              {isLast || !item.url ? (
                <span aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link
                  to={item.url}
                  className="hover:underline"
                >
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}