import React, { Component, PropTypes } from "react";

const NEW_ANNOTATION = "new_annotation";

const propTypes = {
  channel: PropTypes.object.isRequired,
  getCurrentTime: PropTypes.func.isRequired,
};

class Annotation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      annotations: []
    };
    this.onNewAnnotation = this.onNewAnnotation.bind(this);
    this.props.channel.on(NEW_ANNOTATION, this.onNewAnnotation);
  }

  onNewAnnotation(resp) {
    let annotations = this.state.annotations;
    annotations.push(resp);
    this.setState({ annotations });
  }

  onSubmit() {
    const payload = {
      body: this.annotationValue.value,
      at: this.props.getCurrentTime(),
    };
    this.props.channel.push(NEW_ANNOTATION, payload);
    this.annotationValue.value = "";
  }

  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">Annotations</h3>
        </div>
        <div id="msg-container" className="panel-body annotations">
          {this.state.annotations.map(({ user, body }, index) => {
            return (
              <a key={`anno_${index}_${Date.now()}`} onClick={() => console.log("done")}>
                <b>{user.username}</b>: {body}
              </a>
            );
          })}
        </div>
        <div className="panel-footer">
          <textarea id="msg-input" rows="3"
            ref={(input) => this.annotationValue = input}
            className="form-control"
            placeholder="Comment..."></textarea>
          <button id="msg-submit"
            onClick={() => this.onSubmit()}
            type="submit"
            className="btn btn-primary form-control">
            Post
          </button>
        </div>
      </div>
    );
  }
}

Annotation.propTypes = propTypes;

export default Annotation;