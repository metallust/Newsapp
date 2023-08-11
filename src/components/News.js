import React, { useState, useEffect } from "react";
import Newsitem from "./Newsitem";
import Loading from "./Loading";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default function News(props) {
	const MAXPAGES = 10;
	const APIKEY = process.env.REACT_APP_NEWSAPP_APIKEY;
	const [articles, setArticles] = useState([]);
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const [totalResults, setTotalResults] = useState(0);

	async function updatePage(i) {
		let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.cat}&apiKey=${APIKEY}&page=${i}&pageSize=${MAXPAGES}`;
		const response = await fetch(url);
		const content = await response.json();
		setPage(i);
		setArticles(articles.concat(content.articles));
		setTotalResults(content.totalResults);
		setHasMore(content.articles.length === MAXPAGES);
	}

	const loadFirstPage = async () => {
		props.setProgress(20);
		let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.cat}&apiKey=${APIKEY}&page=1&pageSize=${MAXPAGES}`;
		const response = await fetch(url);
		props.setProgress(50);
		const content = await response.json();
		props.setProgress(80);
		setPage(1);
		setArticles(content.articles);
		setTotalResults(content.totalResults);
		setHasMore(content.articles.length === MAXPAGES);
		props.setProgress(100);
		return () => {};
	};

	useEffect(() => {
		loadFirstPage();
		// eslint-disable-next-line
	}, []);

	return (
		<>
			<h1 className="text-center mt-5 mb-3">{props.title}</h1>
			<div className="text-end mx-5">{totalResults} Result found</div>
			<InfiniteScroll
				dataLength={articles.length}
				next={async () => {
					await updatePage(page + 1);
				}}
				hasMore={hasMore}
				loader={<Loading />}
			>
				<div className="container">
					<div className="row">
						{articles.map((element) => {
							return <Newsitem key={element.url} title={element.title} description={element.description} imageurl={element.urlToImage} url={element.url} time={element.publishedAt} />;
						})}
					</div>
				</div>
			</InfiniteScroll>
		</>
	);
}

News.defaultProps = {
	country: "in",
	cat: "general",
};
News.propTypes = {
	country: PropTypes.string,
	cat: PropTypes.string,
};
