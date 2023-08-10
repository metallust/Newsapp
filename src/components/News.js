import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Loading from "./Loading";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
	MAXPAGES = 10;
	APIKEY = process.env.REACT_APP_NEWSAPP_APIKEY;
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
			page: 1,
			totalResults: 0,
			hasMore: true,
		};
	}

	async updatePage(i) {
		let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.cat}&apiKey=${this.APIKEY}&page=${i}&pageSize=${this.MAXPAGES}`;
		const response = await fetch(url);
		const content = await response.json();
		this.setState({
			page: i,
			articles: this.state.articles.concat(content.articles),
			totalResults: content.totalResults,
			hasMore: content.articles.length === this.MAXPAGES,
		});
	}

	async componentDidMount() {
		this.props.setProgress(20);
		let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.cat}&apiKey=${this.APIKEY}&page=1&pageSize=${this.MAXPAGES}`;
		const response = await fetch(url);
		this.props.setProgress(50);
		const content = await response.json();
		this.props.setProgress(80);
		this.setState({
			page: 1,
			articles: content.articles,
			totalResults: content.totalResults,
			hasMore: content.articles.length === this.MAXPAGES,
		});
		this.props.setProgress(100);
	}

	render() {
		return (
			<>
				<h1 className="text-center my-4">{this.props.title}</h1>
				<InfiniteScroll
					dataLength={this.state.articles.length}
					next={async () => {
						await this.updatePage(this.state.page + 1);
					}}
					hasMore={this.state.hasMore}
					loader={<Loading />}
				>
					<div className="container">
						<div className="row">
							{this.state.articles.map((element, index) => {
								return (
									<Newsitem
										key={index}
										title={element.title}
										description={element.description}
										imageurl={element.urlToImage}
										url={element.url}
										time={element.publishedAt}
									/>
								);
							})}
						</div>
					</div>
				</InfiniteScroll>
			</>
		);
	}
}
