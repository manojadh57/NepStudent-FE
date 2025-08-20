import HeaderThreeZone from "./HeaderThreeZone.jsx";
import SubtopicsSidebar from "./SubtopicsSidebar.jsx";

export default function ShellReddit({
  quotas = {},
  subtopics = [],
  active = "all",
  onSelect = () => {},
  children,
}) {
  return (
    <>
      <HeaderThreeZone quotas={quotas} />
      <div className="wrap">
        <section className="hero">
          <h1 className="h1">Study. Connect. Share.</h1>
        </section>
        <section className="main">
          <main>{children}</main>
          <SubtopicsSidebar
            items={subtopics}
            active={active}
            onSelect={onSelect}
          />
        </section>
      </div>
    </>
  );
}
