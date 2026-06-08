export function AboutSection({ summary }: { summary: string }) {
  return (
    <section className="section" id="about" aria-labelledby="about-heading">
      <div className="container">
        <h2 className="section-heading" id="about-heading">About</h2>
        <p>{summary}</p>
      </div>
    </section>
  );
}
