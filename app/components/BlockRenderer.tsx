type CardItem = { icon?: string; title?: string; description?: string };

type Block =
  | { type: "text"; value?: string; align?: "left" | "center" | "right" }
  | { type: "image"; value?: string; align?: "left" | "center" | "right" }
  | {
      type: "card";
      heading?: string;
      subheading?: string;
      columns?: 1 | 2 | 3 | 4;
      items?: CardItem[];
    };

const colMap: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
};

const alignMap: Record<string, string> = {
  left: "text-left",
  center: "text-center mx-auto",
  right: "text-right ml-auto",
};

function isUrl(v: string) {
  return /^https?:\/\//i.test(v) || v.startsWith("/");
}

export default function BlockRenderer({ blocks }: { blocks: Block[] | undefined | null }) {
  if (!Array.isArray(blocks) || blocks.length === 0) return null;

  return (
    <div className="space-y-10">
      {blocks.map((block, i) => {
        if (block.type === "text") {
          return (
            <div
              key={i}
              className={`prose prose-zinc max-w-none ${alignMap[block.align || "left"]}`}
              dangerouslySetInnerHTML={{ __html: block.value || "" }}
            />
          );
        }

        if (block.type === "image") {
          if (!block.value) return null;
          return (
            <div key={i} className={`w-full ${alignMap[block.align || "center"]}`}>
              <img
                src={block.value}
                alt="Content image"
                className="rounded-xl max-w-full h-auto border border-zinc-200"
              />
            </div>
          );
        }

        if (block.type === "card") {
          const cols = colMap[block.columns || 3] || colMap[3];
          return (
            <section key={i} className="w-full">
              {(block.heading || block.subheading) && (
                <div className="mb-6 text-center">
                  {block.heading && (
                    <h2 className="text-2xl font-bold text-zinc-900">{block.heading}</h2>
                  )}
                  {block.subheading && (
                    <p className="mt-2 text-sm text-zinc-500">{block.subheading}</p>
                  )}
                </div>
              )}
              <div className={`grid ${cols} gap-4`}>
                {(block.items || []).map((it, j) => (
                  <div
                    key={j}
                    className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
                  >
                    {it.icon && (
                      <div className="mb-3 w-10 h-10 flex items-center justify-center rounded-lg bg-zinc-100">
                        {isUrl(it.icon) ? (
                          <img src={it.icon} alt={`${it.title || "Item"} icon`} className="w-6 h-6 object-contain" />
                        ) : (
                          <span className="text-xl">{it.icon}</span>
                        )}
                      </div>
                    )}
                    {it.title && (
                      <h3 className="text-base font-semibold text-zinc-900">{it.title}</h3>
                    )}
                    {it.description && (
                      <p className="mt-1.5 text-sm text-zinc-600 leading-relaxed">
                        {it.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          );
        }

        return null;
      })}
    </div>
  );
}
