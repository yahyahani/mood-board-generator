export default function MoodTag({ tag, runnerUps }) {
  if (!tag) return null;

  return (
    <div className="mood-tag-wrapper">
      <span className="mood-tag">{tag}</span>
      {runnerUps && runnerUps.length > 0 && (
        <span className="mood-tag-runnerups">
          ook gevonden: {runnerUps.join(', ')}
        </span>
      )}
    </div>
  );
}
