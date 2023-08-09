import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Loading from "./Loading";
import PropTypes from "prop-types";

export default class News extends Component {
	MAXPAGES = 20;
	APIKEY = "373888eaa2054024b08493f08d2699a1";

	static defaultProps = {
		country: "in",
		cat: "general",
	};
	static propTypes = {
		country: PropTypes.string,
		cat: PropTypes.string,
	};
	constructor() {
		super();
		this.state = {
			articles: [],
			loading: false,
			page: 1,
		};
	}

	async updatePage(i) {
		this.setState({ loading: true });
		let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.cat}&apiKey=${this.APIKEY}&page=${i}&pageSize=${this.MAXPAGES}`;
		const response = await fetch(url);
		const content = await response.json();
		this.setState({
			page: i,
			articles: content.articles,
			loading: false,
			totalResults: content.totalResults,
		});
	}

	async componentDidMount() {
		this.updatePage(1);
	}

	handlePageClick = async (i) => {
		this.updatePage(i);
	};

	renderPageButtons = () => {
		const totalPages = Math.ceil(this.state.totalResults / this.MAXPAGES);
		const currentPage = this.state.page;
		const buttons = [];
		// Calculate the range of buttons to display
		const startPage = Math.max(1, currentPage - Math.floor(this.MAXPAGES / 2));
		const endPage = Math.min(totalPages, startPage + this.MAXPAGES - 1);
		for (let i = startPage; i <= endPage; i++) {
			buttons.push(
				<button key={i} className={`btn btn-dark mx-1 ${i === currentPage ? "active" : ""}`} onClick={() => this.handlePageClick(i)}>
					{i}
				</button>
			);
		}
		return buttons;
	};

	render() {
		return (
			<div className="container">
				<h1 className="text-center">{this.props.title}</h1>
				<div className="container d-flex justify-content-between my-2">
					<button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevious}>
						← Previous
					</button>
					<div className="justify-content-center">{this.renderPageButtons()}</div>
					<button
						disabled={this.state.page * 20 >= this.state.totalResults}
						type="button"
						className="btn btn-dark"
						onClick={this.handleNext}
					>
						Next →
					</button>
				</div>
				{this.state.loading && <Loading />}
				<div className="row">
					{!this.state.loading &&
						this.state.articles.map((element) => {
							return (
								<Newsitem
									key={element.url}
									title={element.title}
									description={element.description}
									imageurl={element.urlToImage}
									url={element.url}
									time={element.publishedAt}
								/>
							);
						})}
				</div>
				<div className="container d-flex justify-content-between my-2">
					<button
						disabled={this.state.page <= 1}
						type="button"
						className="btn btn-dark"
						onClick={() => this.handlePageClick(this.state.page - 1)}
					>
						← Previous
					</button>
					<div className="justify-content-center">{this.renderPageButtons()}</div>
					<button
						disabled={this.state.page * this.MAXPAGES >= this.state.totalResults}
						type="button"
						className="btn btn-dark"
						onClick={() => this.handlePageClick(this.state.page - 1)}
					>
						Next →
					</button>
				</div>
			</div>
		);
	}
}
