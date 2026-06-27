import Container from "./Container";

export default function Section({
  children,
  className = "",
}) {
  return (
    <section className={`py-28 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}