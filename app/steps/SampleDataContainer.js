import React, { Component } from "react";
import data from "../service/sampleData";
import { dataOperation } from '../service/DataOperation';
import { mapping } from "../service/mappingObj";

export default class SampleDataContainer extends Component {
	renderData() {
		return data.map(row => (
			<tr key={row.id}>
				<td>{row.id}</td>
				<td>{row.time}</td>
				<td>{row.p_type}</td>
				<td>{row.score}</td>
				<td>{row.by}</td>
				<td>{row.title}</td>
				<td>{row.url}</td>
			</tr>
		))
	}

	submit() {
		this.props.toggleLoader("Indexing data. Please Wait!");
		dataOperation.updateMapping("post", mapping)
		.then((res) => {
			this.props.nextStep();
		})
		.catch((err) => {
			console.log(err);
		});
	}

	submitBtn() {
		let btn;
		if (this.props.completedStep >= 1) {
			btn = (
				<button className="btn btn-primary pos-static submit-btn" onClick={() => this.props.setStep(2)}>
					Next
				</button>
			);
		} else {
			btn = (
				<button className="btn btn-primary pos-static submit-btn" onClick={() => this.submit()}>
					Next
				</button>
			);
		}
		return btn;
	}

	render() {
		return (
			<section className="single-step">
				<h2>Sample Dataset for Hacker News</h2>
				<p>
					We have prepared a Hacker News dataset of 650 records to index into the app. Hit the <strong>Next</strong> button to start indexing.
				</p>
				<table className="highlight responsive-table">
					<thead>
						<tr>
							<th>id</th>
							<th>time</th>
							<th>post type</th>
							<th>score</th>
							<th>by</th>
							<th>title</th>
							<th>url</th>
						</tr>
					</thead>
					<tbody>
						{this.renderData()}
					</tbody>
				</table>

				{this.submitBtn()}
			</section>
		);
	}
}
