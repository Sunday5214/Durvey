import React from 'react';
import Navigation from './Component/NavigationBar.js';
import NavigatePage from './Pages/NavigatePage.js';
import './App.scss';

function App() {
  return (
    <html>
      <head>

      </head>
      <body>
        <div className="container">
          <div className="topBox">
            <Navigation/>
          </div>
          <div className="middleBox">
            <NavigatePage page='/make/survey'/>
          </div>
          <div className="bottomBox">

          </div>
        </div>

      </body>
    </html>

  );
}

export default App;
