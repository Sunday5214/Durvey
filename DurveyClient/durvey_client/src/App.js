import React from 'react';
import Navigation from './Component/NavigationBar.js';
import NavigatePage from './Pages/NavigatePage.js';
import './App.scss';
import { PageProvider } from './Contexts/PageContext.js';
import { MakeSurveyProvider } from './Contexts/MakeSurveyContext.js';


const App = () => {
  return (
    <PageProvider>
      <MakeSurveyProvider>
        
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



      </MakeSurveyProvider>
    </PageProvider>

  );
}

export default App;
