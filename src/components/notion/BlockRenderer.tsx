import type { NotionBlock } from "@/lib/notion/client";

/** rich_text 배열에서 텍스트+스타일 추출 */
function renderRichText(richText: unknown): React.ReactNode[] {
  const arr = richText as Array<{
    plain_text?: string;
    href?: string | null;
    annotations?: {
      bold?: boolean;
      italic?: boolean;
      strikethrough?: boolean;
      underline?: boolean;
      code?: boolean;
    };
  }> | undefined;

  if (!arr) return [];

  return arr.map((t, i) => {
    let node: React.ReactNode = t.plain_text ?? "";
    const a = t.annotations;
    if (a?.bold) node = <strong key={i}>{node}</strong>;
    if (a?.italic) node = <em key={i}>{node}</em>;
    if (a?.strikethrough) node = <s key={i}>{node}</s>;
    if (a?.underline) node = <u key={i}>{node}</u>;
    if (a?.code)
      node = (
        <code key={i} className="rounded bg-gray-100 px-1.5 py-0.5 text-sm font-mono text-primary">
          {node}
        </code>
      );
    if (t.href)
      node = (
        <a
          key={i}
          href={t.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline hover:text-primary-dark"
        >
          {node}
        </a>
      );
    return node;
  });
}

function getBlockRichText(block: NotionBlock): unknown {
  const data = block[block.type] as Record<string, unknown> | undefined;
  return data?.rich_text;
}

function getBlockUrl(block: NotionBlock): string | null {
  const data = block[block.type] as Record<string, unknown> | undefined;
  if (!data) return null;
  // image block
  const file = data.file as { url?: string } | undefined;
  const external = data.external as { url?: string } | undefined;
  return file?.url ?? external?.url ?? null;
}

function getBlockCaption(block: NotionBlock): unknown {
  const data = block[block.type] as Record<string, unknown> | undefined;
  return data?.caption;
}

function getBlockLanguage(block: NotionBlock): string {
  const data = block[block.type] as Record<string, unknown> | undefined;
  return (data?.language as string) ?? "";
}

/** 연속된 리스트 아이템을 그룹으로 묶기 */
type BlockGroup =
  | { kind: "single"; block: NotionBlock }
  | { kind: "bulleted_list"; blocks: NotionBlock[] }
  | { kind: "numbered_list"; blocks: NotionBlock[] };

function groupBlocks(blocks: NotionBlock[]): BlockGroup[] {
  const groups: BlockGroup[] = [];

  for (const block of blocks) {
    if (block.type === "bulleted_list_item") {
      const last = groups[groups.length - 1];
      if (last?.kind === "bulleted_list") {
        last.blocks.push(block);
      } else {
        groups.push({ kind: "bulleted_list", blocks: [block] });
      }
    } else if (block.type === "numbered_list_item") {
      const last = groups[groups.length - 1];
      if (last?.kind === "numbered_list") {
        last.blocks.push(block);
      } else {
        groups.push({ kind: "numbered_list", blocks: [block] });
      }
    } else {
      groups.push({ kind: "single", block });
    }
  }

  return groups;
}

export default function BlockRenderer({ blocks }: { blocks: NotionBlock[] }) {
  if (!blocks || blocks.length === 0) return null;

  const groups = groupBlocks(blocks);

  return (
    <div className="notion-content space-y-4">
      {groups.map((group, gi) => {
        if (group.kind === "bulleted_list") {
          return (
            <ul key={`bl-${gi}`} className="ml-6 list-disc space-y-1.5">
              {group.blocks.map((block) => (
                <li key={block.id} className="text-[length:var(--font-size-body)] text-foreground break-keep">
                  {renderRichText(getBlockRichText(block))}
                </li>
              ))}
            </ul>
          );
        }

        if (group.kind === "numbered_list") {
          return (
            <ol key={`nl-${gi}`} className="ml-6 list-decimal space-y-1.5">
              {group.blocks.map((block) => (
                <li key={block.id} className="text-[length:var(--font-size-body)] text-foreground break-keep">
                  {renderRichText(getBlockRichText(block))}
                </li>
              ))}
            </ol>
          );
        }

        const block = group.block;
        switch (block.type) {
          case "paragraph":
            return (
              <p key={block.id} className="text-[length:var(--font-size-body)] leading-relaxed text-foreground break-keep">
                {renderRichText(getBlockRichText(block))}
              </p>
            );

          case "heading_1":
            return (
              <h2 key={block.id} className="mt-8 mb-4 text-2xl font-bold text-foreground break-keep">
                {renderRichText(getBlockRichText(block))}
              </h2>
            );

          case "heading_2":
            return (
              <h3 key={block.id} className="mt-6 mb-3 text-xl font-bold text-foreground break-keep">
                {renderRichText(getBlockRichText(block))}
              </h3>
            );

          case "heading_3":
            return (
              <h4 key={block.id} className="mt-4 mb-2 text-lg font-semibold text-foreground break-keep">
                {renderRichText(getBlockRichText(block))}
              </h4>
            );

          case "quote":
            return (
              <blockquote
                key={block.id}
                className="border-l-4 border-primary pl-4 italic text-muted"
              >
                {renderRichText(getBlockRichText(block))}
              </blockquote>
            );

          case "callout": {
            const calloutData = block.callout as { icon?: { emoji?: string } } | undefined;
            const emoji = calloutData?.icon?.emoji ?? "💡";
            return (
              <div
                key={block.id}
                className="flex gap-3 rounded-xl bg-primary/5 p-4"
              >
                <span className="text-xl">{emoji}</span>
                <div className="text-[length:var(--font-size-body)] text-foreground break-keep">
                  {renderRichText(getBlockRichText(block))}
                </div>
              </div>
            );
          }

          case "image": {
            const url = getBlockUrl(block);
            const caption = renderRichText(getBlockCaption(block));
            if (!url) return null;
            return (
              <figure key={block.id} className="my-6">
                <img
                  src={url}
                  alt=""
                  className="w-full rounded-xl"
                  loading="lazy"
                />
                {caption && caption.length > 0 && (
                  <figcaption className="mt-2 text-center text-sm text-muted">
                    {caption}
                  </figcaption>
                )}
              </figure>
            );
          }

          case "code": {
            const lang = getBlockLanguage(block);
            return (
              <pre
                key={block.id}
                className="overflow-x-auto rounded-xl bg-gray-900 p-4 text-sm text-gray-100"
              >
                {lang && (
                  <div className="mb-2 text-xs text-gray-400">{lang}</div>
                )}
                <code>{renderRichText(getBlockRichText(block))}</code>
              </pre>
            );
          }

          case "divider":
            return <hr key={block.id} className="my-8 border-border" />;

          case "bookmark": {
            const bmData = block.bookmark as { url?: string } | undefined;
            const bmUrl = bmData?.url;
            if (!bmUrl) return null;
            return (
              <a
                key={block.id}
                href={bmUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-xl border border-border p-4 text-sm text-primary hover:bg-surface transition-colors"
              >
                {bmUrl}
              </a>
            );
          }

          default:
            return null;
        }
      })}
    </div>
  );
}
