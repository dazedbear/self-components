import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Task extends Component {

  static propTypes = {
    task: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
    }),
    onArchiveTask: PropTypes.func,
    onPinTask: PropTypes.func,
  }

  render() {
    const { task: { id, title, state }, onArchiveTask, onPinTask } = this.props;
    return (
      <div className={`list-item ${state}`}>
        <label className="checkbox">
          <input
            type="checkbox"
            defaultChecked={state === 'TASK_ARCHIVED'}
            disabled={true}
            name="checked"
          />
          <span className="checkbox-custom" onClick={() => onArchiveTask(id)} />
        </label>
        <div className="title">
          <input type="text" value={title} readOnly={true} placeholder="Input title" />
        </div>

        <div className="actions" onClick={event => event.stopPropagation()}>
          {state !== 'TASK_ARCHIVED' && (
            <a href="javascript:void(0)" onClick={() => onPinTask(id)}>
              <span className={`icon-star`} />
            </a>
          )}
        </div>
      </div>
    );
  }
}

export default Task;