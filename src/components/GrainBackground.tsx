export default function GrainBackground() {
  return (
    <div aria-hidden className="grain-bg pointer-events-none fixed inset-0 -z-10">
      <div className="grain-bg__base" />
      <div className="grain-bg__sheen" />
      <div className="grain-bg__noise" />
      <div className="grain-bg__vignette" />
    </div>
  );
}
