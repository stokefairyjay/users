import { ReactNodeArray } from "prop-types";
import * as React from "react";
import reactStringReplace from "react-string-replace";

const Highlight = (props: {
    searchString: string;
    searchTerm: string;
    style: React.CSSProperties;
}) => {
    const { searchString, searchTerm } = props;
    let replacedText: ReactNodeArray = [<>{searchString}</>];

    const newRegex = new RegExp(searchTerm, "gis");
    const match = searchString.match(newRegex);
    let rep = "";
    if (match?.[0]) {
        rep = match[0];
    }

    replacedText = reactStringReplace(
        searchString,
        rep,
        (match: string, i: number) => (
            <span key={i} style={props.style}>
                {match}
            </span>
        )
    );

    return <>{replacedText}</>;
};

export default React.memo(Highlight);
