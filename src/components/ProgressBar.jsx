import React from "react";

export default function ProgressBar({ current, total }) {
  // prevent division by zero
  const safeCurrent = Math.min(current, total);
  const percent = total > 0 ? Math.round((safeCurrent / total) * 100) : 0;

  return (
    <div className="progressWrap">
      {/* Visual bar */}
      <div className="progressBar">
        <div
          className="progressFill"
          style={{ width: `${percent}%` }}
        />
      </div>

      {/* Text indicator */}
      <div className="progressText">
        {safeCurrent} of {total} questions answered ({percent}% complete)
      </div>
    </div>
  );
}
