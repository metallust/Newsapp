import "./App.css";
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

export default function App() {
	const [progress, setProgress] = useState(10);

	return (
		<BrowserRouter>
			<div>
				<Navbar title="NewsApp" />
				<LoadingBar color="#f11946" progress={progress} onLoaderFinished={() => setProgress(0)} />
				<Routes>
					<Route exact path="/" element={<News setProgress={setProgress} key={"Top Headlines"} title="Top Headlines" country="in" />} />
					<Route exact path="/business" element={<News setProgress={setProgress} key={"Business"} title="Business" country="in" cat="business" />} />
					<Route exact path="/entertainment" element={<News setProgress={setProgress} key={"Entertainment"} title="Entertainment" country="in" cat="entertainment" />} />
					<Route exact path="/general" element={<News setProgress={setProgress} key={"General"} title="General News" country="in" cat="general" />} />
					<Route exact path="/health" element={<News setProgress={setProgress} key={"Health"} title="Health" country="in" cat="health" />} />
					<Route exact path="/science" element={<News setProgress={setProgress} key={"Science"} title="Science" country="in" cat="science" />} />
					<Route exact path="/sports" element={<News setProgress={setProgress} key={"Sports"} title="Sports" country="in" cat="sports" />} />
					<Route exact path="/technology" element={<News setProgress={setProgress} key={"Technology"} title="Technology" country="in" cat="technology" />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}
