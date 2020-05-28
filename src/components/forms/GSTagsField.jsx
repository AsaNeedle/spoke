import React from "react";
import GSFormField from "./GSFormField";
import TagsSelector from "../TagsSelector";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";

const styles = {
  dialog: {
    zIndex: 10001
  }
};

export default class GSTagsField extends GSFormField {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      selectedTags: {},
      tagsText: ""
    };
  }
  componentDidMount() {
    this.props.customTags.forEach(tag => {
      this.setState(prevState => {
        const newState = Object.assign(prevState, {});
        newState.selectedTags[tag] = false;
        return newState;
      });
    });
  }

  handleTagClick = value => {
    this.setState({ selectedTags: value });
    let newTagsText = "";
    Object.keys(this.state.selectedTags).forEach(tag => {
      if (this.state.selectedTags[tag]) {
        if (this.state.newTagsText !== "") {
          newTagsText += ", ";
        }
        newTagsText += tag;
      }
    });
    this.setState({ tagsText });
  };

  handleOpenDialog = event => {
    event.stopPropagation();
    event.preventDefault();
    this.setState(
      {
        open: true,
        customTags: this.props.customTags
      },
      () => this.refs.dialogTagInput.focus()
    );
  };

  handleCloseDialog = () => {
    this.setState({
      open: false
    });
  };

  handleSaveTags = () => {
    const value = this.state.tags;
    this.props.onChange(value);
    this.handleCloseDialog();
  };

  renderDialog() {
    const { open } = this.state;
    const { customTags } = this.props;
    return (
      <Dialog
        style={styles.dialog}
        actions={[
          <FlatButton label="Cancel" onTouchTap={this.handleCloseDialog} />,
          <RaisedButton label="Done" onTouchTap={this.handleSaveTags} primary />
        ]}
        modal
        open={open}
        onRequestClose={this.handleCloseDialog}
      >
        <TagsSelector
          expandable
          ref="dialogTagInput"
          selectedTags={this.state.selectedTags}
          customTags={customTags}
          onChange={this.handleTagClick}
        />
      </Dialog>
    );
  }

  render() {
    return (
      <div>
        <TextField
          multiLine
          onFocus={event => {
            this.handleOpenDialog(event);
          }}
          onTouchTap={event => {
            this.handleOpenDialog(event);
          }}
          floatingLabelText={this.floatingLabelText()}
          floatingLabelStyle={{
            zIndex: 0
          }}
          value={this.state.tagsText}
        />
        {this.renderDialog()}
      </div>
    );
  }
}
