import React, { Component } from "react";

export default class Newsitem extends Component {
	render(props) {
		// console.log(this.props.title, this.props.description)
		let { title, imageurl, description, url, time } = this.props;
		title = title ? title : "";
		description = description ? description : "";
		imageurl = imageurl ? imageurl : "https://cdn.pixabay.com/photo/2017/06/26/19/03/news-2444778_1280.jpg";
		title = title.length < 40 ? title : title.slice(0, 40) + " ...";
		description = description.length < 80 ? description : description.slice(0, 80) + " ...";
		time = new Date(time).toGMTString();
		return (
			<div className="col-sm-12 col-md-4 col-lg-3 my-1">
				<div className="card">
					<img src={imageurl} className="card-img-top" alt="newsimage" />
					<div className="card-body">
						<h5 className="card-title">{title}</h5>
						<p className="card-text">{description}</p>
						<p className="card-text">
							<small className="text-body-secondary">Published on: {time}</small>
						</p>
						<a href={url} target="_blank" rel="noreferrer" className="btn btn-dark ">
							Read
						</a>
					</div>
				</div>
			</div>
		);
	}
}
