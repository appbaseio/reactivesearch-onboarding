import React, { Component } from "react";
import { dataOperation } from "../service/DataOperation";
import {
	ReactiveBase,
	DataSearch,
	SingleDropdownList,
	ResultList
} from "@appbaseio/reactivesearch";
import moment from "moment";

require("./news.scss");

export class LiveExample extends Component {
	onData(res) {
		const title = res.title && res.title.length ?
			res.url ?
				<a  className="title"
					target="_blank"
					href={res.url}
					dangerouslySetInnerHTML={{__html: res.title}}
				/> :
				res.p_type == "poll" ?
				<a  className="title"
					target="_blank"
					href={"https://news.ycombinator.com/item?id="+res.id}
					dangerouslySetInnerHTML={{__html: res.title}}
				/> :
				<div className="title" dangerouslySetInnerHTML={{__html: res.title}} />
			: null;
		return {
			image: null,
			title: title,
			desc: (<div>
				{ res.text ? <div className="text" dangerouslySetInnerHTML={{__html: res.text}} /> : null }
				<p className="info">
					{
						res.p_type == "comment" ?
						<span>parent <a target="_blank" href={"https://news.ycombinator.com/item?id="+res.parent}>{res.parent}</a><span className="separator">|</span></span>
						: null
					}
					{res.score} points<span className="separator">|</span>
					<a target="_blank" href={"https://news.ycombinator.com/user?id="+res.by}>{res.by}</a><span className="separator">|</span>
					{moment.unix(res.time).fromNow()}
				</p>
			</div>)
		}
	}

	render() {
		return (
			<div>
				<ReactiveBase
					app={dataOperation.app.appName}
					credentials={`${dataOperation.app.username}:${dataOperation.app.password}`}
					type="post"
					theme="rbc-orange"
				>
					<nav className="wrapper">
						Hacker News
					</nav>
					<div className="filters wrapper row">
						<div className="col s9">
							<DataSearch
								componentId="InputSensor"
								dataField={["title", "text", "by"]}
								placeholder="Search posts by title, text or author..."
								autocomplete={false}
								highlight={true}
							/>
						</div>

						<div className="col s3">
							<SingleDropdownList
								componentId="TypeSensor"
								dataField="p_type.raw"
								size={20}
								selectAllLabel="All"
								defaultSelected="All"
							/>
						</div>
					</div>

					<div className="wrapper row">
						<div className="col s12">
							<ResultList
								dataField="title"
								from={0}
								size={20}
								pagination={true}
								onData={this.onData}
								react={{
									and: ["InputSensor", "TypeSensor"]
								}}
							/>

						</div>
					</div>
				</ReactiveBase>
			</div>
		);
	}
}

// Default props value
LiveExample.defaultProps = {
	mapping: {
		title: "title",
		url: "url",
		type: "p_type.raw"
	},
	config: {
		appbase: {
			app: "hacker-news",
			credentials: "Nt7ZtBrAn:5656435e-0273-497e-a741-9a5a2085ae84",
			type: "post",
			theme: "rbc-orange"
		}
	}
};
