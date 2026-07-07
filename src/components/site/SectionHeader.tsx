type Props = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeader({ eyebrow, title, description, align = "center" }: Props) {
  const isCenter = align === "center";
  return (
    <div className={isCenter ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <div className={`flex items-center gap-3 ${isCenter ? "justify-center" : ""}`}>
        <span className="h-px w-8 bg-gold" />
        <span className="text-xs uppercase tracking-[0.3em] text-gold">{eyebrow}</span>
        <span className="h-px w-8 bg-gold" />
      </div>
      <h2 className="mt-4 font-display text-4xl leading-tight tracking-tight text-foreground md:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}
