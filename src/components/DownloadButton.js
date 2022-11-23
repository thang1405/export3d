export default function DownloadButton(props) {
  return (
    <button onClick={props.handleClick} id="download-glb" className="my-button">
      Download GLB
    </button>
  )
}
