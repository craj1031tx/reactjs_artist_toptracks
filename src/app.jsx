import React, { Component } from 'react';
import './app.css';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap'
import Profile from './profile';
import Gallery from './gallery'

class App extends Component {

	 constructor(props){
	 	super(props);
	 	this.state ={ 
	 		query: '',
	 		artist: null,
	 		tracks: []
	 	};
	};	

	render(){
		return (
			<div className="App">
				<div className="App-title">
					Music Master from App.
				</div>

				<FormGroup>
					<InputGroup>
						<FormControl 
							type="text"
							placeholder="Search for an Artist"
							value={this.state.query}
							onChange={event => {this.setState({query: event.target.value})}}
							onKeyPress={event => {
								if (event.key==='Enter'){
									this.search()
								}
							}}
						/>
						<InputGroup.Addon onClick={() => this.search()}>
							<Glyphicon glyph="search"></Glyphicon>
						</InputGroup.Addon>
					</InputGroup>
				</FormGroup>
				{
					this.state.artist !== null ?
					<div>						
						<Profile 
						artist={this.state.artist}
						/>
						<Gallery 
							tracks={this.state.tracks}
						/> 
					</div>					
					:
					<div></div>
				}
				
				
			</div>	
		)
	};

	search(){
	 	console.log('this.state', this.state);

	 	const BASE_URL = "https://api.spotify.com/v1/search";
	 	const FETCH_URL = `${BASE_URL}?q=${this.state.query}&type=artist&limit=1`;
	 	const ALBUM_URL = "https://api.spotify.com/v1/artists";


	 	//access token expires fairly readily. need to run spotify web api example code to generate access token. Then, paste token from that app here...
	 	var accessToken = 'BQAd7NGTcY2h2CBtfBEEMMg-Hine5ZqUiQwWZIg7Q_F3tOFfrmjsy1Ll5xAh1DuRYgLuOaDEtmQaU-CdA4BDnLAZtiTzJo-y9gCPCGfqUiLaMH2KZmF855GRMaKj8hBsRHtyDnMEsDnoZBTtXTpkiPHAcVSOPvsSUsw&refresh_token=AQC63_Sjr0-a1-mvwpaTyTnMYrQIgrPPG8sjwy-Wh6pjI9HVhYBQrR4dft946IKRjaj_3kEnBylgd5B8g3TKlJPyOy50pi1TxddxF7iChkBk7gJWhP33h9_6v117ybG2Gro';

	 	var myOptions = {
	 		method: "GET",
	 		headers: {'Authorization' :'Bearer ' + accessToken},
	 		mode: 'cors',
	 		cache: 'default'
	 	}	 	

	 	fetch(FETCH_URL, myOptions)
	 	.then(response => response.json())
	 	.then(json => {
	 		const artist = json.artists.items[0];
	 		this.setState({artist});

	 		const ALBUM_FETCH_URL = `${ALBUM_URL}/${artist.id}/top-tracks?country=US&`;
	 		fetch(ALBUM_FETCH_URL, myOptions)
	 			.then(res => res.json())
	 			.then(json => {
	 				console.log('artists top tracks', json);
	 				const tracks = json.tracks;
	 				this.setState({tracks});
	 			})
	 	});	 	
	};

};

export default App;