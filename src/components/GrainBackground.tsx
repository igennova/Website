export default function GrainBackground() {
  return (
    <div aria-hidden className="grain-bg pointer-events-none fixed inset-0 -z-10">
      <div className="grain-bg__gradient" />
      <div className="grain-bg__orb grain-bg__orb--1" />
      <div className="grain-bg__orb grain-bg__orb--2" />
      <div className="grain-bg__noise" />
      <div className="grain-bg__speckle" />
    </div>
  );
}
