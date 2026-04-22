import { parseMarkdown } from '@/lib/markdown';

type MarkdownDocumentProps = {
  content: string;
};

export default function MarkdownDocument({ content }: MarkdownDocumentProps) {
  const blocks = parseMarkdown(content);

  return (
    <div className="space-y-6 rounded-3xl border border-white/10 bg-black/30 p-6 text-gray-200 backdrop-blur-sm sm:p-8">
      {blocks.map((block, index) => {
        if (block.type === 'heading') {
          if (block.level === 1) {
            return (
              <div key={`${block.text}-${index}`} className="border-b border-white/10 pb-5">
                <h2 className="text-3xl font-bold text-white sm:text-4xl">{block.text}</h2>
              </div>
            );
          }

          return (
            <h3
              key={`${block.text}-${index}`}
              className="pt-2 text-xl font-semibold text-cyan-300 sm:text-2xl"
            >
              {block.text}
            </h3>
          );
        }

        if (block.type === 'list') {
          return (
            <ul
              key={`list-${index}`}
              className="space-y-3 rounded-2xl border border-white/8 bg-white/[0.03] p-5 text-base leading-7 text-gray-200"
            >
              {block.items.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-cyan-300" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          );
        }

        return (
          <p key={`${block.text}-${index}`} className="text-base leading-8 text-gray-300 sm:text-lg">
            {block.text}
          </p>
        );
      })}
    </div>
  );
}