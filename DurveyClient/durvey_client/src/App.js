import React from 'react';
import Navigation from './Component/NavigationBar.js';
import NavigatePage from './Pages/NavigatePage.js';
import './App.scss';
import { PageProvider } from './Contexts/PageContext.js';

const App = () => {
  return (
    <PageProvider>
      <html>
        <head>

        </head>
        <body>
          <div className="container">
            <div className="topBox">
              <Navigation />
            </div>
            <div className="middleBox">
              <NavigatePage />


            </div>
            <div className="bottomBox">

            </div>
          </div>

        </body>
      </html>

    </PageProvider>

  );
}

export default App;
