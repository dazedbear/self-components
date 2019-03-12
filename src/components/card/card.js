import React, { Component } from 'react';
import './card.css';

class Card extends Component {
	render() {
		if (!this.props) return null;
		const {
      link,
      linkTitle,
      defultUserImage,
      defultBgImage,
			userName,
			userImage,
			bgImage,
			introduction
		} = this.props;

		return (
			<div className="search-block-main" key="1">
				<a
					href={link}
					title={linkTitle}
					target="_blank"
					rel="noopener noreferrer"
				>
					<div className="search-block-bg">
						<img
							src={bgImage || defultBgImage}
							alt="cover"
						/>
						<div className="searchAvatar">
							<img
								src={userImage ||defultUserImage}
								alt="Avatar"
							/>
						</div>
					</div>
					<div className="search-block-content">
						<div className="username">{userName || '使用者名稱'}</div>
						{/* <div className="jobTitle">{title || '職稱'}</div> */}
						<hr className="top" />
						<p
							className="summary"
							dangerouslySetInnerHTML={{ __html: introduction }}
						/>
					</div>
				</a>
				<div className="search-block-footer">
					<hr className="bottom" />
					<div className="search-block-interactive">
						<div className="watching">
							<i className="icon-icon-icon_watching" /> 9527
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Card;