import myGif from '../assets/logo512.gif';

function GifWindow() {
    return (
      <div className="window gif-window">
        <div className="window-titlebar">
          <div className="titlebar-title"></div>
          <div className="titlebar-buttons">
            <span className="titlebar-button minimize-button"></span>
            <span className="titlebar-button maximize-button"></span>
            <span className="titlebar-button exit-button"></span>
          </div>
        </div>
        <img src={myGif} alt="Fun GIF" />
      </div>
    );
  }
  
  export default GifWindow;