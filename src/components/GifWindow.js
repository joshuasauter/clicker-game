import myGif from '../assets/logo512.gif';

function GifWindow() {
    return (
      <div className="window gif-window">
        <div className="window-titlebar">GIF Window</div>
        <img src={myGif} alt="Fun GIF" />
      </div>
    );
  }
  
  export default GifWindow;