import './App.css'
import './index.css'

import { useState, useEffect } from 'react';

import { Route, Router, Switch } from "react-router-dom";
import { createBrowserHistory } from "history"


import Home from './components/Home'
import EspaceEtudiant from './components/EspaceEtudiant';
import EspaceProfessionnel from './components/EspaceProfessionnel';


const history = createBrowserHistory();



const loadSession = () => {
	let session = window.localStorage.getItem("sdi_session");
	console.log(session);
	if (session !== "undefined") {
		return JSON.parse(session);
	}
}



function App() {

	let s_session = loadSession()
	const [session, setSession] = useState(s_session)

	useEffect(() => {
		window.localStorage.setItem("sdi_session", JSON.stringify(session))
		console.log("Session a changé");
		console.log(session);
	}, [session])

	console.log("Session");
	console.log(session);

	return (
		<Router history={history}>
			<Switch>
				{
					(session && session.email && session.email !== "" && session.profil === "professionnel") &&
					<Route path="/espace_professionnel">
						<EspaceProfessionnel session={session} setSession={setSession} />
					</Route>
				}
				{
					(session && session.email && session.email !== "" && session.profil === "etudiant") &&
					<Route path="/espace_etudiant">
						<EspaceEtudiant session={session} setSession={setSession} />
					</Route>
				}

				<Route path="/">
					<Home session={session} setSession={setSession} />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
