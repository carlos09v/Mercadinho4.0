import LoadingSvgLight from '../assets/LoadingIO/Spinner-1s-200px.svg'
import LoadingSvgDark from '../assets/LoadingIO/Spinner-1s-200px-dark.svg'


const Loading = () => {

  return (
    <img src={!document.documentElement.classList.contains('dark') ? LoadingSvgLight : LoadingSvgDark} className="mx-auto pointer-events-none" alt="Loading Light/Dark" />
  )
}

export default Loading