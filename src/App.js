import React, { Component } from 'react';
import ParticlesBg from 'particles-bg';
import Navigation from './Components/Navigation/Navigation';
import Signin from './Components/Signin/Signin';
import Register from './Components/Register/Register';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import './App.css';

const USER_ID = 'schwartz254';
// Your PAT (Personal Access Token) can be found in the portal under Authentification
const PAT = 'a2b6797e58284e77b82fe367c013b00c';
const APP_ID = 'my-first-application';
// Change these to whatever model and image URL you want to use
const MODEL_ID = 'face-detection';
const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';    

class App extends Component {
    constructor() {
        super();
        this.state = {
            input: '',
            imageUrl: '',
            box: {},
            route: 'signin',
            isSignedIn: false
        }
    }

    calculateFaceLocation = (data) => {
        const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.getElementById('inputImage');
        const width = Number(image.width);
        const height = Number(image.height);
        return {
            leftCol: clarifaiFace.left_col * width,
            topRow: clarifaiFace.top_row * height,
            rightCol: width - (clarifaiFace.right_col * width),
            bottomRow: height - (clarifaiFace.bottom_row * height),
        }
    }

    displayFaceBox = (box) => {
        this.setState({box: box})
    }

    onInputChange = (event) => {
        this.setState({input: event.target.value});
    }

    onButtonSubmit = () => {
        this.setState({imageUrl: this.state.input})

        ///////////////////////////////////////////////////////////////////////////////////
        // YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
        ///////////////////////////////////////////////////////////////////////////////////

        const raw = JSON.stringify({
            "user_app_id": {
                "user_id": USER_ID,
                "app_id": APP_ID
            },
            "inputs": [
                {
                    "data": {
                        "image": {
                            "url": this.state.input
                        }
                    }
                }
            ]
        });

        const requestOptions = {
            method: 'POST',
            headers: {
             'Accept': 'application/json',
             'Authorization': 'Key ' + PAT
            },
            body: raw
        };
        // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
        // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
        // this will default to the latest version_id

        fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
        .then(response => response.json())
        .then(result => this.displayFaceBox(this.calculateFaceLocation(result)))
        .catch(error => console.log('error', error));
    }

    onRouteChange = (route) => {
        if (route === 'signout') {
            this.setState({isSignedIn: false});
        } else if (route === 'home') {
            this.setState({isSignedIn: true});
        }
        this.setState({route: route});
    }

    render() {
        const { isSignedIn, route, box, imageUrl } = this.state;
        return (
            <div className="App">
                <ParticlesBg type="cobweb" bg={true} />
                <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
                { route === 'home' 
                    ? <div>
                        <Logo />
                        <Rank />
                        <ImageLinkForm 
                            onInputChange={this.onInputChange} 
                            onButtonSubmit={this.onButtonSubmit}
                        />
                        <FaceRecognition box={box} imageUrl={imageUrl} />
                    </div>
                    : (
                        route === 'signin' 
                        ? <Signin onRouteChange ={this.onRouteChange}/>
                        : <Register onRouteChange ={this.onRouteChange}/>
                    )
                }
            </div>
        );
    }
}

export default App;
