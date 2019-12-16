import React from "react";
import {
    LiveProvider, LiveEditor, LiveError, LivePreview,
} from "react-live";
import Select from "react-dropdown-select";

const Basic = ({ options }) => (
    <>
        <LiveProvider scope={{ Select, options }}>
            <LiveEditor />
            <br />
            <LiveError />
            <LivePreview />
        </LiveProvider>
    </>
);

Basic.propTypes = {};

export default Basic;
