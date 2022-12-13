import ReactPlayer from 'react-player'
import './index.css'

const VideoPlayer = props => {
  const {videoUrl} = props
  console.log(videoUrl, 'in video player')
  return (
    <div className="responsive-container videoCon">
      <ReactPlayer
        url="https://youtu.be/7D198nSeAT0"
        controls
        loop
        volume={0.5}
        width="100%"
        height="100%"
      />
    </div>
  )
}

export default VideoPlayer
