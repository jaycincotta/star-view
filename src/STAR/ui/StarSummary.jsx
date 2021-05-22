import React, { useRef } from "react";
import useWidth from "../useWidth";
import CandidateGroup from "./CandidateGroup";
import { flattenSingle, flattenMulti } from "../flatten";

export default function StarSummary(props) {
  const tableRef = useRef();
  const tableWidth = useWidth(tableRef);

  const { cvr, showHelp, isMulti, onHover, selected } = props;
  const votes = cvr.voters.length;
  const undervotes = cvr.undervotes.length;
  const { sections, candidates, matrix } = isMulti
    ? flattenMulti(cvr)
    : flattenSingle(cvr);

  return (
    <div className="widget">
      <div className="star">
        <h1 className="title">{props.title}</h1>
        <h2 className="subtitle">
          {votes} voters {undervotes ? `plus ${undervotes} undervotes` : ""}
        </h2>
        {showHelp && (
          <div
            className="helpTip"
            style={{ maxWidth: tableWidth - 16, marginLeft: 8, marginRight: 8 }}
          >
            {isMulti
              ? "In a Multi-Winner election, the tabulation process is repeated until all candidates have been ranked."
              : "In a Single-Winner election, the winner is shown first, followed by the runner-up finalist, then the other candidates by descending total score."}
          </div>
        )}
        <div ref={tableRef}>
          {sections.map((section, n) => (
            <CandidateGroup
              key={isMulti ? `m${n}` : `s${n}`}
              section={section}
              onHover={onHover}
              isMulti={isMulti}
              selected={selected}
              cvr={cvr}
            />
          ))}
        </div>
      </div>
    </div>
  );
}