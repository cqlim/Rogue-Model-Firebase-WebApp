import React, { useState, useEffect } from "react";
import {
	GoogleMap,
	withScriptjs,
	withGoogleMap,
	Marker,
	InfoWindow
} from "react-google-maps";
import firestore from "../../config/firestore";

function useProject() {
	const [projects, setProjects] = useState([]);

	useEffect(() => {
		firestore.collection("Project").onSnapshot(snapshot => {
			const newProject = snapshot.docs.map(doc => ({
				id: doc.id,
				...doc.data()
			}));
			setProjects(newProject);
		});
	}, []);
	return projects;
}

function Map() {
	const [selectedData, setSelectedData] = useState(null);

	useEffect(() => {
		const listener = e => {
			if (e.key === "Escape") {
				setSelectedData(null);
			}
		};
		window.addEventListener("keydown", listener);

		return () => {
			window.removeEventListener("keydown", listener);
		};
	}, []);

	const projects = useProject();

	return (
		<GoogleMap
			defaultZoom={6}
			defaultCenter={{ lat: 44.564568, lng: -123.262047 }}
		>
			{projects.map(eachData => (
				<Marker
					key={eachData.projectID}
					position={{
						lat: eachData.projectLatitude,
						lng: eachData.projectLongitude
					}}
					onClick={() => {
						setSelectedData(eachData);
					}}
				/>
			))}

			{selectedData && (
				<InfoWindow
					onCloseClick={() => {
						setSelectedData(null);
					}}
					position={{
						lat: selectedData.projectLatitude,
						lng: selectedData.projectLongitude
					}}
				>
					<div>
						<h3>{selectedData.projectName}</h3>
						<p>{selectedData.projectDescription}</p>
					</div>
				</InfoWindow>
			)}
		</GoogleMap>
	);
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

const renderMap = () => {
	return (
		<div style={{ width: "100vw", height: "100" }}>
			<WrappedMap
				googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAFex0mi6Ezx0l9IJDPcCiXTw-Xsac0xqg"
				loadingElement={<div style={{ height: `100%` }} />}
				containerElement={<div style={{ height: `900px` }} />}
				mapElement={<div style={{ height: `100%` }} />}
				center={{ lat: -24.9923319, lng: 135.2252427 }}
			/>
		</div>
	);
};

export default renderMap;
