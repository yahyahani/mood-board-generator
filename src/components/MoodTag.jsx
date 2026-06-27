export default function MoodTag({ tag, runnerUps }) {
  if (!tag) return null;

  return (
    <div className="mood-tag-wrapper">
      <span className="mood-tag-label">sfeer</span>
      <p className="mood-tag">{tag}</p>
      {runnerUps && runnerUps.length > 0 && (
        <span className="mood-tag-runnerups">
          ook: {runnerUps.join(' · ')}
        </span>
      )}
    </div>
  );
}
