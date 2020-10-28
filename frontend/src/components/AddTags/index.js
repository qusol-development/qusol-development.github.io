import React from "react";
import "./styles.css";

class AddTags extends React.Component {
  state = {
    items: this.props.tags ||[],
    value: "",
    error: null
  };

  handleKeyDown = (evt) => {
    if (["Enter", "Tab", ",", " "].includes(evt.key)) {
      evt.preventDefault();
      var value = this.state.value.trim();
      if (value && this.isValid(value)) {
        this.setState({
          items: [...this.state.items, "#"+this.state.value],
          value: ""
        });
        this.props.setQuestion({...this.props.question,tags:[...this.state.items, "#"+this.state.value]})
      }
    }
  };

  handleChange = (evt) => {
    this.setState({
      value: evt.target.value,
      error: null
    });
  };

  handleDelete = (item) => {
    this.setState({
      items: this.state.items.filter((i) => i !== item)
    });
    this.props.setQuestion({...this.props.question,tags:this.state.items})
  };

  handlePaste = (evt) => {
    evt.preventDefault();
    var paste = evt.clipboardData.getData("text");
    var tags = paste.split(" ");
    if (tags) {
      var toBeAdded = tags.filter((tag) => !this.isInList(tag));
      this.setState({
        items: [...this.state.items, ...toBeAdded]
      });
      this.props.setQuestion({...this.props.question,tags:this.state.items})
    }
  };

  isValid(email) {
    return true;
  }

  isInList(email) {
    return this.state.items.includes(email);
  }

  render() {
    return (
      <>
        {this.state.items.map((item) => (
          <div className="tag-item" key={item}>
            {item}
            {this.props.viewer?null:<button
              type="button"
              className="button"
              onClick={() => this.handleDelete(item)}
            >
              &times;
            </button>}
          </div>
        ))}

        {this.props.viewer?null:<input
          className={"input " + (this.state.error && " has-error")}
          value={this.state.value}
          placeholder="Type tags for your question here..."
          onKeyDown={this.handleKeyDown}
          onChange={this.handleChange}
          onPaste={this.handlePaste}
        />}

        {this.state.error && <p className="error">{this.state.error}</p>}
      </>
    );
  }
}

export default AddTags;