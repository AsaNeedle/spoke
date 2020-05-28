import PropTypes from "prop-types";
import React from "react";

import { delimit } from "../lib/scripts";
import Chip from "./Chip";
import { red400, green500, green600, grey100 } from "material-ui/styles/colors";

const styles = {
  editor: {
    border: "1px solid #ddd",
    cursor: "text",
    fontSize: 16,
    padding: 5
  },
  button: {
    marginTop: 10,
    textAlign: "center"
  },
  goodField: {
    color: green500,
    direction: "ltr",
    unicodeBidi: "bidi-override"
  },
  badField: {
    color: red400
  },
  unselectedTag: {
    fontSize: "11px",
    color: green600,
    textTransform: "none",
    backgroundColor: grey100,
    // margin: '5px 10px',
    cursor: "pointer"
    // display: 'inline-block',
  },
  selectedTag: {
    fontSize: "11px",
    color: grey100,
    textTransform: "none",
    backgroundColor: green600,
    // margin: '5px 10px',
    cursor: "pointer"
    // display: 'inline-block',
  },
  scriptFieldButtonSection: {
    marginTop: 10,
    padding: 5
  }
};

class TagsSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTags: props.selectedTags,
      readyToAdd: false
    };

    this.toggleTag = this.toggleTag.bind(this);
    // start out with buttons disabled for 200ms
    // because sometimes the click to open lands
    // on one of the items.  After it opens, we enable them.
    setTimeout(() => {
      this.setState({ readyToAdd: true });
    }, 200);
  }

  getValue() {
    let value = "";
    Object.keys(this.state.selectedTags).forEach(tag => {
      if (this.state.selectedTags[tag]) {
        if (value !== "") {
          value += ", ";
        }
        value += tag;
      }
    });
    return value;
  }

  toggleTag(tag) {
    const { readyToAdd } = this.state;
    if (!readyToAdd) {
      return;
    }
    this.setState(
      prevState => {
        const newSelectedTags = Object.assign({}, prevState.selectedTags);
        newSelectedTags[tag] = !newSelectedTags[tag];
        return { selectedTags: newSelectedTags };
      },
      () => {
        const { onChange } = this.props;
        if (onChange) {
          onChange(this.state.selectedTags);
        }
      }
    );
  }

  renderCustomTags() {
    const { customTags } = this.props;
    return (
      <div style={styles.scriptFieldButtonSection}>
        {customTags.map(tag => (
          <Chip
            style={
              this.state.selectedTags[tag]
                ? styles.selectedTag
                : styles.unselectedTag
            }
            text={delimit(tag)}
            onTouchTap={() => this.toggleTag(tag)}
          />
        ))}
      </div>
    );
  }

  render() {
    return <div>{this.renderCustomTags()}</div>;
  }
}

TagsSelector.propTypes = {
  customTags: PropTypes.array,
  onChange: PropTypes.func,
  selectedTags: PropTypes.object
};

export default TagsSelector;
