import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Task from '../task/task';

class TaskList extends Component {

  static propTypes = {
    /** 讀取中狀態 */
    loading: PropTypes.bool,
    tasks: PropTypes.arrayOf(Task.propTypes.task).isRequired,
    onPinTask: PropTypes.func.isRequired,
    onArchiveTask: PropTypes.func.isRequired,
  }

  static defaultProps = {
		loading: false,
	};

  loadingRow = () => {
    return (
      <div className="loading-item">
        <span className="glow-checkbox" />
        <span className="glow-text">
          <span>Loading</span> <span>cool</span> <span>state</span>
        </span>
      </div>
    );
  }

  loadingRender = () => {
    return (
      <div className="list-items">
        {this.loadingRow()}
        {this.loadingRow()}
        {this.loadingRow()}
        {this.loadingRow()}
        {this.loadingRow()}
        {this.loadingRow()}
      </div>
    );
  }

  renderTasks = () => {
    return (
      <div className="list-items">
        <div className="wrapper-message">
          <span className="icon-check" />
          <div className="title-message">You have no tasks</div>
          <div className="subtitle-message">Sit back and relax</div>
        </div>
      </div>
    );
  }

  render() {
    const { loading, tasks, onPinTask, onArchiveTask } = this.props;
    const tasksInOrder = [
      ...tasks.filter(t => t.state === 'TASK_PINNED'), //< ==== 固定頂部
      ...tasks.filter(t => t.state !== 'TASK_PINNED'),
    ];
    const events = { onPinTask, onArchiveTask };
    
    if (loading) {
      return this.loadingRender();
    }

    if (tasks.length === 0) {
      return this.renderTasks();
    }

    return (
      <div className="list-items">
        {tasksInOrder.map(task => <Task key={task.id} task={task} {...events} />)}
      </div>
    );
  }
}

export default TaskList;