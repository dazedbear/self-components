import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Select, Popover, Checkbox, message } from 'antd';
import { getDuration } from './time';
import './datePicker.scss';

const { Option, OptGroup } = Select;
const today = new Date(); // 取今天
const defaultTime = {
	startYear: 2015,
	startMonth: 1,
	endYear: today.getFullYear(),
	endMonth: today.getMonth() + 1,
};

class DatePicker extends Component {
	static defaultProps = {
		startYear: defaultTime.startYear,
		startMonth: defaultTime.startMonth,
		endYear: defaultTime.endYear,
		endMonth: defaultTime.endMonth,
		onUpdateData: () => {},
		editable: false,
		showStillWorking: false,
		showSeniority: false,
		stillWorking: false,
		stillWorkingText: '仍在職',
		title: '選擇時間',
		popoverClassName: 'default-popover-style',
		dashClassName: '',
		seniorityClassName: 'default-seniority-style',
	};

	static propTypes = {
		startYear: PropTypes.number,
		startMonth: PropTypes.number,
		endYear: PropTypes.number,
		endMonth: PropTypes.number,
		onUpdateData: PropTypes.func,
		showStillWorking: PropTypes.bool,
		showSeniority: PropTypes.bool,
		stillWorking: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
		stillWorkingText: PropTypes.string,
		editable: PropTypes.bool,
		title: PropTypes.string,
		popoverClassName: PropTypes.string,
		dashClassName: PropTypes.string,
		seniorityClassName: PropTypes.string,
	};

	constructor(props) {
		super(props);
		this.state = {
			startYear: Number(props.startYear) || defaultTime.startYear,
			startMonth: Number(props.startMonth) || defaultTime.startMonth,
			endYear: Number(props.endYear) || defaultTime.endYear,
			endMonth: Number(props.endMonth) || defaultTime.endMonth,
			visible: false,
			stillWorking: props.stillWorking || false,
		};
	}

	// 儲存日期
	handleChange = (value, name) => {
		this.setState(state => ({
			[name]: value,
			stillWorking:
				name === 'endYear' || name === 'endMonth' ? false : state.stillWorking,
		}));
	};

	// 年份
	renderYear = name => {
		let year = [];

		if (name === 'endYear') {
			for (
				let i = Number(this.state.startYear);
				i <= today.getFullYear();
				i += 1
			) {
				year.push(i);
			}
		} else {
			for (let i = 1970; i <= today.getFullYear(); i += 1) {
				year.push(i);
			}
		}

		return year.map((yearNumber, index) => (
			<Option key={index} value={yearNumber}>
				{yearNumber}
			</Option>
		));
	};

	// 月份
	renderMonth = name => {
		let month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
		const { startYear, endYear, startMonth } = this.state;

		if (name === 'endMonth' && Number(startYear) === Number(endYear)) {
			month = month.filter(item => {
				return Number(item) >= Number(startMonth);
			});
		}

		return month.map((monthNumber, index) => (
			<Option key={index} value={monthNumber}>
				{monthNumber}
			</Option>
		));
	};

	// 時間
	renderTime = (yearValue, yearName, monthValue, monthName) => {
		const {
			startYear,
			startMonth,
			endYear,
			endMonth,
			stillWorking,
		} = this.state;

		return (
			<Fragment>
				<Select
					defaultValue={Number(yearValue)}
					value={yearName === 'startYear' ? startYear : endYear}
					style={{ width: 95 }}
					onChange={value => this.handleChange(value, yearName)}
					disabled={yearName === 'endYear' && stillWorking ? true : false}
				>
					<OptGroup label="年份">{this.renderYear(yearName)}</OptGroup>
				</Select>
				<span> 年 </span>
				<Select
					defaultValue={Number(monthValue)}
					value={monthName === 'startMonth' ? startMonth : endMonth}
					style={{ width: 90 }}
					onChange={value => this.handleChange(value, monthName)}
					disabled={monthName === 'endMonth' && stillWorking ? true : false}
				>
					<OptGroup label="月份">{this.renderMonth(monthName)}</OptGroup>
				</Select>
				<span> 月</span>
			</Fragment>
		);
	};

	// 年資
	renderSeniority = () => {
		const {
			showSeniority,
			seniorityClassName,
			stillWorking,
			startYear,
			startMonth,
			endYear,
			endMonth,
		} = this.props;

		if (!showSeniority) return null;

		const startTime = moment({
			year: startYear || defaultTime.startYear,
			month: (startMonth || defaultTime.startMonth) - 1,
		});
		const endTime = stillWorking
			? moment()
			: moment({
					year: endYear || defaultTime.endYear,
					month: (endMonth || defaultTime.endMonth) - 1,
			  });

		const seniorityText = getDuration(startTime, endTime);
		if (!seniorityText) return null;

		return <span className={seniorityClassName}>({seniorityText})</span>;
	};

	// 確認關閉
	hide = () => {
		const {
			startYear,
			startMonth,
			endYear,
			endMonth,
			stillWorking,
		} = this.state;

		this.setState(
			state => ({
				endYear: stillWorking ? today.getFullYear() : state.endYear,
				endMonth: stillWorking ? today.getMonth() + 1 : state.endMonth,
			}),
			() => {
				if (
					endYear < startYear ||
					(startYear === endYear && endMonth < startMonth)
				) {
          message.error('時間期間錯誤，請再重新確認一下時間。');
				} else {
					this.setState({ visible: false });
					this.props.onUpdateData(
						startYear,
						startMonth,
						stillWorking ? null : endYear,
						stillWorking ? null : endMonth,
						stillWorking
					);
				}
			}
		);
	};

	// 仍在職
	toggleStillWorking = e => {
		this.setState(state => ({
			stillWorking: !state.stillWorking,
		}));
	};

	// 時間選擇器Popover內容
	renderContent = () => {
		const {
			startYear,
			startMonth,
			endYear,
			endMonth,
			showStillWorking,
			stillWorkingText,
		} = this.props;
		const { stillWorking } = this.state;

		return (
			<div className="datePicker-main">
				<div className="datePicker-main--startTimeBlock">
					開始時間：
					{this.renderTime(
						startYear || defaultTime.startYear,
						'startYear',
						startMonth || defaultTime.startMonth,
						'startMonth'
					)}
				</div>
				結束時間：
				{this.renderTime(endYear, 'endYear', endMonth, 'endMonth')}
				<div className="datePicker-main--timeConfirmationButton">
					<div>
						{showStillWorking && (
							<Checkbox
								defaultChecked={stillWorking}
								checked={stillWorking}
								onChange={this.toggleStillWorking}
							>
								{stillWorkingText}
							</Checkbox>
						)}
					</div>
					<div>
						<button onClick={this.hide}>確認</button>
					</div>
				</div>
			</div>
		);
	};

	// 開關
	handleVisibleChange = visible => {
		const {
			startYear,
			startMonth,
			endYear,
			endMonth,
			stillWorking,
		} = this.props;
		this.setState({
			visible,
			startYear: Number(startYear) || defaultTime.startYear,
			startMonth: Number(startMonth) || defaultTime.startMonth,
			endYear: Number(endYear) || defaultTime.endYear,
			endMonth: Number(endMonth) || defaultTime.endMonth,
			stillWorking: stillWorking,
		});
	};

	// 編輯頁時間選擇器內容
	renderDatePickerContent = () => {
		const {
			showStillWorking,
			stillWorking,
			stillWorkingText,
			startYear,
			startMonth,
			endYear,
			endMonth,
			popoverClassName,
			dashClassName,
			title,
		} = this.props;
		const { visible } = this.state;

		return (
			<span className={popoverClassName}>
				<Popover
					content={this.renderContent()}
					title={title}
					trigger="click"
					visible={visible}
					placement="bottom"
					onVisibleChange={this.handleVisibleChange}
				>
					{`${startYear || defaultTime.startYear}年`}
					{`${startMonth || defaultTime.startMonth}月`}
					<span className={dashClassName}> ~ </span>
					{showStillWorking && stillWorking ? (
						<span>{stillWorkingText}</span>
					) : (
						<span>
							{`${endYear || defaultTime.endYear}年`}
							{`${endMonth || defaultTime.endMonth}月`}
						</span>
					)}
					{this.renderSeniority()}
				</Popover>
			</span>
		);
	};

	// 個人頁(預覽)時間選擇器呈現
	renderDatePickerView = () => {
		const {
			showStillWorking,
			stillWorking,
			stillWorkingText,
			startYear,
			startMonth,
			endYear,
			endMonth,
			dashClassName,
		} = this.props;

		return (
			<Fragment>
				{`${startYear || defaultTime.startYear}年`}
				{`${startMonth || defaultTime.startMonth}月`}
				<span className={dashClassName}> ~ </span>
				{showStillWorking && stillWorking ? (
					<span>{stillWorkingText}</span>
				) : (
					<span>
						{`${endYear || defaultTime.endYear}年`}
						{`${endMonth || defaultTime.endMonth}月`}
					</span>
				)}
			</Fragment>
		);
	};

	render() {
		const { editable } = this.props;

		if (editable) {
			return this.renderDatePickerContent();
		}

		return this.renderDatePickerView();
	}
}

export default DatePicker;
