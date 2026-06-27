import Container from "../common/Container";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-8">

      <Container>

        <div className="flex flex-col items-center justify-between gap-3 md:flex-row">

          <h2 className="font-semibold tracking-wide">
            MediVerse
          </h2>

          <p className="text-sm text-slate-400">
            Built with React • FastAPI • XGBoost • Sentence Transformers
          </p>

        </div>

      </Container>

    </footer>
  );
}